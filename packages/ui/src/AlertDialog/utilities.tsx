import { createRoot } from 'react-dom/client'
import { AlertDialog, type IAlertDialogProps } from './AlertDialog'
import { useState } from 'react'

let portalCounter = 0

function genPortalId() {
  return `editor-portal-id-${++portalCounter}`
}

function showAlert(props: Omit<IAlertDialogProps, 'trigger'>) {
  const el = document.createElement('span')
  el.id = genPortalId()
  document.body.appendChild(el)
  const root = createRoot(el)

  const cleanup = () => {
    root.unmount()
    el.remove()
    document.body.style.pointerEvents = ''
  }

  const Wrapper = () => {
    const [open, setOpen] = useState(true)

    const close = () => {
      setOpen(false)
      cleanup()
      props.onClose?.()
    }

    const confirm = () => {
      setOpen(false)
      cleanup()
      props.onConfirm?.()
    }

    return (
      <AlertDialog
        {...props}
        trigger={null}
        onClose={close}
        onConfirm={confirm}
        open={open}
        onOpenChange={(o) => {
          if (!o) {
            close()
          }
        }}
      />
    )
  }

  root.render(<Wrapper />)

  return {
    close: () => {
      cleanup()
      props.onClose?.()
    },
  }
}

export { showAlert }
