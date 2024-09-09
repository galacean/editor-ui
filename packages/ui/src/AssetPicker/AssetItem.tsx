import { forwardRef } from 'react'
import { AssetName, AssetNameProps } from './AssetName'
import { AssetThumbnail, AssetThumbnailProps } from './AssetThumbnail'
import { styled } from '@galacean/design-system';

const AssetItemRoot = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  gap: "$1",
  alignItems: "center",
  padding: "$0_5",
  "&[data-sub]": {
    backgroundColor: "$grayA2"
  },
  "&[data-sub]:nth-child(1 of &[data-sub])": {
    borderRadius: "$3"
  },
  "&[data-sub]:nth-last-child(1 of &[data-sub])": {
    borderRadius: "$3"
  },
  variants: {
    displayMode: {
      grid: {
        flexDirection: "column"
      },
      list: {
        flexDirection: "row",
        marginLeft: "$1",
        gap: 0,
        padding: 0
      }
    }
  },
  defaultVariants: {
    displayMode: "grid"
  }
});


export interface AssetItemProps extends AssetThumbnailProps, AssetNameProps, React.HTMLAttributes<HTMLDivElement> {
  displayMode?: "grid" | "list";
  readonly?: boolean;
  sub?: boolean;
}
  

export const AssetItem = forwardRef<HTMLDivElement, AssetItemProps>(
  function AssetItem(props: AssetItemProps, forwardedRef) {
    const {
      displayMode,
      sub,

      thumbnail,
      loadingStatus,
      isExpanded,
      isSelected,
      dropping,
      expandable,
      onToggleExpand,

      name,
      onRename,
      readonly,
      ellipsis,

      children,
      ...rest
    } = props;
    return (
      <AssetItemRoot
        ref={forwardedRef}
        displayMode={displayMode}
        data-sub={sub}
        aria-selected={isSelected}
        aris-expanded={isExpanded}
        {...rest}
      >
        <AssetThumbnail
          thumbnail={thumbnail}
          loadingStatus={loadingStatus}
          isExpanded={isExpanded}
          isSelected={isSelected}
          dropping={dropping}
          expandable={expandable}
          onToggleExpand={onToggleExpand}
        />
        <AssetName
          name={name}
          onRename={onRename}
          readonly={readonly}
          ellipsis={ellipsis}
          isSelected={isSelected}
        />
        {children}
      </AssetItemRoot>
    )
  }
)