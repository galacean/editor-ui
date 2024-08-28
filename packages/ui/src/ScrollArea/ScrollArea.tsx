import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { ScrollAreaViewportProps } from "@radix-ui/react-scroll-area";

import { styled } from "@galacean/design-system";
import { css } from "@galacean/design-system";

const SCROLLBAR_SIZE = 4;

const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root, {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden"
});

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport, {
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    // https://github.com/radix-ui/primitives/issues/926
    "& > div[style]": {
      display: "block !important"
    }
});

const ScrollAreaScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
    display: "flex",
    userSelect: "none",
    touchAction: "none",
    padding: "0_5 0 0_5 0_5",
    transition: "background 160ms ease-out",
    "&:hover": { background: "grayA5" },
    '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: SCROLLBAR_SIZE
    }
});

const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb, {
    flex: 1,
    background: "gray10",
    borderRadius: SCROLLBAR_SIZE,
    // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "100%",
      minWidth: 8,
      minHeight: 8
    }
});

interface ScrollAreaProps extends ScrollAreaViewportProps {
  children: React.ReactNode;
}

export function ScrollArea(props: ScrollAreaProps) {
  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport {...props} />
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaPrimitive.Corner className={css({ backgroundColor: "grayA5" })} />
    </ScrollAreaRoot>
  );
}
