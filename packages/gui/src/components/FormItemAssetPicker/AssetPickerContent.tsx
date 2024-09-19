import React, { useState, useEffect } from "react";
import { groupBy } from "lodash-es";
import { useLocalStorageState } from "ahooks";

import { SearchBarBorder } from "./SearchBarBorder";
import { BasicAssetType, PickableAssetItem } from "./PickableAssetItem";

// import { Breadcrumb, BreadcrumbItem } from "../../Breadcrumb";
// import { Search } from "../../Explorer";
import { Flex } from "../../Flex";
// import { ViewSwitch } from "../../Explorer/ViewSwitch";
import { styled } from "../../../design-system";

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
}
export function AssetPickerContent<T extends BasicAssetType>(props: AssetPickerPopoverProps<T>) {
  const { assets, onSelect, selectedAssetId } = props;
  const [searchText, setSearchText] = useState("");
  const [displayMode, setDisplayMode] = useLocalStorageState<"list" | "grid">("ui_asset_picker_view_mode", {
    defaultValue: "grid"
  });
  const scrollingRef = React.useRef<HTMLDivElement | null>(null);

  const setScrollingRef = React.useCallback((element: HTMLDivElement) => {
    scrollingRef.current = element;
  }, []);

  const filteredAssets = assets
    .filter((asset) => (asset.isSubAsset && asset.mainAsset) || !asset.isSubAsset)
    .filter((asset) => {
      let path = "";
      if (asset.isSubAsset) {
        const mainAsset = asset.mainAsset;
        path = `${mainAsset.getTempRoutes().join("/")}/${mainAsset.name}/${asset.name}`;
      } else {
        const routes = asset.getTempRoutes();
        path = `${routes.join("/")}/${asset.name}`;
      }
      return path.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

  const grouped = groupBy(filteredAssets, (item) => {
    const r = item.getTempRoutes();
    if (item.isSubAsset) {
      const mainAsset = item.mainAsset;
      const path = `${mainAsset.getTempRoutes().join("/")}/${mainAsset.name}`;
      return path;
    }

    return r;
  });

  const paths = Object.keys(grouped);

  const items = paths.map((path, i) => {
    return (
      <AssetGroupSection key={path}>
        {/* {paths[i] && (
          <Breadcrumb>
            {path.split(",").map((p, idx) => (
              <BreadcrumbItem key={idx}>{p}</BreadcrumbItem>
            ))}
          </Breadcrumb>
        )} */}
        <AssetList displayMode={displayMode}>
          {grouped[path].map((asset) => {
            return (
              <PickableAssetItem
                selected={selectedAssetId === asset.id}
                displayMode={displayMode}
                key={asset.id}
                asset={asset}
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
        {/* <Search value={searchText} onSearch={(v) => setSearchText(v)} />
        <ViewSwitch
          mode={displayMode}
          onChange={(type) => {
            setDisplayMode(type);
          }}
        /> */}
      </StyledHeader>
      <SearchBarBorder scrollingRef={scrollingRef} />
      <AssetGroups ref={setScrollingRef}>{items}</AssetGroups>
    </StyledAssetPickerContent>
  );
}
