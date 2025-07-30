import { SVGProps, forwardRef } from 'react'
import { styled, keyframes } from '../../design-system'

const Breathing = keyframes({
  '0%': {
    fill: 'rgb(221 234 248 / 8%)',
  },
  '50%': {
    fill: 'rgb(221 234 248 / 15%)',
  },
  '100%': {
    fill: 'rgb(221 234 248 / 8%)',
  },
})

const BreathingPath = styled('path', {
  animation: `${Breathing} 2.6s ease infinite`,
})

const IconPendingFile = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function IconPendingFile(props, forwardedRef) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="none" ref={forwardedRef} {...props}>
        <BreathingPath
          fill="rgb(221 234 248 / 8%)"
          fillRule="evenodd"
          d="m60 0 40 40v66c0 7.732-6.268 14-14 14H14c-7.732 0-14-6.268-14-14V14C0 6.268 6.268 0 14 0h46Z"
          clipRule="evenodd"
        />
        <path
          fill="rgb(211 237 248 / 11%)"
          fillRule="evenodd"
          d="M100 40H74.707C66.975 40 60 33.025 60 25.293V0l40 40Z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)

export default IconPendingFile
