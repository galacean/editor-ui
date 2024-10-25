import { createRoot } from "react-dom/client";
import { AlertDialog, type IAlertDialogProps } from "./AlertDialog";
import { forwardRef, useImperativeHandle, useState } from "react";

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


export { showAlert }