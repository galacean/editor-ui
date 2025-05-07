import React, { forwardRef, PropsWithChildren } from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type {
  ToggleGroupItemProps as PrimitiveItemProps,
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
} from '@radix-ui/react-toggle-group'

import { styled } from '../design-system'

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'flex',
  gap: '$1',
})

const StyledItem = styled(
  ToggleGroupPrimitive.Item,
  {
    all: 'unset',
    display: 'flex',
    height: '$sm',
    aspectRatio: '1/1',
    borderRadius: '$2',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$1',
    color: '$gray11',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.2s, color .2s, transform 0.2s ease',
    cursor: 'pointer',
    variants: {
      size: {
        sm: {
          height: '$sm',
          borderRadius: '$2',
          fontSize: '$1',
          '& > svg': {
            width: '$4',
            height: '$4',
            strokeWidth: 1.5,
          },
        },
        md: {
          height: '$md',
          borderRadius: '$4',
          fontSize: '$2',
          '& > svg': {
            width: '$5',
            height: '$5',
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
      variant: {
        primary: {
          '&[data-state=on]': {
            backgroundColor: '$blue9',
            color: '$white',
            fontWeight: 500,
          },
          '&[data-state=on]:hover': {
            backgroundColor: '$blue10',
            color: '$white',
          },
        },
        subtle: {
          '&[data-state=on]': {
            backgroundColor: '$grayA3',
            color: '$gray11',
            fontWeight: 500,
          },
          '&[data-state=on]:hover': {
            backgroundColor: '$grayA4',
            color: '$gray11',
          },
        },
      },
    },
    '&:hover': {
      backgroundColor: '$grayA3',
    },
    '&:focus-visible': {
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px $colors$blue10',
    },
  },
  {
    defaultVariants: {
      size: 'sm',
      variant: 'primary',
    },
  }
)

type ToggleGroupPrimitiveProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

type ToggleGroupProps = ToggleGroupPrimitiveProps & { size?: 'sm' | 'md'; variant?: 'primary' | 'subtle' }

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(props, forwardedRef) {
  const { size, variant, children: propChildren, ...rest } = props
  const children = React.Children.toArray(propChildren)

  return (
    <StyledToggleGroup ref={forwardedRef} {...rest}>
      {children.map((child, key) => {
        return React.cloneElement(child as React.ReactElement, { size, key, variant })
      })}
    </StyledToggleGroup>
  )
})

export interface ToggleGroupItemProps extends PrimitiveItemProps {
  fancy?: boolean
  size?: 'sm' | 'md'
  subtle?: boolean
}

export const ToggleGroupItem = StyledItem

export type { ToggleGroupSingleProps, ToggleGroupMultipleProps } from '@radix-ui/react-toggle-group'
