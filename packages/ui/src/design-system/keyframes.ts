import { keyframes as defineKeyframes } from './stitches.config'

export const keyframes = {
  slideRightAndFade: defineKeyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  }),
  slideDownAndFade: defineKeyframes({
    from: {
      opacity: 0,
      transform: 'translateY(-2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),
  slideUpAndFade: defineKeyframes({
    from: {
      opacity: 0,
      transform: 'translateY(2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),
  slideLeftAndFade: defineKeyframes({
    from: {
      opacity: 0,
      transform: 'translateX(2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),
  openUp: defineKeyframes({
    '0%': {
      opacity: 0,
      transform: 'scale(.9)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  }),
  openDown: defineKeyframes({
    '0%': {
      opacity: 0,
      transform: 'scale(.9)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  }),
  scaleOut: defineKeyframes({
    '0%': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '100%': {
      opacity: 0,
      transform: 'scale(0.9)',
    },
  }),
  scaleIn: defineKeyframes({
    from: {
      opacity: 0,
      transform: 'scale(0)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  }),
  infinateRotateAnmi: defineKeyframes({
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  }),
}


export const overlayFadeIn = defineKeyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const overlayFadeOut = defineKeyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

export const contentShow = defineKeyframes({
  from: {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
})

export const contentFadeIn = defineKeyframes({
  from: {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(.96)',
  },
  to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const contentFadeOut = defineKeyframes({
  from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  to: { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
})