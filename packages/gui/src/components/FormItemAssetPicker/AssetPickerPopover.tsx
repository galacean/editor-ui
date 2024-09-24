import React, { useState } from "react";

import { AssetPickerContent } from "./AssetPickerContent";

import { Popover } from "@galacean/editor-ui";

export interface BasicAssetType {
  id: string;
  name: string;
  isSubAsset?: boolean;
  path?: string;
  vitualPath?: string;
  [key: string]: any;
  getMetaConfig: () => any;
}

export function dirname(path: string) {
  const match = /(\/|\\)[^/\\]*$/.exec(path);
  if (!match) return ".";

  const dir = path.slice(0, -match[0].length);

  // If `dir` is the empty string, we're at root.
  return dir ? dir : "/";
}

export interface PickableAssetItemProps<T extends BasicAssetType> {
  asset: T;
  onClick: () => void;
  selected: boolean;
  displayMode: "list" | "grid";
}

export interface AssetPickerPopoverProps<T> {
  disabled?: boolean;
  assets?: T[];
  asset?: T;
  trigger?: React.ReactElement;
onSelect?: (asset: T) => void;
  customFilter?: (asset: T) => boolean;
}

export function AssetPickerPopover<T extends BasicAssetType>(props: AssetPickerPopoverProps<T>) {
  const { asset, disabled, onSelect, assets = [], trigger } = props;
  const [selectedAssetId, setSelectedAssetId] = useState(asset?.id);

  return (
    <Popover
      compact
      disabled={disabled}
      trigger={trigger}
      onOpenChange={(open) => {
        if (open) {
          setSelectedAssetId(asset?.id);
        }
      }}
      sideOffset={6}
    >
      <AssetPickerContent selectedAssetId={selectedAssetId} assets={assets} onSelect={onSelect} />
    </Popover>
  );
}
