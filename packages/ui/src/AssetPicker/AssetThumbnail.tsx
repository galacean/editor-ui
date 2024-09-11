import React, { forwardRef, Fragment, useEffect, useRef } from "react";
import { IconCaretRightFilled, IconCaretLeftFilled, IconCloudDownload, IconCloudX } from "@tabler/icons-react";

import { ActionButton, Flex } from "..";
import { styled } from "../../design-system";
import { mergeRefs } from "../BezierCurveEditor/helper";

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

const StyledAssetItemThumbnail = styled(Flex, {
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
    isSelected: {
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
        outline: "2px solid $blue10",
        "& img": {
          transform: "scale(1.06)"
        }
      }
    }
  },
  "& img": {
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
  canvasIcon?: any;
  isExpanded?: boolean;
  isSelected?: boolean;
  dropping?: boolean;
  mini?: boolean;
  expandable?: boolean;
  onToggleExpand?: () => void;
}

const AssetThumbnail = forwardRef<HTMLDivElement, AssetThumbnailProps>(
  function AssetThumbnail(props, forwardedRef) {
    const thumbnailRef = React.useRef<HTMLDivElement>(null);
    const {
      thumbnail,
      dropping = false,
      mini = false,
      expandable = false,
      onToggleExpand,
      isSelected,
      isExpanded,
      loadingStatus,
    } = props;

    const handleToogleExpand = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onToggleExpand && onToggleExpand();
    };

    console.log('thumbnail', thumbnail, loadingStatus);  

    return (
      <StyledAssetItemThumbnail
        mini={mini}
        align="both"
        expandable={expandable}
        isSelected={isSelected}
        dropping={dropping}
        ref={mergeRefs([forwardedRef, thumbnailRef])}
      >
        {loadingStatus && loadingStatus !== "success" ? (
          <Fragment>
            {loadingStatus === "loading" && <IconCloudDownload size="16px" />}
            {loadingStatus === "error" && <IconCloudX size="16px" />}
          </Fragment>
        ): (
          <img src={thumbnail} />
        )}
        {expandable && (
          <ExpandButton expanded={isExpanded} onClick={handleToogleExpand} size="xs" variant="subtle">
            {isExpanded ? (
              <IconCaretLeftFilled size="24px" strokeWidth={3} />
            ) : (
              <IconCaretRightFilled size="24px" strokeWidth={3} />
            )}
          </ExpandButton>
        )}
      </StyledAssetItemThumbnail>
    );
  }
)

export { AssetThumbnail };
