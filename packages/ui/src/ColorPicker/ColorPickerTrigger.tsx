import React, { forwardRef } from 'react'

import { styled } from '../design-system'
import { TransparentPattern } from './TransparentPattern'
import { Flex } from '../Flex'

const StyledTrigger = styled('button', {
  all: 'unset',
  position: 'relative',
  height: '$6',
  width: '$6',
  textAlign: 'right',
  borderRadius: '$2',
  transition: '$shadow',
  cursor: 'pointer',
  overflow: 'hidden',
  '& > div': {
    position: 'absolute',
    inset: 0,
    borderRadius: '$2',
  },
  '&:focus-visible': {
    boxShadow: '0px 0px 0px 2px $colors$gray7',
  },
  variants: {
    fullsize: {
      true: {
        width: '100%',
        borderRadius: '$2',
        '&::before': {
          width: '100%',
        },
      },
    },
  },
})

/**
 * Fix the issue of the color picker trigger will show a 1px border when the color is too dark
 * And we use the svg pattern instead of the background-gradient could provide a better visual experience(In that case)
 * https://stackoverflow.com/a/47072024
 */
const StyledTransparentPattern = styled(TransparentPattern, {
  position: 'absolute',
  inset: 0,
  borderRadius: '$2',
  height: '$6',
  width: '$6',
  border: '1px solid transparent',
  perspective: 1000,
  backfaceVisibility: 'hidden',
  transform: 'translate3d(0,0,0)',
  variants: {
    fullsize: {
      true: {
        width: '100%',
      },
    },
  },
})

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, { color: string; fullsize?: boolean; mode?: string }>(
  function Trigger(props, ref) {
    const { color, mode, fullsize, ...rest } = props

    return (
      <StyledTrigger ref={ref} fullsize={fullsize} {...rest}>
        <StyledTransparentPattern
          fullsize={fullsize}
          style={{
            borderColor: color,
          }}
        />
        <Flex
          style={{
            background: color,
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#ccc',
          }}
          align="v"
          justifyContent="center">
          {mode === 'hdr' ? 'HDR' : null}
        </Flex>
      </StyledTrigger>
    )
  }
)
