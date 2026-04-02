import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import React, { PropsWithChildren } from 'react'

import { styled, animations } from '../design-system'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { modalSurfaceStyle, overlayStyle } from '../design-system/recipes'
import { CSS } from '../design-system'

const { Root, Trigger, Portal, Overlay, Content, Title: AlertTitle, Description, Cancel, Action } = AlertDialogPrimitive

const StyledOverlay = styled(Overlay, overlayStyle, {
  animation: `${animations.overlayFadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})
const StyledContent = styled(Content, modalSurfaceStyle, {
  padding: '$4',
  maxWidth: '26rem',
  width: 'min(26rem, calc(100vw - 32px))',
  zIndex: 50,
  animation: `${animations.contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '&:focus': { outline: 'none' },

  '&[data-state=open]': {
    animation: `${animations.contentFadeIn} 250ms ease`,
  },
  '&[data-state=closed]': {
    animation: `${animations.contentFadeOut} 250ms ease`,
  },
})

const headerStyle: CSS = {
  display: 'grid',
  gap: '$2',
}

const footerStyle: CSS = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '$2',
  marginTop: '$5',
  paddingTop: '$4',
}

const StyledHeader = styled('div', headerStyle)

const StyledFooter = styled(Flex, footerStyle)

const StyledTitle = styled(AlertTitle, {
  margin: 0,
  color: '$textStrong',
  fontSize: '$4',
  lineHeight: '$lineHeights$4',
  fontWeight: 600,
})

const StyledDescription = styled(Description, {
  margin: 0,
  color: '$textMuted',
  fontSize: '$2',
  lineHeight: '$lineHeights$2',
  maxWidth: '56ch',
  whiteSpace: 'pre-line',
})

export interface IAlertDialogProps {
  trigger?: React.ReactNode
  title: string
  description?: string | React.ReactNode
  cancelText?: string
  confirmText?: string
  onClose?: () => void
  onConfirm?: () => void
  zIndex?: number
  actionable?: boolean
}

function AlertDialog(props: PropsWithChildren<IAlertDialogProps & AlertDialogProps>) {
  const {
    trigger,
    title,
    description,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onConfirm,
    onClose,
    zIndex,
    actionable = true,
    ...rest
  } = props
  return (
    <Root {...rest}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <StyledOverlay style={{ zIndex }} />
        <StyledContent style={{ zIndex }}>
          <StyledHeader>
            <StyledTitle>{title}</StyledTitle>
            {description && <StyledDescription>{description}</StyledDescription>}
          </StyledHeader>
          {actionable && (
            <StyledFooter gap="sm" justifyContent="end">
              {onClose && (
                <Cancel asChild>
                  <Button variant="soft" size="md" onClick={onClose}>
                    {cancelText}
                  </Button>
                </Cancel>
              )}
              {onConfirm && (
                <Action asChild>
                  <Button variant="solid" critical size="md" onClick={onConfirm}>
                    {confirmText}
                  </Button>
                </Action>
              )}
            </StyledFooter>
          )}
        </StyledContent>
      </Portal>
    </Root>
  )
}

export { AlertDialog }
