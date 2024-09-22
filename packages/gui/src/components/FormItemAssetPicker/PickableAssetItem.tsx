import { forwardRef } from "react";
import { AssetItem, PopoverCloseTrigger, type AssetItemProps } from '@galacean/editor-ui';

export interface BasicAssetType {
  id: string;
  name: string;
  isSubAsset?: boolean;
  path?: string;
  vitualPath?: string;
  [key: string]: any;
  getMetaConfig: () => any;
}

export interface PickableAssetItemProps extends AssetItemProps {}

export const PickableAssetItem = 
  forwardRef<HTMLDivElement, PickableAssetItemProps>(
    function PickableAssetItem(props, forwardedRef) {
      return (
        <PopoverCloseTrigger asChild>
          <AssetItem
            {...props}
            ref={forwardedRef}
            readOnly
          />
        </PopoverCloseTrigger>
      );
    }
  )
