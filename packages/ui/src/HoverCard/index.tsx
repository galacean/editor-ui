import { PropsWithChildren, ReactNode } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { styled } from "../../design-system";
import { keyframes } from "../../design-system/keyframes";

const StyledContent = styled(HoverCardPrimitive.Content, {
  all: 'unset',
  display: "block",
  borderRadius: "$4",
  backgroundColor: "$gray2",
  border: "1px solid $gray5",
  animationName: `${keyframes.slideRightAndFade}`,
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  transformOrigin: 'var(--radix-hover-card-content-transform-origin)',
  willChange: "transform, opacity",
  '&[data-side="top"]': {
    animationName: `${keyframes.slideUpAndFade}`,
  },
  '&[data-side="bottom"]': {
    animationName: `${keyframes.slideDownAndFade}`,
  },
  '&[data-side="left"]': {
    animationName: `${keyframes.slideLeftAndFade}`,
  },
  '&[data-side="right"]': {
    animationName: `${keyframes.slideRightAndFade}`,
  },
});

interface HoverCardProps extends HoverCardPrimitive.HoverCardContentProps {
  children: ReactNode;
  trigger: ReactNode;
}

const HoverCard = (props: PropsWithChildren<HoverCardProps>) => {
  const { trigger, children, ...rest } = props;

  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>{trigger}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <StyledContent {...rest}>{children}</StyledContent>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};

export { HoverCard };