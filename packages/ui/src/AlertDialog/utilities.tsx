import { createRoot } from "react-dom/client";
import { AlertDialog, type IAlertDialogProps } from "./AlertDialog";
import { forwardRef, useImperativeHandle, useRef } from "react";

function genPortalId() {
  return `editor-portal-id-${new Date().getTime()}`;
}

/**
 * Radix DismissableLayer sets `document.body.style.pointerEvents = "none"` on
 * mount and restores it via useEffect cleanup on unmount. However the cleanup
 * execution order during root.unmount() causes the restore to be skipped
 * (the layer set is cleared before the restore check runs). We explicitly
 * restore pointer-events after unmounting.
 */
function disposePortal(root: ReturnType<typeof createRoot>, el: HTMLElement) {
  root.unmount();
  document.body.style.pointerEvents = "";
  el.remove();
}

function showAlert(props: Omit<IAlertDialogProps, "trigger">) {
  const el = document.createElement("span");
  const id = genPortalId();
  el.id = id;
  document.body.appendChild(el);
  const root = createRoot(el);

  const Wrapper = forwardRef(function AlertWrapper(_, ref) {
    const settledRef = useRef(false);

    const settle = (cb: (() => void) | undefined) => {
      if (settledRef.current) return;
      settledRef.current = true;
      setTimeout(() => {
        disposePortal(root, el);
        cb?.();
      }, 0);
    };

    const close = () => settle(props.onClose);
    const confirm = () => settle(props.onConfirm);

    useImperativeHandle(ref, () => ({ close }));

    return (
      <AlertDialog
        {...props}
        trigger={null}
        onClose={close}
        onConfirm={confirm}
        open={true}
        onOpenChange={(o) => {
          if (!o) close();
        }}
      />
    );
  });

  root.render(<Wrapper />);

  return { close };
}

export { showAlert }
