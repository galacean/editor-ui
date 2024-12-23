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
  backgroundColor: "$gray1",
  borderRadius: "$3",
  color: "$gray12",
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
    arrow = false,
    side = "top",
    sideOffset = 4,
    delayDuration = 300,
    ...rest
  } = props;
  return (
    <TooltipPrimitive.TooltipProvider>
      <TooltipPrimitive.Root delayDuration={delayDuration} {...rest}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <StyledContent sideOffset={sideOffset} side={side}>
          {arrow && <StyledArrow />}
          {content}
        </StyledContent>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.TooltipProvider>
  );
}

export { Tooltip };
