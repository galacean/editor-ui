import { forwardRef } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { styled } from "../../design-system";
import { AssetThumbnail } from "./AssetThumbnail";
import AssetName from "./AssetName";

const StyledAssetItem = styled("div", {
  display: "flex",
  flexWrap: "nowrap",
  gap: "$1",
  alignItems: "center",
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
        marginLeft: "$1"
      }
    }
  },
  defaultVariants: {
    displayMode: "grid"
  }
});


export interface AssetItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  name: string;
  selected?: boolean;
  onSelectedChange?: () => void;
  readOnly?: boolean;
  onRename?: (name: string) => Promise<void>;
  thumbnail?: string;
  loadingStatus?: "loading" | "error" | "success";
  expandable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: () => void;
}

export const AssetItem = 
  forwardRef<HTMLDivElement, AssetItemProps>(
    function AssetItem(props: AssetItemProps, forwardedRef) {
      const {
        name,
        selected,
        onSelectedChange,
        readOnly,
        thumbnail,
        onRename,
        expandable,
        loadingStatus,
        ...rest
      } = props;
    
      const [expanded, setExpanded] = useControllableState({
        prop: props.expanded,
        defaultProp: props.defaultExpanded ?? false,
        onChange: props.onExpandedChange
      });
    
      return (
        <StyledAssetItem
          aria-label={name}
          aria-expanded={expanded}
          aria-selected={selected}
          onClick={onSelectedChange}
          {...rest}
          ref={forwardedRef}
        >
          <AssetThumbnail
            thumbnail={thumbnail}
            loadingStatus={loadingStatus}
            selected={selected}
            expandable={expandable}
            expanded={expanded}
            onToggleExpanded={() => setExpanded(!expanded)}
          />
          <AssetName
            name={name}
            selected={selected}
            readOnly={readOnly}
            onRename={onRename}
          />
        </StyledAssetItem>
      )
    }
  )
