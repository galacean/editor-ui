import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import React, { forwardRef, PropsWithChildren, ReactElement, useImperativeHandle, useState } from "react";
import { createRoot } from "react-dom/client";

import { styled } from "../../design-system";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { contentStyle, overlayStyle } from "../../design-system/recipes";
import { Text, Title } from "../Typography";

const {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title: AlertTitle,
  Description,
  Cancel,
  Action
} = AlertDialogPrimitive;

const StyledOverlay = styled(Overlay, overlayStyle);
const StyledContent = styled(Content, contentStyle, {
  maxWidth: "500px",
  minWidth: "360px",
  minHeight: "140px"
});

const StyledFooter = styled(Flex, {
  marginTop: "$6",
  justifyContent: "flex-end",
  position: "absolute",
  bottom: "$3",
  right: "$3"
});

interface IAlertDialogProps {
  trigger?: React.ReactNode;
  title: string;
  description?: string | React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  zIndex?: number;
  actionable?: boolean;
}

function AlertDialog(props: PropsWithChildren<IAlertDialogProps & AlertDialogProps>) {
  const {
    trigger,
    title,
    description,
    cancelText = "Cancel",
    confirmText = "Confirm",
    onConfirm,
    onClose,
    zIndex,
    actionable = true,
    ...rest
  } = props;
  return (
    <Root {...rest}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <StyledOverlay style={{ zIndex }} />
        <StyledContent style={{ zIndex }}>
          <AlertTitle asChild>
            <Title order={6} css={{ marginBottom: "$1", fontWeight: 500 }}>
              {title}
            </Title>
          </AlertTitle>
          {description && (
            <Description asChild>
              <Text size="1" secondary css={{ whiteSpace: "pre-line" }}>
                {description}
              </Text>
            </Description>
          )}
          {actionable && (
            <StyledFooter gap="sm" justifyContent="end">
              <Cancel asChild>
                <Button variant="secondary" size="sm" onClick={onClose}>
                  {cancelText}
                </Button>
              </Cancel>
              <Action asChild>
                <Button variant="primary" critical size="sm" onClick={onConfirm}>
                  {confirmText}
                </Button>
              </Action>
            </StyledFooter>
          )}
        </StyledContent>
      </Portal>
    </Root>
  );
}

function genPortalId() {
  return `editor-portal-id-${new Date().getTime()}`;
}

function showAlert(props: Omit<IAlertDialogProps, "trigger">) {
  const el = document.createElement("span");
  const id = genPortalId();
  el.id = id;
  document.body.appendChild(el);
  const root = createRoot(el);

  const Wrapper = forwardRef(function AlertWrapper(_, ref) {
    const [open, setOpen] = useState(true);

    const close = () => {
      setOpen(false);
      root.unmount();
      if (props.onClose) {
        props.onClose();
      }
    };

    const confirm = () => {
      setOpen(false);
      if (props.onConfirm) {
        props.onConfirm();
      }
    };

    useImperativeHandle(ref, () => ({
      close
    }));

    return (
      <AlertDialog
        {...props}
        trigger={null}
        onClose={close}
        onConfirm={confirm}
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            close();
          }
        }}
      />
    );
  });

  root.render(<Wrapper />);

  return {
    close
  };
}

export { AlertDialog, showAlert };
