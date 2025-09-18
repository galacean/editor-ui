import React, { forwardRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { PopoverContentProps as PrimitiveContentProps } from '@radix-ui/react-popover'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { CSS, styled } from '../design-system'
import { keyframes } from '../design-system/keyframes'
import { contentStyle } from '../design-system/recipes'
import { composeEventHandlers } from '../utils/composeEventHandler'

const StyledContent = styled(PopoverPrimitive.Content, contentStyle, {
  padding: '$2',
  fontSize: '$1',
  color: '$text',
  minWidth: '160px',
  outline: 'none',
  animationDuration: '300ms',
  animationTimingFunction: 'ubic-bezier(0.25, 0.8, 0.25, 1)',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: keyframes.slideDownAndFade },
    '&[data-side="right"]': { animationName: keyframes.slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: keyframes.slideUpAndFade },
    '&[data-side="left"]': { animationName: keyframes.slideRightAndFade },
  },
  variants: {
    compact: {
      true: {
        padding: 0,
      },
    },
    constrainSize: {
      true: {
        width: 'var(--radix-popover-trigger-width)',
        maxHeight: 'var(--radix-popover-content-available-height)',
      },
    },
  },
})

const Trigger = styled(PopoverPrimitive.Trigger, {
  variants: {
    disabled: {
      true: {
        pointerEvents: 'none',
        userSelect: 'none',
      },
    },
  },
})

export type PopoverProps = PopoverContentProps & {
  trigger: React.ReactNode
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  compact?: boolean
  constrainSize?: boolean;
  css?: CSS
  container?: Element
}

interface PopoverContentProps extends PrimitiveContentProps {
  children?: React.ReactNode
  open?: boolean
  forceRender?: boolean
  container?: Element
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  props: PopoverContentProps,
  forwardedRef
) {
  const { children, open, container, forceRender = false, ...rest } = props

  const [fragment, setFragment] = React.useState<DocumentFragment>()

  useLayoutEffect(() => {
    setFragment(new DocumentFragment())
  }, [])

  if (!open && forceRender) {
    const frag = fragment as unknown as Element | undefined
    return frag ? createPortal(children, frag) : null
  }

  return (
    <PopoverPrimitive.Portal container={container}>
      <StyledContent {...rest} ref={forwardedRef}>
        {children}
      </StyledContent>
    </PopoverPrimitive.Portal>
  )
})

const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(props: PopoverProps, forwardedRef) {
  const { trigger, children, disabled, open: propOpen, onOpenChange, sideOffset = 6, ...rest } = props

  const [open, setOpen] = useControllableState({
    prop: propOpen,
    defaultProp: false,
    onChange: onOpenChange,
  })

  // https://github.com/radix-ui/primitives/issues/1159
  function stopPropagation(e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation()
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <Trigger asChild disabled={disabled}>
        {trigger}
      </Trigger>
      <PopoverContent
        {...rest}
        sideOffset={sideOffset}
        open={open}
        ref={forwardedRef}
        onWheel={composeEventHandlers(stopPropagation, rest.onWheel)}
        onTouchMove={composeEventHandlers(stopPropagation, rest.onTouchMove)}
      >
        {children}
      </PopoverContent>
    </PopoverPrimitive.Root>
  )
})

const PopoverCloseTrigger = PopoverPrimitive.Close

export { Popover, PopoverCloseTrigger }
