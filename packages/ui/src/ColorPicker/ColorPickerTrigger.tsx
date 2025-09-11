import React, { forwardRef, SVGProps } from 'react'

import { styled } from '../design-system'
import { TransparentPattern } from './TransparentPattern'
import { Flex } from '../Flex'
import { Color, ColorSpace, toNormalizeHexStr } from './helper'
import { useColorSpaceConversion } from './useColorSpaceConversion'

function IconHDR(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="6"
      viewBox="0 0 15 6"
      fill="none"
      stroke="CurrentColor"
      {...props}>
      <g clipPath="url(#clip0_28_2)">
        <path
          d="M1 1V3.1875M1 3.1875V5.375M1 3.1875H3.8125M3.8125 3.1875V1M3.8125 3.1875V5.375"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 5.375V3.625M11 3.625V1H12.7857C13.2321 1 14.125 1 14.125 2.3125C14.125 3.625 13.2321 3.625 12.7857 3.625M11 3.625H12.7857M12.7857 3.625L14.125 5.375"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 3.1875V1C7.5625 1 9.125 1 9.125 3.1875C9.125 5.375 7.5625 5.375 6 5.375V3.1875Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_28_2">
          <rect width="15" height="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const StyledTrigger = styled('button', {
  all: 'unset',
  position: 'relative',
  height: '$6',
  width: '$6',
  textAlign: 'right',
  alignItems: 'center',
  justifyContent: 'center',
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

const StyledHDRBadge = styled('div', {
  position: 'absolute',
  bottom: '1px',
  right: '1px',
  fontSize: '$0_5',
  display: 'flex',
  alignItems: 'center',
  padding: '$0_5 $1',
  justifyContent: 'center',
  borderRadius: '$2 0 3px 0',
  backgroundColor: '$gray3',
  strokeWidth: 1.2,
  color: '$gray12',
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

interface ColorPickerTriggerProps {
  color: Color
  colorSpace: ColorSpace
  fullsize?: boolean
  mode?: string
}

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  function Trigger(props, ref) {
    const { color, colorSpace, mode, fullsize, ...rest } = props

    const { displayValue } = useColorSpaceConversion(
      color,
      colorSpace,
      "sRGB"
    )

    const valueStr = `#${toNormalizeHexStr(displayValue)}`
    
    return (
      <StyledTrigger ref={ref} fullsize={fullsize} {...rest}>
        <StyledTransparentPattern
          fullsize={fullsize}
          style={{
            borderColor: valueStr,
          }}
        />
        <Flex style={{ background: valueStr }} align="both">
          {mode === 'hdr' && (
            <StyledHDRBadge>
              <IconHDR />
            </StyledHDRBadge>
          )}
        </Flex>
      </StyledTrigger>
    )
  }
)
