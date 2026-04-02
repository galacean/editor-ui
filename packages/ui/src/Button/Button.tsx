import { PropsWithChildren, ReactNode, forwardRef } from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'

import { button } from '../design-system/recipes'
import { styled, StitchesComponent } from '../design-system'

import { Spin } from '../Spin'
import { useAsyncStatus } from '../hooks/useAsyncStatus'

const StyledButton = styled('button', button, {
  transition: '$shadow, $borderColor, $backgroundColor, $color, opacity .2s ease-out',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  '&:disabled': {
    color: '$textMuted',
    cursor: 'not-allowed',
    boxShadow: 'none',
    '&:hover': {
      color: '$textMuted',
    },
  },
  variants: {
    size: {
      xs: {
        height: '$xs',
        fontSize: '$1',
        lineHeight: '$lineHeights$1',
        fontWeight: 500,
        borderRadius: '$xs',
        padding: '0 $1_5',
        [`& ${Spin}`]: {
          height: '$2',
          width: '$2',
        },
      },
      sm: {
        height: '$sm',
        fontSize: '$1',
        lineHeight: '$lineHeights$1',
        fontWeight: 500,
        borderRadius: '$sm',
        padding: '0 $2',
        [`& ${Spin}`]: {
          height: '$iconSm',
          width: '$iconSm',
        },
      },
      md: {
        height: '$md',
        borderRadius: '$md',
        padding: '0 $3',
        fontSize: '$2',
        lineHeight: '$lineHeights$2',
        fontWeight: 500,
        [`& ${Spin}`]: {
          height: '$iconMd',
          width: '$iconMd',
        },
      },
      lg: {
        height: '$lg',
        fontSize: '$2',
        lineHeight: '$lineHeights$2',
        fontWeight: 500,
        borderRadius: '$md',
        padding: '0 $4',
        [`& ${Spin}`]: {
          height: '$iconLg',
          width: '$iconLg',
        },
      },
    },
    // The Variant of button
    variant: {
      outline: {
        color: '$text',
        backgroundColor: 'transparent',
        border: '1px solid $border',
        '&:hover': {
          borderColor: '$borderStrong',
          backgroundColor: '$surfaceSubtle',
        },
        '&:active': {
          backgroundColor: '$surfaceStrong',
        },
        '&:disabled': {
          color: '$textMuted',
          borderColor: '$border',
          backgroundColor: 'transparent',
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
        '&:active': {
          color: '$textStrong',
          backgroundColor: '$softBgActive',
          borderColor: 'transparent',
        },
        '&:disabled': {
          color: '$textMuted',
          backgroundColor: '$surfaceSubtle',
          borderColor: 'transparent',
        },
      },
      solid: {
        backgroundColor: '$primary',
        borderColor: '$primary',
        color: '$white',
        '&:hover': {
          backgroundColor: '$primaryActive',
          borderColor: '$primaryActive',
        },
        '&:active': {
          backgroundColor: '$primaryActive',
          borderColor: '$primaryActive',
        },
        '&:disabled': {
          color: '$textMuted',
          backgroundColor: '$surfaceSubtle',
          borderColor: '$border',
        },
      },
      subtle: {
        color: '$text',
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: '$surfaceSubtle',
          color: '$textStrong',
        },
        '&:active': {
          backgroundColor: '$surfaceStrong',
        },
        '&:disabled': {
          color: '$textMuted',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
      },
      inverted: {
        color: '$textInverted',
        backgroundColor: '$textStrong',
        borderColor: '$textStrong',
        '&:hover': {
          backgroundColor: '$textStrong',
        },
        '&:active': {
          backgroundColor: '$textStrong',
        },
        '&:disabled': {
          color: '$textMuted',
          backgroundColor: '$surfaceStrong',
          borderColor: '$border',
        },
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    uppercase: {
      true: {
        textTransform: 'uppercase',
      },
    },
    // The state of button
    critical: {
      true: {
        color: '$dangerText',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$dangerBg',
        },
        '&:active': {
          backgroundColor: '$dangerBgHover',
        },
      },
    },
    positive: {
      true: {
        color: '$successText',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$successBg',
        },
        '&:active': {
          backgroundColor: '$successBgHover',
        },
      },
    },
    loading: {
      true: {
        opacity: '.6',
        pointerEvents: 'none',
      },
    },
    round: {
      true: {
        borderRadius: '$round',
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
      critical: true,
      css: {
        color: '$dangerText',
        borderColor: '$dangerBorder',
        '&:hover': {
          borderColor: '$dangerBorder',
          backgroundColor: '$dangerBg',
        },
        '&:active': {
          borderColor: '$dangerBorder',
          backgroundColor: '$dangerBgHover',
        },
        '&:disabled': {
          borderColor: '$border',
        },
      },
    },
    {
      variant: 'outline',
      positive: true,
      css: {
        color: '$successText',
        borderColor: '$successBorder',
        '&:hover': {
          borderColor: '$successBorder',
          backgroundColor: '$successBg',
        },
        '&:active': {
          borderColor: '$successBorder',
          backgroundColor: '$successBgHover',
        },
      },
    },
    {
      variant: 'soft',
      critical: true,
      css: {
        color: '$dangerText',
        backgroundColor: '$dangerBg',
        borderColor: 'transparent',
        '&:hover': {
          color: '$dangerText',
          backgroundColor: '$dangerBgHover',
          borderColor: 'transparent',
        },
        '&:active': {
          backgroundColor: '$dangerBgHover',
          borderColor: 'transparent',
        },
      },
    },
    {
      variant: 'soft',
      positive: true,
      css: {
        color: '$successText',
        backgroundColor: '$successBg',
        borderColor: 'transparent',
        '&:hover': {
          color: '$successText',
          backgroundColor: '$successBgHover',
          borderColor: 'transparent',
        },
        '&:active': {
          backgroundColor: '$successBgHover',
          borderColor: 'transparent',
        },
      },
    },
    {
      variant: 'solid',
      critical: true,
      css: {
        color: '$white',
        backgroundColor: '$dangerSolid',
        borderColor: '$dangerSolid',
        '&:hover': {
          backgroundColor: '$dangerSolidHover',
          borderColor: '$dangerSolidHover',
        },
        '&:active': {
          backgroundColor: '$dangerSolidHover',
          borderColor: '$dangerSolidHover',
        },
      },
    },
    {
      variant: 'solid',
      positive: true,
      css: {
        color: '$white',
        backgroundColor: '$successSolid',
        borderColor: '$successSolid',
        '&:hover': {
          backgroundColor: '$successSolidHover',
          borderColor: '$successSolidHover',
        },
        '&:active': {
          backgroundColor: '$successSolidHover',
          borderColor: '$successSolidHover',
        },
      },
    },
    {
      variant: 'subtle',
      critical: true,
      css: {
        color: '$dangerText',
        '&:focus-visible': {
          boxShadow: '$focus',
        },
        '&:hover': {
          color: '$dangerText',
          backgroundColor: '$dangerBg',
        },
        '&:active': {
          backgroundColor: '$dangerBgHover',
        },
      },
    },
    {
      variant: 'subtle',
      positive: true,
      css: {
        color: '$successText',
        '&:focus-visible': {
          boxShadow: '$focus',
        },
        '&:hover': {
          color: '$successText',
          backgroundColor: '$successBg',
        },
        '&:active': {
          backgroundColor: '$successBgHover',
        },
      },
    },
    {
      variant: 'inverted',
      critical: true,
      css: {
        color: '$textInverted',
        backgroundColor: '$dangerSolidHover',
        borderColor: '$dangerSolidHover',
        '&:hover': {
          backgroundColor: '$dangerText',
          borderColor: '$dangerText',
        },
        '&:active': {
          backgroundColor: '$dangerText',
          borderColor: '$dangerText',
        },
      },
    },
    {
      variant: 'inverted',
      positive: true,
      css: {
        color: '$textInverted',
        backgroundColor: '$successSolidHover',
        borderColor: '$successSolidHover',
        '&:hover': {
          backgroundColor: '$successText',
          borderColor: '$successText',
        },
        '&:active': {
          backgroundColor: '$successText',
          borderColor: '$successText',
        },
      },
    },
  ],
})

export type ButtonProps = PropsWithChildren<
  StitchesComponent<typeof StyledButton> & {
    startSlot?: ReactNode
    endSlot?: ReactNode
    async?: () => Promise<unknown>
    asChild?: boolean
  }
>

const SlotContainer = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  variants: {
    position: {
      start: {
        marginRight: '$1',
      },
      end: {
        marginLeft: '$1',
      },
    },
    size: {
      xs: {},
      sm: {
        fontSize: '$1',
      },
      md: {
        fontSize: '$2',
      },
      lg: {
        fontSize: '$2',
      },
    },
    gap: {
      xs: {
        '&[data-position="start"]': {
          marginRight: '$1',
        },
        '&[data-position="end"]': {
          marginLeft: '$1',
        },
      },
      sm: {
        '&[data-position="start"]': {
          marginRight: '$1_5',
        },
        '&[data-position="end"]': {
          marginLeft: '$1_5',
        },
      },
      md: {
        '&[data-position="start"]': {
          marginRight: '$2',
        },
        '&[data-position="end"]': {
          marginLeft: '$2',
        },
      },
      lg: {
        '&[data-position="start"]': {
          marginRight: '$2',
        },
        '&[data-position="end"]': {
          marginLeft: '$2',
        },
      },
    },
  },
})

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, forwardedRef) {
  const { children, startSlot, endSlot, async, size, loading: propLoading, onClick, asChild, disabled, ...rest } = props
  const { loading, handleClick } = useAsyncStatus({
    asyncFunction: async,
    propLoading: propLoading as unknown as boolean,
    onClick,
  })

  const resolvedSize = size ?? 'sm'
  const spin = <Spin color="inherit" size="xs" />
  const Comp = asChild ? Slot : StyledButton
  const leadingSlot = startSlot ? (loading ? spin : startSlot) : !endSlot && loading ? spin : null
  const trailingSlot = endSlot ? (loading ? spin : endSlot) : null

  return (
    <Comp
      {...rest}
      ref={forwardedRef}
      loading={loading}
      size={resolvedSize}
      onClick={handleClick}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      aria-disabled={asChild ? disabled || loading || undefined : undefined}>
      {leadingSlot && (
        <SlotContainer position="start" data-position="start" size={resolvedSize} gap={resolvedSize}>
          {leadingSlot}
        </SlotContainer>
      )}
      <Slottable>{children}</Slottable>
      {trailingSlot && (
        <SlotContainer position="end" data-position="end" size={resolvedSize} gap={resolvedSize}>
          {trailingSlot}
        </SlotContainer>
      )}
    </Comp>
  )
})

Button.toString = () => '.editor-button-component'

export { Button }
