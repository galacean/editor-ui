import React, { useState, useEffect, useRef } from "react";
import { Input, Flex, styled, ActionButton, Breadcrumbs } from "@galacean/editor-ui";

import { BasicAssetType, PickableAssetItem } from "./PickableAssetItem";

import { SearchBarBorder } from "./SearchBarBorder";
import { IconLayoutGrid, IconLayoutList, IconSearch } from "@tabler/icons-react";

const StyledAssetPickerContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "322px",
  maxHeight: "360px"
});

const AssetGroups = styled("div", {
  flex: 1,
  overflow: "auto",
  padding: "$1 $2 $2"
});

const AssetGroupSection = styled("div", {
  "& + &": {
    marginTop: "$2",
    paddingTop: "$2",
    borderTop: "1px solid $gray5"
  }
});

const AssetList = styled("div", {
  display: "grid",
  flexWrap: "wrap",
  gridTemplateColumns: "repeat(5, minmax(60px, 1fr))",
  gridTemplateRows: "auto",
  gap: "$1",
  variants: {
    displayMode: {
      list: {
        display: "block"
      },
      grid: {}
    }
  }
});

const StyledHeader = styled(Flex, {
  padding: "$2 $2 0"
});

export interface AssetPickerPopoverProps<T extends BasicAssetType> {
  selectedAssetId?: string;
  disabled?: boolean;
  assets: T[];
  onSelect?: (asset: T) => void;
  customFilter?: (asset: T) => boolean;
  groupBy?: (asset: T) => string;
}

function groupAssets<T extends BasicAssetType>(assets: T[], groupBy?: (asset: T) => string) {
  groupBy = groupBy ?? function g(asset) { return "" }
  const grouped = {};
  for (let asset of assets) {
    const group = groupBy(asset);
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(asset);
  }

  return grouped;
}


const key = "galacean-gui-asset-picker-display-mode";

export function AssetPickerContent<T extends BasicAssetType>(props: AssetPickerPopoverProps<T>) {
  const { assets, customFilter, onSelect, selectedAssetId, groupBy } = props;
  const searchRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState("");
  const [displayMode, setDisplayMode] = useState(
    window.localStorage.getItem(key) || 'grid'
  )
  const scrollingRef = React.useRef<HTMLDivElement | null>(null);

  const setScrollingRef = React.useCallback((element: HTMLDivElement) => {
    scrollingRef.current = element;
  }, []);

  const filteredAssets = assets.filter(customFilter || (() => true));
  const finalAssets = filteredAssets.filter(asset => {
    let path = "";
    if (asset.isSubAsset) {
      const mainAsset = asset.mainAsset;
      path = `${mainAsset.getTempRoutes().join("/")}/${mainAsset.name}/${asset.name}`;
    } else {
      const routes = asset.getTempRoutes();
      path = `${routes.join("/")}/${asset.name}`;
    }
    return path.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  })

  const grouped = groupAssets(finalAssets, groupBy);

  const paths = Object.keys(grouped);

  const handleChangeDisplayMode = (mode: "list" | "grid") => {
    return () => {
      setDisplayMode(mode);
      window.localStorage.setItem(key, mode);
    }
  }

  const items = paths.map((path, i) => {
    return (
      <AssetGroupSection key={path}>
        <Breadcrumbs items={path.split(",").map((p) => ({ id: p, label: p }))} />
        <AssetList displayMode={displayMode}>
          {grouped[path].map((asset) => {
            console.log(
              asset.id,
              asset.name,
              asset.thumbnail,
              asset.thumbnailUrl,
            )
            return (
              <PickableAssetItem
                selected={selectedAssetId === asset.id}
                key={asset.id}
                name={asset.name}
                thumbnail={asset.thumbnailUrl}
                onClick={() => {
                  if (!asset.isInitCompleted) return;
                  if (onSelect) {
                    onSelect(asset);
                  }
                }}
              />
            );
          })}
        </AssetList>
      </AssetGroupSection>
    );
  });

  return (
    <StyledAssetPickerContent>
      <StyledHeader gap="xs" wrap={false}>
      <Input
        value={searchText}
        ref={searchRef}
        startSlot={<IconSearch size="14px" />}
        variant="subtle"
        placeholder="Search Assets..."
        size="sm"
        onChange={(e) => {
          const { value } = e.currentTarget;
          setSearchText(value);
        }}
      />
      <Flex gap="xs" wrap={false} align="both">
        <ActionButton
          fancy
          variant="transparent"
          active={displayMode === "grid"}
          onClick={handleChangeDisplayMode('grid')}
        >
          <IconLayoutGrid />
        </ActionButton>
        <ActionButton
          variant="transparent"
          fancy
          active={displayMode === "list"}
          onClick={handleChangeDisplayMode('list')}
        >
          <IconLayoutList />
        </ActionButton>
      </Flex>
      </StyledHeader>
      <SearchBarBorder scrollingRef={scrollingRef} />
      <AssetGroups ref={setScrollingRef}>{items}</AssetGroups>
    </StyledAssetPickerContent>
  );
}
