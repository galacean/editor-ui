import * as DialogPrimitive from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import React from 'react'

import { CSS, animations, styled } from '../design-system'
import { modalSurfaceStyle } from '../design-system/recipes'

export const basicStyle = styled(null, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  border: '1px solid transparent',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '&:focus-visible': {
    boxShadow: '$focus',
  },
  '&:disabled': {
    backgroundColor: '$surfaceSubtle',
    color: '$textMuted',
    cursor: 'not-allowed',
  },
})

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${animations.overlayFadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const StyledContent = styled(DialogPrimitive.Content, modalSurfaceStyle, {
  minWidth: '440px',
  width: 'min(440px, calc(100vw - 32px))',
  padding: '$4',
  overflow: 'hidden',
  animation: `${animations.contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '&:focus': { outline: 'none' },

  '&[data-state=open]': {
    animation: `${animations.contentFadeIn} 250ms ease`,
  },
  '&[data-state=closed]': {
    animation: `${animations.contentFadeOut} 250ms ease`,
  },
})

const StyledHeader = styled('div', {
  display: 'grid',
  gap: '$2',
  paddingRight: '$7',
})

const StyledBody = styled('div', {
  display: 'grid',
  gap: '$3',
})

const StyledFooter = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '$2',
  marginTop: '$2',
  paddingTop: '$4',
})

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  color: '$textStrong',
  fontSize: '$4',
  lineHeight: '$lineHeights$4',
  fontWeight: 600,
})

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: 0,
  color: '$textMuted',
  fontSize: '$2',
  lineHeight: '$lineHeights$2',
  maxWidth: '56ch',
})

const StyledCloseButton = styled(DialogPrimitive.DialogClose, basicStyle, {
  position: 'absolute',
  appearance: 'none',
  height: '$6',
  width: '$6',
  top: '$2',
  right: '$2',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '$sm',
  color: '$textMuted',
  zIndex: 2,
  backgroundColor: 'transparent',
  '& > svg': {
    height: '$iconMd',
    width: '$iconMd',
  },
  '&:hover': {
    color: '$textStrong',
    backgroundColor: '$softBgHover',
  },
  '&:focus-visible': {
    boxShadow: '$focus',
  },
})

function Content({ children, zIndex, css, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay className="DialogOverlay" style={{ zIndex }} />
      <StyledContent className="DialogContent" {...props} css={{ ...css, zIndex: zIndex }}>
        {children}
      </StyledContent>
    </DialogPrimitive.Portal>
  )
}

const DialogRoot = DialogPrimitive.Root
const DialogContent = Content

export const DialogCloseTrigger = DialogPrimitive.DialogClose
export const DialogHeader = StyledHeader
export const DialogBody = StyledBody
export const DialogFooter = StyledFooter
export const DialogTitle = StyledTitle
export const DialogDescription = StyledDescription

export function DialogTrigger(props: { children?: React.ReactNode }) {
  return <DialogPrimitive.Trigger asChild>{props.children}</DialogPrimitive.Trigger>
}

export interface DialogProps {
  open?: boolean
  disabled?: boolean
  trigger?: React.ReactNode
  children?: React.ReactNode
  closable?: boolean
  onOpenChange?: (open: boolean) => void
  css?: CSS
  zIndex?: number
  className?: string
  id?: string
}

export function Dialog(props: DialogProps) {
  const { trigger, children, closable, onOpenChange, disabled, css, zIndex, className, id, ...rest } = props

  return (
    <DialogRoot onOpenChange={onOpenChange} {...rest}>
      {trigger && (
        <DialogPrimitive.Trigger asChild disabled={disabled}>
          {trigger}
        </DialogPrimitive.Trigger>
      )}
      <DialogContent id={id} css={css} zIndex={zIndex} className={className}>
        {children}
        {closable && (
          <StyledCloseButton>
            <IconX />
          </StyledCloseButton>
        )}
      </DialogContent>
    </DialogRoot>
  )
}
