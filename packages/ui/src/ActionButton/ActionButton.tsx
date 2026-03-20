import { PropsWithChildren, ComponentProps, forwardRef } from 'react'

import { StitchesComponent, styled } from '../design-system'
import { useAsyncStatus } from '../hooks/useAsyncStatus'
import { Spin } from '../Spin'
import { button } from '../design-system/recipes'
import { IconRightBottomCorner } from '../Icons/IconRightBottomCorner'

const StyledActionButton = styled('button', button, {
  boxShadow: '$prepend',
  transition: '$shadow, $borderColor, $backgroundColor, $color, transform 0.2s ease',
  borderRadius: '$sm',
  color: '$text',
  flexShrink: 0,
  flexGrow: 0,
  padding: 0,
  '&:focus-visible': {
    boxShadow: '$focus',
  },
  '&:disabled': {
    color: '$textMuted',
    boxShadow: 'none',
    cursor: 'not-allowed',
    '&:hover': {
      color: '$textMuted',
    },
  },
  variants: {
    corner: {
      true: {
        position: 'relative',
      },
    },
    size: {
      xs: {
        height: '$xs',
        width: '$xs',
        borderRadius: '$xs',
        '& > svg': {
          height: '$iconXs',
          width: '$iconXs',
          strokeWidth: 1.5,
        },
        [`& ${Spin}`]: {
          height: '$2',
          width: '$2',
        },
      },
      sm: {
        height: '$sm',
        width: '$sm',
        borderRadius: '$sm',
        fontSize: '$1',
        '& svg': {
          height: '$iconSm',
          width: '$iconSm',
          strokeWidth: 1.5,
        },
        [`& ${Spin}`]: {
          height: '$iconSm',
          width: '$iconSm',
        },
      },
      md: {
        height: '$md',
        width: '$md',
        borderRadius: '$md',
        '& svg': {
          height: '$iconMd',
          width: '$iconMd',
        },
        [`& ${Spin}`]: {
          height: '$iconMd',
          width: '$iconMd',
        },
      },
      lg: {
        height: '$lg',
        width: '$lg',
        borderRadius: '$md',
        '& svg': {
          height: '$iconLg',
          width: '$iconLg',
        },
        [`& ${Spin}`]: {
          height: '$iconLg',
          width: '$iconLg',
        },
      },
    },
    variant: {
      outline: {
        border: '1px solid $border',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: '$text',
        fontSize: '$1',
        backgroundColor: 'transparent',
        '&:hover': {
          color: '$textStrong',
          borderColor: '$borderStrong',
          backgroundColor: '$surfaceSubtle',
        },
        '&:disabled': {
          color: '$textMuted',
          borderColor: '$border',
          backgroundColor: '$surfaceSubtle',
          cursor: 'not-allowed',
        },
      },
      soft: {
        color: '$text',
        backgroundColor: '$softBg',
        borderColor: 'transparent',
        '&:hover': {
          color: '$textStrong',
          backgroundColor: '$softBgHover',
          borderColor: 'transparent',
        },
        '&:disabled': {
          color: '$textMuted',
          borderColor: 'transparent',
          backgroundColor: '$surfaceSubtle',
          cursor: 'not-allowed',
        },
      },
      subtle: {
        color: 'CurrentColor',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          color: '$textStrong',
          backgroundColor: '$surfaceSubtle',
        },
        '&:disabled': {
          color: '$textMuted',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          '&:hover': {
            color: '$textMuted',
            backgroundColor: 'transparent',
          },
        },
      },
      ghost: {
        color: '$text',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          color: '$textStrong',
        },
        '&:disabled': {
          color: '$textMuted',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
        },
      },
    },
    active: {
      true: {
        backgroundColor: '$selectionBg',
        borderColor: '$selectionBorder',
        color: '$selectionText',
        '&:hover': {
          backgroundColor: '$selectionBgHover',
          borderColor: '$selectionBorder',
        },
      },
    },
    fancy: {
      true: {
        '&:active': {
          transform: 'scale(0.94)',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'soft',
  },
  compoundVariants: [
    {
      variant: 'outline',
      active: true,
      css: {
        color: '$selectionText',
        backgroundColor: '$selectionBg',
        borderColor: '$selectionBorder',
        '&:hover': {
          color: '$selectionText',
          backgroundColor: '$selectionBgHover',
          borderColor: '$selectionBorder',
        },
        '&:disabled': {
          color: '$textMuted',
          backgroundColor: '$surfaceSubtle',
          borderColor: '$border',
        },
      },
    },
    {
      variant: 'subtle',
      active: true,
      css: {
        color: '$selectionText',
        backgroundColor: '$selectionBg',
        borderColor: 'transparent',
        '&:hover': {
          color: '$selectionText',
          backgroundColor: '$selectionBgHover',
          borderColor: 'transparent',
        },
        '&:disabled': {
          color: '$textMuted',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
      },
    },
    {
      variant: 'ghost',
      active: true,
      css: {
        color: '$selectionText',
        backgroundColor: '$selectionBg',
        borderColor: 'transparent',
        '&:hover': {
          color: '$selectionText',
          backgroundColor: '$selectionBgHover',
          borderColor: 'transparent',
        },
        '&:disabled': {
          color: '$textMuted',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
      },
    },
  ],
})

const StyledActionButtonGroup = styled('div', {
  display: 'flex',
  variants: {
    direction: {
      horizontal: {
        [`& ${StyledActionButton}`]: {
          borderRadius: 0,
        },
        [`& ${StyledActionButton}:not(:first-child)`]: {
          marginLeft: '-1px',
        },
        [`& ${StyledActionButton}:hover, & ${StyledActionButton}:focus-visible, & ${StyledActionButton}[data-state="open"]`]:
          {
            position: 'relative',
            zIndex: 1,
          },
        [`& ${StyledActionButton}:nth-child(1)`]: {
          borderRadius: '$sm 0 0 $sm',
        },
        [`& ${StyledActionButton}:nth-last-child(1)`]: {
          borderRadius: '0 $sm $sm 0',
        },
      },
      vertical: {
        flexDirection: 'column',
        [`& ${StyledActionButton}`]: {
          borderRadius: 0,
        },
        [`& ${StyledActionButton}:not(:first-child)`]: {
          marginTop: '-1px',
        },
        [`& ${StyledActionButton}:hover, & ${StyledActionButton}:focus-visible, & ${StyledActionButton}[data-state="open"]`]:
          {
            position: 'relative',
            zIndex: 1,
          },
        [`& ${StyledActionButton}:nth-child(1)`]: {
          borderRadius: '$sm $sm 0 0',
        },
        [`& ${StyledActionButton}:nth-last-child(1)`]: {
          borderRadius: '0 0 $sm $sm',
        },
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})

StyledActionButtonGroup.displayName = 'ActionButtonGroup'

const CornerIcon = styled(IconRightBottomCorner, {
  position: 'absolute',
  width: '4px !important',
  height: '4px !important',
  color: 'currentColor',
  bottom: 3,
  right: 3,
})

export interface ActionButtonProps extends StitchesComponent<typeof StyledActionButton> {
  /**
   * An async function or a function which should return a Promise
   */
  async?: () => Promise<unknown>
  loading?: boolean
  as?: string
  /**
   * Sometimes the ActionButton is acting as a trigger like opening a modal, in this case, you could set the `corner` prop to `true` to show a corner icon.
   */
  corner?: boolean
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(function ActionButton(props, forwardedRf) {
  const { loading: propLoading, async, onClick, size, corner, disabled, type = 'button', ...rest } = props
  const { handleClick, loading } = useAsyncStatus({
    asyncFunction: async,
    propLoading,
    onClick,
  })

  return (
    <StyledActionButton
      {...rest}
      size={size}
      onClick={handleClick}
      ref={forwardedRf}
      corner={corner}
      type={type}
      aria-busy={loading || undefined}
      disabled={loading || disabled}>
      {loading ? <Spin size="xs" color="inherit" /> : rest.children}
      {corner && <CornerIcon />}
    </StyledActionButton>
  )
})

ActionButton.toString = () => StyledActionButton.toString()

export type ActionButtonGroupProps = ComponentProps<typeof StyledActionButtonGroup>

export const ActionButtonGroup = forwardRef<HTMLDivElement, PropsWithChildren<ActionButtonGroupProps>>(
  function ActionButtonGroup(props, forwardedRef) {
    return <StyledActionButtonGroup ref={forwardedRef} {...props} />
  }
)

ActionButtonGroup.displayName = 'ActionButtonGroup'
