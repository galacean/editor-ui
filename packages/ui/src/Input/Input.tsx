import React from 'react'

import { CSS, styled } from '../design-system'

const StyledInputSlot = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: '$textMuted',
  transition: '$color',
  userSelect: 'none',
  variants: {
    size: {
      xs: {
        padding: '0 $1',
        fontSize: '$1',
      },
      sm: {
        padding: '0 $1_5',
        fontSize: '$1',
      },
      md: {
        padding: '0 $2',
        fontSize: '$1_5',
      },
      lg: {
        padding: '0 $3',
        fontSize: '$2',
      },
    },
  },
})

const StyledInput = styled('input', {
  appearance: 'none',
  height: '100%',
  borderWidth: '0',
  boxSizing: 'border-box',
  outline: 'none',
  flex: 1,
  minWidth: 0,
  width: '100%',
  color: '$text',
  borderRadius: 'inherit',
  fontFamily: '$default',
  fontWeight: '$regular',
  lineHeight: 'inherit',
  backgroundColor: 'transparent',
  textAlign: 'inherit',
  padding: 0,
  '&:hover': {
    color: '$textStrong',
  },
  '&:focus-visible': {
    color: '$textStrong',
  },
  '&::placeholder': {
    color: '$textMuted',
  },
  '&[readonly]': {
    cursor: 'default',
  },
  '&::read-only::placeholder': {
    color: '$textMuted',
  },
  variants: {
    code: {
      true: {
        fontFamily: '$mono $default',
      },
    },
    size: {
      xs: {
        fontSize: '$1',
        paddingLeft: '$1_5',
        paddingRight: '$1_5',
      },
      sm: {
        fontSize: '$1',
        paddingLeft: '$2',
        paddingRight: '$2',
      },
      md: {
        fontSize: '$2',
        paddingLeft: '$3',
        paddingRight: '$3',
      },
      lg: {
        fontSize: '$2',
        paddingLeft: '$4',
        paddingRight: '$4',
      },
    },
    ellipsis: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    cursor: {
      default: {
        cursor: 'default',
        '&:focus': {
          cursor: 'text',
        },
      },
      text: {
        cursor: 'text',
      },
    },
  },
})

