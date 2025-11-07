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
  color: '$grayA10',
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
    height: '14px',
    width: '14px',
  },
  '&:hover': {
    color: '$grayA12',
  },
  '&[data-state=checked]': {
    backgroundColor: '$grayA3',
    color: '$white',
    boxShadow: 'inset 0 0 0 1px $colors$grayA4',
    '&:hover': {
      color: '$white',
    },
  },
  '&:focus-visible': {
    position: 'relative',
    boxShadow: 'inset 0 0 0 1px $colors$grayA8',
  },
  variants: {
    variant: {
      subtle: {},
      solid: {
        backgroundColor: '$grayA3',
        '&[data-state=checked]': {
          backgroundColor: '$blue10',
          color: '$white',
          boxShadow: 'none',
          '&:hover': {
            color: '$white',
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
  backgroundColor: '$grayA3',
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

const SegmentControl = React.forwardRef<
  React.ElementRef<typeof StyledSegmentControlRoot>,
  SegmentControlProps
>((props, ref) => {
  const { size = 'sm', variant = 'subtle', children, ...rest } = props

  return (
    <SegmentControlContext.Provider value={{ size, variant }}>
      <StyledSegmentControlRoot ref={ref} size={size} variant={variant} {...rest}>
        {children}
      </StyledSegmentControlRoot>
    </SegmentControlContext.Provider>
  )
})

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
