import React, { PropsWithChildren } from 'react'

import { styled } from '../design-system'
import type { StitchesComponent } from '../design-system'

const StyledFlex = styled('div', {
  display: 'flex',
  boxSizing: 'border-box',
  variants: {
    direction: {
      column: {
        flexDirection: 'column',
        // alignItems: "flex-start"
      },
      row: { flexDirection: 'row' },
      'row-reverse': { flexDirection: 'row-reverse' },
      'column-reverse': { flexDirection: 'column-reverse' },
    },
    justifyContent: {
      center: {
        justifyContent: 'center',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
      end: {
        justifyContent: 'flex-end',
      },
    },
    align: {
      both: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      v: {
        alignItems: 'center',
        lineHeight: 1,
      },
      h: {
        justifyContent: 'center',
      },
    },
    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' },
      reverse: { flexWrap: 'wrap-reverse' },
    },
    gap: {
      none: { gap: 'none' },
      xxs: { gap: '$0_5' },
      xs: { gap: '$1' },
      sm: { gap: '$2' },
      md: { gap: '$3' },
      lg: { gap: '$4' },
    },
  },
  defaultVariants: {
    direction: 'row',
    wrap: true,
  },
})

export type FlexProps = PropsWithChildren<StitchesComponent<typeof StyledFlex>>

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(props: FlexProps, forwardedRef) {
  return (
    <StyledFlex {...props} ref={forwardedRef}>
      {props.children}
    </StyledFlex>
  )
})
