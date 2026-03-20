import { ComponentProps } from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { styled, VariantProps } from '../design-system'

const StyledProgressRoot = styled(ProgressPrimitive.Root, {
  position: 'relative',
  width: '100%',
  backgroundColor: '$softBg',
  borderRadius: '$round',
  overflow: 'hidden',
  boxSizing: 'border-box',
  border: '1px solid transparent',
  variants: {
    size: {
      sm: {
        height: '$1',
      },
      md: {
        height: '$1_5',
      },
      lg: {
        height: '$2',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const StyledProgressIndicator = styled(ProgressPrimitive.Indicator, {
  width: '100%',
  height: '100%',
  borderRadius: '$round',
  backgroundColor: '$selectionBg',
  transition: 'transform .2s ease-out, background-color .2s ease-out',
})

export type ProgressProps = ComponentProps<typeof StyledProgressRoot> & VariantProps<typeof StyledProgressRoot>

function Progress(props: ProgressProps) {
  const value = Math.max(0, Math.min(100, props.value ?? 0))

  return (
    <StyledProgressRoot {...props}>
      <StyledProgressIndicator style={{ transform: `translateX(-${100 - value}%)` }} />
    </StyledProgressRoot>
  )
}

export { Progress }
