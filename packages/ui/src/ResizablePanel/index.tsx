import React, { useState, useCallback, useEffect, useRef, forwardRef } from "react";

import { styled } from "../../design-system";
import { clamp } from "../../utils";
import { mergeRefs } from "../../utils/merge-refs";

const StyledResizeHandler = styled("div", {
  "&:after": {
    content: '""',
    position: "absolute"
  },
  variants: {
    variant: {
      solid: {
        borderColor: "$border",
        "&:hover": {
          "&::after": {
            borderColor: "$blue10"
          }
        }
      },
      transparent: {
        "&::after": {
          borderColor: "transparent"
        },
        "&:hover": {
          "&::after": {
            borderColor: "$blue10"
          }
        }
      }
    },
    needPosition: {
      true: {
        position: "absolute"
      }
    },
    direction: {
      horizontal: {
        height: "100%",
        width: "4px",
        position: "absolute",
        cursor: "col-resize",
        "&::after": {
          width: "4px",
          height: "100%",
          borderLeftWidth: "4px",
          borderLeftStyle: "solid",
          transition: "all .2s ease"
        }
      },
      vertical: {
        position: "absolute",
        height: "4px",
        width: "100%",
        cursor: "row-resize",
        "&:after": {
          width: "100%",
          height: "4px",
          borderBottom: "4px solid $border",
          borderLeft: "none",
          transition: "all .2s ease"
        }
      }
    },
    position: {
      left: {
        top: 0,
        left: 0
      },
      right: {
        top: 0,
        right: 0
      },
      top: {
        top: 0,
        left: 0
      },
      bottom: {
        bottom: 0,
        left: 0
      }
    }
  },
  defaultVariants: {
    needPosition: true,
    direction: "horizontal",
    position: "right",
    variant: "solid"
  }
});

type ResizablePanelProps = {
  children: React.ReactNode;
  asChild?: boolean;
  direction?: "horizontal" | "vertical";
  handlerPosition?: "left" | "right" | "top" | "bottom";
  variant?: "transparent" | "solid";
  reverse?: boolean;
  range?: {
    min?: number;
    max?: number;
  };
};

const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(function ResizablePanel(
  props: ResizablePanelProps,
  forwardedRef
) {
  const {
    children,
    range: rangeFromProps,
    direction = "horizontal",
    handlerPosition = "right",
    asChild = false,
    variant = "transparent",
    reverse = false
  } = props;
  const handler = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(rangeFromProps || { max: 0, min: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [resizing, setResizing] = useState(false);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      if (!resizing) return;
      let width, height;
      // const width = clamp(size.width + (clientX - origin.x), range.min, range.max);
      // const height = clamp(size.height + (clientY - origin.y), range.min, range.max);

      if (reverse) {
        if (direction === "horizontal") {
          width = clamp(size.width - (clientX - origin.x), range.min, range.max);
          // height = size.height;
        }
        if (direction === "vertical") {
          // width = size.width;
          height = clamp(size.height - (clientY - origin.y), range.min, range.max);
        }
      } else {
        if (direction === "horizontal") {
          width = clamp(size.width + (clientX - origin.x), range.min, range.max);
          // height = size.height;
        }
        if (direction === "vertical") {
          // width = size.width;
          height = clamp(size.height + (clientY - origin.y), range.min, range.max);
        }
      }

      if (direction === "horizontal") {
        ref.current.style.width = `${width}px`;
      }
      if (direction === "vertical") {
        ref.current.style.height = `${height}px`;
      }
    },
    [size, origin, resizing, direction]
  );

  const handleMouseUp = useCallback(() => {
    setResizing(false);
    setSize((size) => ({
      ...size,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight
    }));
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setResizing(true);
    setOrigin({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const { offsetWidth, offsetHeight } = ref.current;
    setSize({ width: offsetWidth, height: offsetHeight });
    if (!props.range) {
      let min, max;
      if (direction === "horizontal") {
        min = offsetWidth - 50;
        max = offsetWidth + 50;
        ref.current.style.width = `${offsetWidth}px`;
      }
      if (direction === "vertical") {
        min = offsetHeight - 50;
        max = offsetHeight + 50;
      }
      setRange({ min, max });
      ref.current.style.height = `${offsetHeight}px`;
    }

    ref.current.style.flex = "initial";
  }, []);

  useEffect(() => {
    if (handler.current) {
      handler.current.addEventListener("mousedown", handleMouseDown);
    }
    if (resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      if (handler.current) {
        handler.current.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, direction, handleMouseDown, handleMouseMove, handleMouseUp]);

  if (asChild) {
    const child = React.Children.only(children) as unknown as React.ReactElement;

    const handlerChild = (
      <StyledResizeHandler
        key="resize-handler"
        variant={variant}
        needPosition={false}
        ref={handler}
        direction={direction}
        position={handlerPosition}
      />
    );

    const clonedChild = React.cloneElement(
      child as React.ReactElement,
      {
        ...child.props,
        ref: mergeRefs([forwardedRef, ref, child.props.ref]),
        style: {
          ...(child.props.style || {}),
          position: "relative"
        }
      },
      [child.props.children, handlerChild]
    );
    return clonedChild;
  }

  return (
    <div ref={mergeRefs([forwardedRef, ref])} style={{ position: "relative" }}>
      {children}
      <StyledResizeHandler variant={variant} ref={handler} direction={direction} position={handlerPosition} />
    </div>
  );
});

export { ResizablePanel };
