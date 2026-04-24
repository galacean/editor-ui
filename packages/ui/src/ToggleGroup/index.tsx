import React, { forwardRef, PropsWithChildren, cloneElement, ReactElement, Children } from 'react'
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
    borderRadius: '$sm',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$1',
    color: '$text',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: '$backgroundColor, $color, $shadow, transform 0.2s ease',
    cursor: 'pointer',
    boxSizing: 'border-box',
    variants: {
      size: {
        sm: {
          height: '$sm',
          borderRadius: '$sm',
          fontSize: '$1',
          '& > svg': {
            width: '$iconSm',
            height: '$iconSm',
            strokeWidth: 1.5,
          },
        },
        md: {
          height: '$md',
          borderRadius: '$md',
          fontSize: '$2',
          '& > svg': {
            width: '$iconMd',
            height: '$iconMd',
          },
        },
        lg: {
          height: '$lg',
          borderRadius: '$xl',
          fontSize: '$2',
          '& > svg': {
            width: '$iconLg',
            height: '$iconLg',
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
            backgroundColor: '$selectionBg',
            color: '$selectionText',
            fontWeight: 500,
          },
          '&[data-state=on]:hover': {
            backgroundColor: '$selectionBgHover',
            color: '$selectionText',
          },
        },
        subtle: {
          backgroundColor: '$softBg',
          '&[data-state=on]': {
            backgroundColor: '$surface',
            color: '$textStrong',
            fontWeight: 500,
            boxShadow: 'inset $border',
          },
          '&[data-state=on]:hover': {
            backgroundColor: '$surface',
            color: '$textStrong',
          },
        },
      },
    },
    '&:hover': {
      backgroundColor: '$softBgHover',
    },
    '&:focus-visible': {
      position: 'relative',
      boxShadow: '$focus',
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

type ToggleGroupProps = ToggleGroupPrimitiveProps & { size?: 'sm' | 'md' | 'lg'; variant?: 'primary' | 'subtle' }

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(props, forwardedRef) {
  const { size, variant, children: propChildren, ...rest } = props
  const children = Children.toArray(propChildren)

  return (
    <StyledToggleGroup ref={forwardedRef} {...rest}>
      {children.map((child, key) => {
        return cloneElement(child as ReactElement, { size, key, variant })
      })}
    </StyledToggleGroup>
  )
})

export interface ToggleGroupItemProps extends PrimitiveItemProps {
  fancy?: boolean
  size?: 'sm' | 'md' | 'lg'
  subtle?: boolean
}

export const ToggleGroupItem = StyledItem

export type { ToggleGroupSingleProps, ToggleGroupMultipleProps } from '@radix-ui/react-toggle-group'
