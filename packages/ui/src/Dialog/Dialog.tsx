import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { IconX } from "@tabler/icons-react";
import React, { ComponentProps, forwardRef } from "react";

import { CSS, keyframes, styled } from "../../design-system";


export const basicStyle = styled(null, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  border: "1px solid transparent",
  boxSizing: "border-box",
  cursor: "pointer",
  "&:focus-visible": {
    boxShadow: "0 0 0 2px $colors$blueA7"
  },
  "&:disabled": {
    backgroundColor: "$grayA3",
    color: "$grayA8",
    cursor: "not-allowed"
  }
});

/* ------------------- Styled Primitive Headless Component ------------------ */

const overlayFadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 }
});

const overlayFadeOut = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 }
});

const contentShow = keyframes({
  from: {
    opacity: 0,
    transform: "translate(-50%, -48%) scale(0.96)"
  },
  to: {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)"
  }
});

const overlayShow = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

const contentFadeIn = keyframes({
  from: {
    opacity: 0,
    transform: "translate(-50%, -48%) scale(.96)"
  },
  to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }
});

const contentFadeOut = keyframes({
  from: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
  to: { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" }
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: "fixed",
  background: "rgba(0,0,0,.1)",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
});

const StyledContent = styled(DialogPrimitive.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "440px",
  maxHeight: "85vh",
  padding: "$3",
  borderRadius: "$4",
  overflow: "hidden",
  border: "1px solid $grayA4",
  backgroundColor: "$subbg",
  // zIndex: 2,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  "&:focus": { outline: "none" }

  // "&[data-state=open]": {
  //   animation: `${contentFadeIn} 250ms ease`
  // },
  // "&[data-state=closed]": {
  //   animation: `${contentFadeOut} 250ms ease`
  // }
});

const StyledCloseButton = styled(DialogPrimitive.DialogClose, basicStyle, {
  position: "absolute",
  appearance: "none",
  height: "$6",
  width: "$6",
  top: "$2",
  right: "$2",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: "$3",
  color: "$gray10",
  zIndex: 2,
  backgroundColor: "transparent",
  "& > svg": {
    height: "18px",
    width: "18px"
  },
  "&:hover": {
    color: "$gray12",
    backgroundColor: "$gray4"
  },
  "&:focus": {
    boxShadow: "0 0 0 3px $colors$grayA7"
  },
  "&:focus-visble": {
    boxShadow: "0 0 0 3px $colors$grayA7"
  }
});

function Content({ children, zIndex, css, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay className="DialogOverlay" style={{ zIndex }} />
      <StyledContent className="DialogContent" {...props} css={{ ...css, zIndex: zIndex }}>
        {children}
      </StyledContent>
    </DialogPrimitive.Portal>
  );
}

const DialogRoot = DialogPrimitive.Root;
const DialogContent = Content;

export const DialogCloseTrigger = DialogPrimitive.DialogClose;

export function DialogTrigger(props: { children?: React.ReactNode }) {
  return <DialogPrimitive.Trigger asChild>{props.children}</DialogPrimitive.Trigger>;
}

export interface DialogProps {
  open?: boolean;
  disabled?: boolean;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  closable?: boolean;
  onOpenChange?: (open: boolean) => void;
  css?: CSS;
  zIndex?: number;
  className?: string;
}

export function Dialog(props: DialogProps) {
  const { trigger, children, closable, onOpenChange, disabled, css, zIndex, className, ...rest } = props;

  return (
    <DialogRoot onOpenChange={onOpenChange} {...rest}>
      {trigger && (
        <DialogPrimitive.Trigger asChild disabled={disabled}>
          {trigger}
        </DialogPrimitive.Trigger>
      )}
      <DialogContent css={css} zIndex={zIndex} className={className}>
        <VisuallyHidden.Root>
          <DialogPrimitive.Title />
          <DialogPrimitive.Description />
        </VisuallyHidden.Root>
        {children}
        {closable && (
          <StyledCloseButton>
            <IconX />
          </StyledCloseButton>
        )}
      </DialogContent>
    </DialogRoot>
  );
}
