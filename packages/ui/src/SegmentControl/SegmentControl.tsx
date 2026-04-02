import React, { createContext, useContext } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { styled } from '../design-system'

// Context for SegmentControl
type SegmentControlContextValue = {
  size: 'sm' | 'md'
  variant: 'subtle' | 'solid'
}

const SegmentControlContext = createContext<SegmentControlContextValue | null>(null)
SegmentControlContext.displayName = 'SegmentControlContext'

const useSegmentControlContext = () => {
  const context = useContext(SegmentControlContext)
  if (!context) {
    throw new Error('SegmentControlItem must be used within a SegmentControl')
  }
  return context
}

const StyledSegmentControlItem = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  textWrap: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: '100%',
  color: '$textMuted',
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  cursor: 'pointer',
  padding: '0 $1_5',
  borderRadius: 'inherit',
  gap: '$1',
  transition: 'all .2s ease',
  userSelect: 'none',
  '& > svg': {
    height: '$iconSm',
    width: '$iconSm',
  },
  '&:hover': {
    color: '$textStrong',
  },
  '&[data-state=checked]': {
    backgroundColor: '$surfaceOverlay',
    color: '$textStrong',
    boxShadow: '$border',
    '&:hover': {
      color: '$textStrong',
    },
  },
  '&:focus-visible': {
    position: 'relative',
    boxShadow: 'inset 0 0 0 1px $colors$borderStrong',
  },
  variants: {
    variant: {
      subtle: {},
      solid: {
        backgroundColor: '$softBg',
        '&[data-state=checked]': {
          backgroundColor: '$selectionBg',
          color: '$selectionText',
          boxShadow: 'none',
          '&:hover': {
            color: '$selectionText',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
})

const StyledSegmentControlRoot = styled(RadioGroupPrimitive.Root, {
  display: 'inline-grid',
  backgroundColor: '$softBg',
  gridAutoColumns: '1fr',
  gridAutoFlow: 'column',
  width: '100%',
  alignItems: 'center',
  borderRadius: '$2',
  variants: {
    size: {
      sm: {
        height: '$sm',
        fontSize: '$1',
      },
      md: {
        height: '$md',
        fontSize: '$2',
        borderRadius: '$4',
      },
    },
    variant: {
      subtle: {},
      solid: {
        backgroundColor: 'transparent',
        gap: '$1',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'subtle',
  },
})

type SegmentControlProps = React.ComponentProps<typeof StyledSegmentControlRoot> & {
  size?: 'sm' | 'md'
  variant?: 'subtle' | 'solid'
}

const SegmentControl = React.forwardRef<React.ElementRef<typeof StyledSegmentControlRoot>, SegmentControlProps>(
  (props, ref) => {
    const { size = 'sm', variant = 'subtle', children, ...rest } = props

    return (
      <SegmentControlContext.Provider value={{ size, variant }}>
        <StyledSegmentControlRoot ref={ref} size={size} variant={variant} {...rest}>
          {children}
        </StyledSegmentControlRoot>
      </SegmentControlContext.Provider>
    )
  }
)

SegmentControl.displayName = 'SegmentControl'

const SegmentControlItem = React.forwardRef<
  React.ElementRef<typeof StyledSegmentControlItem>,
  React.ComponentProps<typeof StyledSegmentControlItem>
>((props, ref) => {
  const { variant } = useSegmentControlContext()

  return <StyledSegmentControlItem ref={ref} variant={variant} {...props} />
})

SegmentControlItem.displayName = 'SegmentControlItem'

export { SegmentControl, SegmentControlItem }
