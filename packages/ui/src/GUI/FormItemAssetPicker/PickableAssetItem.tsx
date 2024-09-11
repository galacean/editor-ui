import React, { useState, useEffect, useRef } from "react";

import { AssetItem, AssetName, AssetThumbnail } from "../../AssetPicker";
import { PopoverCloseTrigger } from "../../Popover";

export interface BasicAssetType {
  id: string;
  name: string;
  isSubAsset?: boolean;
  path?: string;
  vitualPath?: string;
  [key: string]: any;
  getMetaConfig: () => any;
}

export interface PickableAssetItemProps<T extends BasicAssetType> {
  asset: T;
  onClick: () => void;
  selected: boolean;
  displayMode: "list" | "grid";
}

export function PickableAssetItem<T extends BasicAssetType>(props: PickableAssetItemProps<T>) {
  const { asset, onClick, selected, displayMode = "grid" } = props;
  const metaInfo = useRef(asset.getMetaConfig());

  return (
    <PopoverCloseTrigger asChild>
      <AssetItem name={asset.name} onClick={onClick} displayMode={displayMode}>
        <AssetThumbnail
          thumbnail={asset.thumbnailUrl}
          loadingStatus="success"
          expandable={false}
          isSelected={selected}
          mini={displayMode === "list"}
        />
        <AssetName name={asset.name} readonly isSelected={selected} ellipsis={displayMode !== "list"} />
      </AssetItem>
    </PopoverCloseTrigger>
  );
}
