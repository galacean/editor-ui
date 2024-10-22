import React, { forwardRef, Fragment } from "react";
import { IconCaretRightFilled, IconCaretLeftFilled, IconCloudDownload, IconCloudX } from "@tabler/icons-react";

import { styled, type CSS } from "../../design-system";
import { ActionButton, Flex, mergeRefs } from "../";

const ExpandButton = styled(ActionButton, {
  position: "absolute",
  top: "50%",
  right: "0",
  transform: "translateY(-50%)",
  opacity: 0,
  transition: "opacity 0.16s ease-in-out",
  color: "$gray12",
  variants: {
    expanded: {
      true: {
        opacity: 1
      }
    }
  }
});

const AssetThumbnailRoot = styled(Flex, {
  position: "relative",
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: "$3",
  flexShrink: 0,
  userSelect: "none",
  backgroundColor: "transparent",
  outline: "0px solid transparent",
  transition: "background-color 0.16s ease-in-out, outline 0.16s ease-in-out",
  "&:hover": {
    backgroundColor: "$grayA2"
  },
  variants: {
    expandable: {
      true: {
        "&:hover": {
          [`${ExpandButton}`]: {
            opacity: 1
          }
        }
      }
    },
    mini: {
      true: {
        width: "$5",
        height: "$5",
        borderRadius: "$2"
      }
    },
    selected: {
      true: {
        backgroundColor: "$grayA3",
        "&:hover": {
          backgroundColor: "$grayA3"
        }
      }
    },
    dropping: {
      true: {
        backgroundColor: "$blueA4",
        outline: "2px solid $colors$blue10",
        '&:hover': {
          backgroundColor: "$blueA4",
        },
        "& img": {
          transform: "scale(1.06)"
        }
      }
    }
  },
  "& img": {
    display: "block",
    objectFit: "cover",
    width: "60%",
    maxWidth: "100%",
    maxHeight: "100%",
    transform: "scale(1)",
    transition: "transform 0.16s ease-in-out"
  }
});

export interface AssetThumbnailProps {
  thumbnail?: string;
  loadingStatus?: "loading" | "error" | "success";
  selected?: boolean;
  dropping?: boolean;
  mini?: boolean;
  expanded?: boolean;
  expandable?: boolean;
  onToggleExpanded?: () => void;
  css?: CSS;
}

export const AssetThumbnail = forwardRef<HTMLDivElement, AssetThumbnailProps>(
  function AssetThumbnail(props, forwardedRef) {
    const thumbnailRef = React.useRef<HTMLDivElement>(null);
    const {
      thumbnail,
      dropping = false,
      mini = false,
      selected,
      expandable = false,
      expanded,
      onToggleExpanded,
      loadingStatus,
      css
    } = props;
  
    const handleToggleExpand = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onToggleExpanded && onToggleExpanded();
    };
  
    return (
      <AssetThumbnailRoot
        mini={mini}
        align="both"
        expandable={expandable}
        selected={selected}
        dropping={dropping}
        css={css}
        ref={
          mergeRefs([
            thumbnailRef,
            forwardedRef
          ])
        }
      >
        {loadingStatus !== undefined && loadingStatus !== "success" && (
          <Fragment>
            {loadingStatus === "loading" && <IconCloudDownload size="16px" />}
            {loadingStatus === "error" && <IconCloudX size="16px" />}
          </Fragment>
        )}
        {(loadingStatus === undefined || thumbnail && loadingStatus === "success") && <img src={thumbnail} />}
        {expandable && (
          <ExpandButton expanded={expanded} onClick={handleToggleExpand} size="xs" variant="subtle">
            {expanded ? (
              <IconCaretLeftFilled size="24px" strokeWidth={3} />
            ) : (
              <IconCaretRightFilled size="24px" strokeWidth={3} />
            )}
          </ExpandButton>
        )}
      </AssetThumbnailRoot>
    );
  }
) 
