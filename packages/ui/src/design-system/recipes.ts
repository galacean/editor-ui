import { styled, css, keyframes } from './stitches.config'

type CSS = Parameters<typeof css>[0]

export const button = styled('button', {
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

const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

const openUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(.9)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
})

const scaleOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1)',
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.9)',
  },
})

export const scaleIn = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
})

export const basicItemStyle = styled('div', {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  lineHeight: 1,
  fontSize: '$1',
  borderRadius: '$sm',
  color: '$text',
  padding: '$1 $2',
  userSelect: 'none',
  boxSizing: 'border-box',
  minWidth: 'max-content',
  cursor: 'default',
  // disable state
  '&[data-disabled]': {
    color: '$textMuted',
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: '$primary',
    color: '$white',
  },

  variants: {
    size: {
      xs: {
        height: '$xs',
        fontSize: '$1',
        borderRadius: '$xs',
        minWidth: 'min-content',
      },
      sm: {
        height: '$sm',
        borderRadius: '$sm',
      },
      md: {
        height: '$md',
        borderRadius: '$md',
      },
      lg: {
        height: '$lg',
        borderRadius: '$md',
      },
    },
    critical: {
      true: {
        color: '$red10',
        '& > .kbd-item': {
          backgroundColor: '$redA3',
        },
        '&:focus': {
          // color: "$red11",
          color: '$white',
          backgroundColor: '$red10',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export const selectContent: CSS = {
  overflow: 'hidden',
  backgroundColor: '$overlayBg',
  borderRadius: '$lg',
  boxShadow: '$popContainer',
  border: '1px solid $border',
}

export const dropdownMenuContentStyle = styled('div', {
  maxHeight: 'var(--radix-dropdown-menu-content-available-height)',
  transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
  padding: 0,
})

export const contextMenuContentStyle = styled('div', {
  maxHeight: 'var(--radix-context-menu-content-available-height)',
  transformOrigin: 'var(--radix-context-menu-content-transform-origin)',
  padding: 0,
})

export const contentStyle = styled('div', {
  position: 'relative',
  backgroundColor: '$overlayBg',
  borderRadius: '$lg',
  padding: '$1',
  boxShadow: '$popContainer',
  transformOrigin: 'var(--radix-context-menu-content-transform-origin)',
  border: '1px solid $border',
  minWidth: '200px',
  animation: `${scaleIn} .2s ease`,
  animationDuration: '300ms',
  animationTimingFunction: `cubic-bezier(0.16, 1, 0.3, 1)`,
  willChange: 'transform, opacity',
  '&[data-side="top"]': {
    animationName: slideDownAndFade,
  },
  '&[data-side="bottom"]': {
    animationName: slideUpAndFade,
  },
  '&[data-side="left"]': {
    animationName: slideRightAndFade,
  },
  '&[data-side="right"]': {
    animationName: slideLeftAndFade,
  },
  variants: {
    size: {
      xs: {
        minWidth: 'max-content',
      },
      sm: {
        borderRadius: '$lg',
      },
      md: {
        borderRadius: '$xl',
      },
    },
  },
})

export const labelStyle = styled('span', {
  fontSize: '10px',
  color: '$textMuted',
  padding: '$1 $2',
  userSelect: 'none',
})

export const separatorStyle = styled('div', {
  height: 1,
  backgroundColor: '$border',
  margin: '$1',
})

export const indicatorStyle = styled('div', {
  position: 'absolute',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: '$1',
  width: '$4',
  height: '$4',
  marginRight: '$1_5',
  '& > svg': {
    width: '14px',
    height: '14px',
  },
})

export const radioGroupStyle = styled('div', {
  variants: {
    size: {
      xs: {
        [`& ${labelStyle}`]: {
          paddingLeft: '$6',
        },
      },
      sm: {},
      md: {},
    },
  },
})

export const checkboxItemStyle = styled('div', basicItemStyle, {
  position: 'relative !important',
  paddingLeft: '$6 !important',
  '&[data-state=checked]': {
    display: 'flex',
    justifyContent: 'initial',
  },
})

export const radioItemStyle = styled('div', basicItemStyle, {
  paddingLeft: '$6',
  '&[data-state=checked]': {
    display: 'flex',
    justifyContent: 'initial',
  },
  variants: {
    size: {
      xs: {
        paddingLeft: '$5',
      },
      sm: {},
      md: {},
    },
  },
})

export const subMenuItemStyle = styled('div', basicItemStyle, {
  position: 'relative',
  // For CaretRightIcon style
  '& > svg': {
    width: '$3',
    height: '$3',
  },
})

const overlayFadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.44 },
})

const overlayFadeOut = keyframes({
  '0%': { opacity: 0.44 },
  '100%': { opacity: 0 },
})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})
export const overlayStyle = styled(null, {
  position: 'fixed',
  backgroundColor: 'rgba(0,0,0,.8)',
  inset: 0,
  zIndex: 50,
  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${overlayShow} .15s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
    '&[data-state="closed"]': {
      animation: `${overlayShow} .15s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
  },
})

export const flexTextOverflow = css({
  flex: 1,
  minWidth: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
