import { PropsWithChildren, ReactNode, forwardRef } from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'

import { button } from '../design-system/recipes'
import { styled, StitchesComponent } from '../design-system'

import { Spin } from '../Spin'
import { Flex } from '../Flex'
import { useAsyncStatus } from '../hooks/useAsyncStatus'

const StyledButton = styled('button', button, {
  transition: 'box-shadow .2s ease, opacity .6s ease-out',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  '&:disabled': {
    color: '$grayA8',
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: '$grayA2',
      color: '$grayA8',
    },
  },
  variants: {
    size: {
      xs: {
        height: '$xs',
        fontSize: '$xs',
        lineHeight: '$sizes$5',
        fontWeight: 400,
        borderRadius: '$2',
        padding: '0 $1_5',
        [`& ${Spin}`]: {
          height: '$2',
          width: '$2',
        },
      },
      s: {
        height: '$s',
        fontSize: '$2',
        fontWeight: 500,
        borderRadius: '$2',
        padding: '0 $2',
        [`& ${Spin}`]: {
          height: '$3',
          width: '$3',
        },
      },
      sm: {
        height: '$sm',
        fontSize: '$sm',
        fontWeight: 400,
        borderRadius: '$2',
        padding: '0 $2',
        [`& ${Spin}`]: {
          height: '$3',
          width: '$3',
        },
      },
      md: {
        height: '$md',
        borderRadius: '$4',
        padding: '0 $4',
        fontSize: '$2',
        fontWeight: 500,
      },
      lg: {
        height: '$lg',
        fontSize: '$3',
        borderRadius: '$1',
        padding: '0 $4',
      },
    },
    // The Variant of button
    variant: {
      default: {
        color: '$gray11',
        backgroundColor: 'transparent',
        border: '1px solid $grayA5',
        transition: 'border-color .2s ease',
        '&:hover': {
          border: '1px solid $colors$gray8',
        },
        '&:active': {
          backgroundColor: '$gray3',
        },
      },
      /** the basic style */
      primary: {
        backgroundColor: '$blue9',
        color: '$white',
        '&:hover': {
          backgroundColor: '$blue10',
        },
        '&:active': {
          backgroundColor: '$blue10',
        },
      },
      secondary: {
        backgroundColor: '$secondaryBg',
        color: '$gray11',
        '&:hover': {
          color: '$gray12',
          backgroundColor: '$grayA4',
        },
        '&:active': {
          color: '$gray12',
          backgroundColor: '$grayA5',
        },
      },
      subsecondary: {
        color: '$gray11',
        '&:hover': {
          backgroundColor: '$grayA4',
          color: '$gray11',
        },
        '&:active': {
          backgroundColor: '$gray5',
        },
      },
      contrast: {
        color: '$gray1',
        backgroundColor: '$gray12',
        '&:hover': {
          backgroundColor: '$gray12',
        },
        '&:active': {
          backgroundColor: '$gray12',
        },
      },
      classic: {
        position: 'relative',
        width: '100%',
        border: 'none',
        whiteSpace: 'pre-wrap',
        boxShadow: '$2',
        backgroundColor: '$secondaryBg',
        color: '$gray11',
        '&:hover': {
          backgroundColor: '$grayA4',
        },
        '&:active': {
          backgroundColor: '$secondaryBg',
        },
      }
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
        color: '$red11',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$red3',
        },
        '&:active': {
          backgroundColor: '$red4',
        },
      },
    },
    positive: {
      true: {
        color: '$green11',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$greenA3',
        },
        '&:active': {
          backgroundColor: '$greenA4',
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
    variant: 'default',
  },
  compoundVariants: [
    {
      variant: 'default',
      critical: true,
      css: {
        color: '$red10',
        borderColor: '$red6',
        '&:hover': {
          borderColor: '$red8',
          backgroundColor: '$redA3',
        },
        '&:active': {
          backgroundColor: '$redA4',
        },
        '&:disabled': {
          borderColor: '$gray6',
        },
      },
    },
    {
      variant: 'default',
      positive: true,
      css: {
        color: '$green10',
        borderColor: '$green6',
        '&:hover': {
          borderColor: '$green8',
          backgroundColor: '$greenA3',
        },
        '&:active': {
          backgroundColor: '$greenA4',
        },
      },
    },
    {
      variant: 'primary',
      critical: true,
      css: {
        color: '$red12',
        backgroundColor: '$red9',
        '&:hover': {
          backgroundColor: '$red10',
        },
        '&:active': {
          backgroundColor: '$red9',
        },
      },
    },
    {
      variant: 'primary',
      positive: true,
      css: {
        color: '$green12',
        backgroundColor: '$green9',
        '&:hover': {
          backgroundColor: '$green10',
        },
        '&:active': {
          backgroundColor: '$green10',
        },
      },
    },
    {
      variant: 'secondary',
      critical: true,
      css: {
        color: '$red11',
        backgroundColor: '$redA3',
        '&:hover': {
          color: '$red11',
          backgroundColor: '$redA4',
        },
        '&:active': {
          backgroundColor: '$redA3',
        },
      },
    },
    {
      variant: 'secondary',
      positive: true,
      css: {
        color: '$green11',
        backgroundColor: '$greenA3',
        '&:hover': {
          color: '$green11',
          backgroundColor: '$greenA4',
        },
        '&:active': {
          backgroundColor: '$greenA3',
        },
      },
    },
    {
      variant: 'subsecondary',
      critical: true,
      css: {
        color: '$redA9',
        '&:focus-visible': {
          boxShadow: '0 0 0 3px $colors$redA7',
        },
        '&:hover': {
          color: '$red10',
          backgroundColor: '$redA3',
        },
        '&:active': {
          backgroundColor: '$redA4',
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, forwardedRef) {
  const { children, startSlot, endSlot, async, size, loading: propLoading, onClick, asChild, ...rest } = props
  const { loading, handleClick } = useAsyncStatus({
    asyncFunction: async,
    propLoading: propLoading as unknown as boolean,
    onClick,
  })

  const spin = <Spin color="inherit" size="xs" css={{ marginRight: '$1_5' }} />
  const Comp = asChild ? Slot : StyledButton

  return (
    <Comp ref={forwardedRef} loading={loading} size={size} onClick={handleClick} {...rest}>
      {startSlot && (loading ? spin : <Flex css={{ marginRight: '$1_5' }}>{startSlot}</Flex>)}
      {!startSlot && !endSlot && loading && spin}
      <Slottable>{children}</Slottable>
      {endSlot && (loading ? spin : <Flex css={{ marginLeft: '$1_5' }}>{endSlot}</Flex>)}
    </Comp>
  )
})

Button.toString = () => '.editor-button-component'

export { Button }
