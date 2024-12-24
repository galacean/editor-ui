import React, { forwardRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { PopoverContentProps as PrimitiveContentProps } from "@radix-ui/react-popover";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { styled } from "../../design-system";
import { keyframes } from "../../design-system/keyframes";
import { contentStyle } from "../../design-system/recipes";

const StyledContent = styled(PopoverPrimitive.Content, {
  padding: "$2",
  fontSize: '$1',
  color: '$text',
  minWidth: "160px",
  outline: "none",
  backgroundColor: '$gray1',
  borderRadius: '$4',
  border: '1px solid $border',
  animationDuration: "300ms",
  animationTimingFunction: "ubic-bezier(0.25, 0.8, 0.25, 1)",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: keyframes.slideDownAndFade },
    '&[data-side="right"]': { animationName: keyframes.slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: keyframes.slideUpAndFade },
    '&[data-side="left"]': { animationName: keyframes.slideRightAndFade },
  },
  variants: {
    compact: {
      true: {
        padding: 0
      }
    },
    constrainSize: {
      true: {
        width: "var(--radix-popover-trigger-width)",
        maxHeight: "var(--radix-popover-content-available-height)"
      }
    }
  }
});

const Trigger = styled(PopoverPrimitive.Trigger, {
  variants: {
    disabled: {
      true: {
        pointerEvents: "none",
        userSelect: "none"
      }
    }
  }
});

export type PopoverProps = PopoverContentProps & {
  trigger: React.ReactNode;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  compact?: boolean;
  constrainSize?: boolean;
};

interface PopoverContentProps extends PrimitiveContentProps {
  children?: React.ReactNode;
  open?: boolean;
  forceRender?: boolean;
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(props: PopoverContentProps, forwardedRef) {
    const { children, open, forceRender = false, ...rest } = props;
  
    const [fragment, setFragment] = React.useState<DocumentFragment>();
  
    useLayoutEffect(() => {
      setFragment(new DocumentFragment());
    }, []);
  
    if (!open && forceRender) {
      const frag = fragment as unknown as Element | undefined;
      return frag ? ReactDOM.createPortal(children, frag) : null;
    }
  
    return (
      <PopoverPrimitive.Portal>
        <StyledContent {...rest} ref={forwardedRef}>
          {children}
        </StyledContent>
      </PopoverPrimitive.Portal>
    );
  }
) 

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(props: PopoverProps, forwardedRef) {
    const { trigger, children, disabled, open: propOpen, onOpenChange, sideOffset = 6, ...rest } = props;
  
    const [open, setOpen] = useControllableState({
      prop: propOpen,
      defaultProp: false,
      onChange: onOpenChange
    });
  
    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <Trigger asChild disabled={disabled}>
          {trigger} 
        </Trigger>
        <PopoverContent {...rest} sideOffset={sideOffset} open={open} ref={forwardedRef}>
          {children}
        </PopoverContent>
      </PopoverPrimitive.Root>
    );
  }
) 

const PopoverCloseTrigger = PopoverPrimitive.Close;

export { Popover, PopoverCloseTrigger };
