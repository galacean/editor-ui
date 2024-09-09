import React, { forwardRef, Fragment, useEffect, useRef } from "react";
import { IconCaretRightFilled, IconCaretLeftFilled, IconCloudDownload, IconCloudX } from "@tabler/icons-react";

import { ActionButton, Flex } from "..";
import { styled } from "../../design-system";
import { mergeRefs } from "../BezierCurveEditor/helper";

const internalIconMap = {
  Scene: "https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*YPp4RI0gd5AAAAAAAAAAAAAADuiaAQ/original",
  script: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*czQvQ5pE5rwAAAAAAAAAAAAADsGIAQ/original",
  StateMachineScript: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*czQvQ5pE5rwAAAAAAAAAAAAADsGIAQ/original",
  Folder: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*FCaHQb2o4LsAAAAAAAAAAAAADsGIAQ/original",
  Font: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*R3kdRoYoCj4AAAAAAAAAAAAADsGIAQ/original",
  Lottie: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*U8PPSY6hbhYAAAAAAAAAAAAADsGIAQ/original",
  SpriteAtlas: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*Q76oRpXoSFIAAAAAAAAAAAAADsGIAQ/original",
  AnimatorController: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*Rb6GQaK1aSwAAAAAAAAAAAAADsGIAQ/original",
  AnimationClip: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*xxhYSYnGJeMAAAAAAAAAAAAADsGIAQ/original",
  Spine: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*IQVfRLMioacAAAAAAAAAAAAADsGIAQ/original",
  Shader: "https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*9p1WS6QC9VIAAAAAAAAAAAAADuiaAQ/original",
  ShaderChunk: "https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*9p1WS6QC9VIAAAAAAAAAAAAADuiaAQ/original",
  XRReferenceImage: "https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*0gBaT5r89ZAAAAAAAAAAAAAADuiaAQ/original",
  glTF: "https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*XyFuQLVIPr8AAAAAAAAAAAAADsJ_AQ/original",
  Prefab: "https://mdn.alipayobjects.com/huamei_3zduhr/afts/img/A*YUWUTbgu3c0AAAAAAAAAAAAADsJ_AQ/original",
  SpineSkeletonData: "https://mdn.alipayobjects.com/huamei_x9dkln/afts/img/A*IQVfRLMioacAAAAAAAAAAAAADsGIAQ/original",
  SpineAtlas: "https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*q7VGRrYx_YQAAAAAAAAAAAAADuiaAQ/original"
};

const StyledCanvasRenderer = styled("div", {
  width: "90%",
  aspectRatio: "1/1",
  borderRadius: "$3",
  overflow: "hidden",
  variants: {
    isError: {
      true: {
        display: "none"
      }
    }
  }
});

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
