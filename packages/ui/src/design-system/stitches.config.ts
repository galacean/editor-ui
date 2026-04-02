import { createStitches } from '@stitches/react'
import type { VariantProps, ComponentProps } from '@stitches/react'

import { colors } from './colors'
import { fontSizes, sizes, space, radii, shadows } from './sizes'
import { resetCSS } from './reset.css'

export const { styled, css, keyframes, getCssText, theme, globalCss, createTheme } = createStitches({
  theme: {
    // relate https://github.com/necolas/normalize.css/issues/665
    fonts: {
      default:
        'geist,InterVariable,-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol',
      untitled: 'Untitled Sans, -apple-system, system-ui, sans-serif',
      mono: 'mono, -apple-system, system-ui, sans-serif',
    },
    colors: colors.dark,
    fontSizes,
    radii,
    sizes,
    space,
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 600,
    },
    lineHeights: {
      1: '16px',
      '1_5': '18px',
      2: '20px',
      3: '24px',
      4: '26px',
      5: '28px',
      6: '32px',
      7: '36px',
      8: '40px',
      9: '48px',
    },
    shadows,
    transitions: {
      shadow: 'box-shadow .2s ease',
      backgroundColor: 'background-color .2s ease',
      borderColor: 'border-color .2s ease',
      color: 'color .2s ease',
    },
  },
  utils: {
    meshBackground: (size = 20) => ({
      backgroundImage: `
        linear-gradient(45deg, #b0b0b0 25%, transparent 25%),
        linear-gradient(-45deg, #b0b0b0 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #b0b0b0 75%),
        linear-gradient(-45deg, #fff 75%, #b0b0b0 75%)
      `,
      backgroundSize: `${size}px ${size}px`,
      backgroundPosition: `0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px`,
    }),
  },
})

globalThis.reseted = false

export const resetStyle = (custom: Record<string, any> = {}) => {
  if (globalThis.reseted) return
  globalThis.reseted = true
  const reset = globalCss({
    ...resetCSS,
    '@font-face': [
      {
        fontFamily: 'mono',
        fontWeight: 300,
        src: 'url("https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*XvJJSIIEDbYAAAAAAAAAAAAADinLAQ/JetBrainsMono-Light.woff2") format("woff2")',
      },
      {
        fontFamily: 'mono',
        fontWeight: 400,
        src: 'url("https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*cCg_QbqN1BAAAAAAAAAAAAAADinLAQ/JetBrainsMono-Regular.woff2") format("woff2")',
      },
      {
        fontFamily: 'mono',
        fontWeight: 500,
        src: 'url("https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*M8hRRpGAU5sAAAAAAAAAAAAADinLAQ/JetBrainsMono-Medium.woff2") format("woff2")',
      },
      {
        fontFamily: 'geist',
        fontWeight: 300,
        fontStyle: 'normal',
        src: 'url(https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*zUmLTpFfGT4AAAAAAAAAAAAADinLAQ/Geist-ExtraLight.woff2) format("woff2")',
      },
      {
        fontFamily: 'geist',
        fontWeight: 400,
        fontStyle: 'normal',
        src: 'url(https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*uQQpSZey8WoAAAAAAAAAAAAADinLAQ/Geist-Regular.woff2) format("woff2")',
        unicodeRange: 'U+0000-002F, U+003A-007F, U+0080-00FF, U+0100-FFFF',
      },
      {
        fontFamily: 'geist',
        fontWeight: 500,
        fontStyle: 'normal',
        src: 'url(https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*y26-RqzF8tUAAAAAAAAAAAAADinLAQ/Geist-Medium.woff2) format("woff2")',
      },
      {
        fontFamily: 'geist',
        fontWeight: 600,
        fontStyle: 'normal',
        src: 'url(https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*RsRyTpStUPsAAAAAAAAAAAAADinLAQ/Geist-SemiBold.woff2) format("woff2")',
      },
      {
        fontFamily: 'geist',
        fontWeight: 700,
        fontStyle: 'normal',
        src: 'url(https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*S5q2SYDWJ44AAAAAAAAAAAAADinLAQ/Geist-Bold.woff2) format("woff2")',
      },
      {
        fontFamily: 'geist',
        fontWeight: 800,
        fontStyle: 'normal',
        src: 'url(https://mdn.alipayobjects.com/huamei_piroyv/afts/file/A*1HUETbzL9gsAAAAAAAAAAAAADinLAQ/Geist-Black.woff2) format("woff2")',
      },
    ],
    html: {
      fontFamily: '$default',
      fontSize: '16px',
      backgroundColor: '$surface',
      color: '$textStrong',
      ...custom.html,
    },
    body: {
      backgroundColor: '$surface',
      color: '$textStrong',
      ...custom.body,
    },
    ...custom,
  })
  reset()
}

export const darkTheme = theme

export const lightTheme = createTheme('light-theme', { colors: colors.light })

type CSS = Parameters<typeof css>[0]

type StitchesComponent<T extends { [key: string]: any; [key: symbol]: any }> = ComponentProps<T>

export type { VariantProps, CSS, StitchesComponent }
