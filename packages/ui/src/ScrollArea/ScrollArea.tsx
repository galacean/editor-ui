import React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import type { ScrollAreaViewportProps, ScrollAreaProps as PrimitiveScrollAreaProps } from '@radix-ui/react-scroll-area'

import { CSS, styled } from '../design-system'


const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root, {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  maxHeight: 'inherit',
  variants: {
    fullHeight: {
      true: { height: '100%' },
    }
  },
  defaultVariants: {
    fullHeight: true,
  }
},)

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  maxHeight: 'inherit',
  borderRadius: 'inherit',
  // https://github.com/radix-ui/primitives/issues/926
  '& > div[style]': {
    display: 'block !important',
  },
  variants: {
    asContainer: {
      true: {
        padding: '$1_5'
      }
    }
  }
})

const SCROLLBAR_SIZE = 4

const ScrollAreaScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  margin: '$0_5',
  background: '$grayA3',
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
  variants: {
    subtle: {
      true: {
        padding: '$0_5 0 $0_5 $0_5',
        margin: 0,
        background: 'transparent',
        '&:hover': { background: '$grayA5' },
      }
    }
  },
  defaultVariants: {
    subtle: true,
  },
})

const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '$grayA7',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 8,
    minHeight: 8,
  },
})

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  backgroundColor: '$grayA5',
})

interface ScrollAreaProps extends PrimitiveScrollAreaProps {
  children: React.ReactNode
  css?: CSS
  fullHeight?: boolean
  asContainer?: boolean
  subtle?: boolean
}

export function ScrollArea(props: ScrollAreaProps) {
  const { fullHeight, subtle, css, asContainer, ...rest } = props;
  return (
    <ScrollAreaRoot fullHeight={fullHeight}>
      <ScrollAreaViewport css={css} asContainer={asContainer} {...rest} />
      <ScrollAreaScrollbar orientation="horizontal" subtle={subtle}>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="vertical" subtle={subtle}>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <StyledCorner />
    </ScrollAreaRoot>
  )
}