export const StyledInputRoot = styled('div', {
  display: 'flex',
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid transparent',
  color: '$textStrong',
  transition: '$shadow, $borderColor, $backgroundColor',
  [`${StyledInputSlot} + ${StyledInput}`]: {
    paddingLeft: 0,
  },
  '&[data-state="default"]:focus-within': {
    borderColor: '$borderStrong',
    boxShadow: '$focus',
    [`${StyledInputSlot}`]: {
      color: '$text',
    },
  },
  '&[data-state="valid"]:focus-within': {
    borderColor: '$successBorder',
    boxShadow: '$focus',
    [`${StyledInputSlot}`]: {
      color: '$successText',
    },
  },
  '&[data-state="invalid"]:focus-within': {
    borderColor: '$dangerBorder',
    boxShadow: '$focus',
    [`${StyledInputSlot}`]: {
      color: '$dangerText',
    },
  },
  variants: {
    size: {
      xs: {
        height: '$xs',
        lineHeight: '$lineHeights$1',
        borderRadius: '$xs',
        fontSize: '$1',
      },
      sm: {
        height: '$sm',
        lineHeight: '$lineHeights$1',
        fontSize: '$1',
        borderRadius: '$sm',
      },
      md: {
        height: '$md',
        fontSize: '$2',
        lineHeight: '$lineHeights$2',
        borderRadius: '$md',
      },
      lg: {
        height: '$lg',
        fontSize: '$2',
        lineHeight: '$lineHeights$2',
        borderRadius: '$md',
      },
    },
    disabled: {
      true: {
        backgroundColor: '$surfaceSubtle',
        borderColor: '$border',
        boxShadow: 'none',
        [`${StyledInputSlot}`]: {
          color: '$textMuted',
        },
        [`${StyledInput}`]: {
          color: '$textMuted',
          '&:focus': {
            color: '$textMuted',
          },
          '&:hover': {
            color: '$textMuted',
          },
        },
      },
    },
    variant: {
      outline: {
        backgroundColor: '$surface',
        borderColor: '$border',
        '&[data-state="default"]:hover': {
          borderColor: '$borderStrong',
          [`${StyledInputSlot}`]: {
            color: '$text',
          },
        },
      },
      soft: {
        backgroundColor: '$softBg',
        borderColor: 'transparent',
        '&[data-state="default"]:hover': {
          backgroundColor: '$softBgHover',
          [`${StyledInputSlot}`]: {
            color: '$text',
          },
        },
      },
      subtle: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&[data-state="default"]:hover': {
          [`${StyledInputSlot}`]: {
            color: '$text',
          },
        },
      },
    },
    state: {
      valid: {
        backgroundColor: '$successBg',
        borderColor: '$successBorder',
        [`${StyledInputSlot}`]: {
          color: '$successText',
        },
        [`${StyledInput}, ${StyledInput}:hover, ${StyledInput}:focus-visible`]: {
          color: '$successText',
        },
        [`${StyledInput}::placeholder`]: {
          color: '$successText',
          opacity: 0.8,
        },
      },
      invalid: {
        backgroundColor: '$dangerBg',
        borderColor: '$dangerBorder',
        [`${StyledInputSlot}`]: {
          color: '$dangerText',
        },
        [`${StyledInput}, ${StyledInput}:hover, ${StyledInput}:focus-visible`]: {
          color: '$dangerText',
        },
        [`${StyledInput}::placeholder`]: {
          color: '$dangerText',
          opacity: 0.8,
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: 'soft',
      disabled: true,
      css: {
        backgroundColor: '$surfaceSubtle',
        borderColor: 'transparent',
      },
    },
    {
      variant: 'subtle',
      disabled: true,
      css: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    },
    {
      state: 'valid',
      disabled: true,
      css: {
        [`${StyledInputSlot}`]: {
          color: '$textMuted',
        },
        [`${StyledInput}, ${StyledInput}:hover, ${StyledInput}:focus-visible`]: {
          color: '$textMuted',
        },
        [`${StyledInput}::placeholder`]: {
          color: '$textMuted',
        },
      },
    },
    {
      state: 'invalid',
      disabled: true,
      css: {
        [`${StyledInputSlot}`]: {
          color: '$textMuted',
        },
        [`${StyledInput}, ${StyledInput}:hover, ${StyledInput}:focus-visible`]: {
          color: '$textMuted',
        },
        [`${StyledInput}::placeholder`]: {
          color: '$textMuted',
        },
      },
    },
  ],
  defaultVariants: {
    size: 'sm',
    variant: 'soft',
  },
})

export interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  startSlot?: React.ReactNode
  endSlot?: React.ReactNode
  overrideStartSlotStyle?: boolean
  ellipsis?: boolean;
  overrideEndSlotStyle?: boolean
  rootRef?: any
  disabled?: boolean
  css?: CSS
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'soft' | 'subtle'
  state?: 'valid' | 'invalid'
}

/**
 * The `<Input />` component could lets users enter one of various types of text on a single line.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, forwardedRef) {
  const {
    startSlot,
    endSlot,
    css,
    rootRef,
    disabled,
    size = 'sm',
    variant = 'soft',
    overrideStartSlotStyle,
    overrideEndSlotStyle,
    state,
    ...rest
  } = props

  return (
    <StyledInputRoot
      css={css}
      ref={rootRef}
      size={size}
      variant={variant}
      state={state}
      disabled={disabled}
      data-state={state ?? 'default'}>
      {!!startSlot && (overrideStartSlotStyle ? startSlot : <StyledInputSlot size={size}>{startSlot}</StyledInputSlot>)}
      <StyledInput disabled={disabled} ref={forwardedRef} size={size} {...rest} />
      {!!endSlot && (overrideEndSlotStyle ? endSlot : <StyledInputSlot size={size}>{endSlot}</StyledInputSlot>)}
    </StyledInputRoot>
  )
})
