import React, { useState, PropsWithChildren, ComponentProps } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { styled, keyframes, VariantProps, CSS } from "../../design-system";

const scaleIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0)" },
  "100%": { opacity: 1, transform: "scale(1)" }
});

const StyledContent = styled(TooltipPrimitive.Content, {
  display: "flex",
  alignItems: "center",
  fontSize: "13px",
  padding: "$2 $3",
  backgroundColor: "$gray2",
  borderRadius: "$4",
  color: "$gray12",
  boxShadow: "inset 0 0 0 1px $colors$grayA4",
  transformOrigin: "var(--radix-tooltip-content-transform-origin)",
  animation: `${scaleIn} 0.15s ease-in-out forwards`,
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
  position: "relative",
  top: -1,
  fill: "$appBg"
});

export interface TooltipProps extends Omit<TooltipPrimitive.TooltipContentProps, 'content'> {
  content?: React.ReactNode;
  arrow?: boolean;
  delayDuration?: number;
}

function Tooltip(props: PropsWithChildren<TooltipProps>) {
  const {
    children,
    content,
    side = "bottom",
    sideOffset = 6,
    delayDuration = 0,
    ...rest
  } = props;
  return (
    <TooltipPrimitive.TooltipProvider>
      <TooltipPrimitive.Root delayDuration={delayDuration} {...rest}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <StyledContent sideOffset={sideOffset} side={side}>
            {content}
          </StyledContent>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.TooltipProvider>
  );
}

export { Tooltip };
