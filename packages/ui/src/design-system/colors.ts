// standard gray scale
import { gray, grayA, grayDark, grayDarkA } from '@radix-ui/colors'
import { slate, slateA, slateDark, slateDarkA } from '@radix-ui/colors'
// primary colors
import { blue, blueA, blueDark, blueDarkA } from '@radix-ui/colors'
import { orange, orangeA, orangeDark, orangeDarkA } from '@radix-ui/colors'
// positive colors
import { green, greenA, greenDark, greenDarkA } from '@radix-ui/colors'
// negative colors
import { red, redA, redDark, redDarkA } from '@radix-ui/colors'
import { amber, amberDark, amberDarkA } from '@radix-ui/colors'
import { yellow, yellowA, yellowDark, yellowDarkA } from '@radix-ui/colors'
// exclusive colors
import { gold, goldDark, goldDarkA } from '@radix-ui/colors'
// dedicated colors for prefab
import { cyan, cyanDark, cyanDarkA } from '@radix-ui/colors'
import { teal, tealDark } from '@radix-ui/colors'
import { violet, violetA, violetDark, violetDarkA } from '@radix-ui/colors'
import { lime, limeDark } from '@radix-ui/colors'

const conver2StandardGrayColors = (colors: Record<string, string>): typeof gray & typeof grayA => {
  const standardColors: any = {}
  for (const [key, value] of Object.entries(colors)) {
    standardColors[key.replace(/([a-z])+(A)?/, 'gray$2')] = value
  }
  return standardColors
}

// Radix UI provide 7 types of gray.
export const lightStandardGrayColor = conver2StandardGrayColors({ ...slate, ...slateA })
export const darkStandardGrayColor = conver2StandardGrayColors({ ...slateDark, ...slateDarkA })

const darkColors = {
  ...darkStandardGrayColor,
  ...blueDark,
  ...blueDarkA,
  ...orangeDark,
  ...orangeDarkA,
  ...greenDark,
  ...greenDarkA,
  ...redDark,
  ...redDarkA,
  ...amberDark,
  ...amberDarkA,
  ...yellowDark,
  ...yellowDarkA,
  ...goldDark,
  ...goldDarkA,
  ...cyanDark,
  ...cyanDarkA,
  ...tealDark,
  ...violetA,
  ...violetDark,
  ...violetDarkA,
  ...limeDark,
}

const lightColors = {
  ...lightStandardGrayColor,
  ...blue,
  ...blueA,
  ...orange,
  ...orangeA,
  ...green,
  ...greenA,
  ...red,
  ...redA,
  ...amber,
  ...yellow,
  ...yellowA,
  ...gold,
  ...cyan,
  ...teal,
  ...violetA,
  ...violet,
  ...lime,
}

const coreSemanticColors = {
  appBg: '$gray2',

  primary: '$blue9',
  primaryActive: '$blue10',

  textMuted: '$gray10',
  text: '$gray11',
  textStrong: '$gray12',
  textInverted: '$gray1',

  surface: '$gray2',
  surfaceSubtle: '$grayA3',
  surfaceStrong: '$gray4',
  surfaceOverlay: '$gray2',

  softBg: '$grayA3',
  softBgHover: '$grayA4',
  softBgActive: '$grayA5',

  border: '$grayA5',
  borderStrong: '$grayA7',

  focusRing: '$blueA7',
  focusRingMuted: '$grayA7',
}

const statusSemanticColors = {
  infoText: '$blue11',
  infoBg: '$blue3',
  infoBgHover: '$blue4',
  infoBorder: '$blue7',
  infoSolid: '$blue9',
  infoSolidHover: '$blue10',

  successText: '$green11',
  successBg: '$green3',
  successBgHover: '$greenA4',
  successBorder: '$green7',
  successSolid: '$green9',
  successSolidHover: '$green10',

  warningText: '$amber11',
  warningBg: '$amber3',
  warningBgHover: '$amber4',
  warningBorder: '$amber7',
  warningSolid: '$amber9',
  warningSolidHover: '$amber10',

  dangerText: '$red11',
  dangerBg: '$redA3',
  dangerBgHover: '$redA4',
  dangerBorder: '$red7',
  dangerSolid: '$red9',
  dangerSolidHover: '$red10',

  selectionText: '$white',
  selectionBg: '$blue9',
  selectionBgHover: '$blue10',
  selectionBorder: '$blue10',

  scrollbarTrack: '$grayA3',
  scrollbarTrackHover: '$grayA5',
  scrollbarThumb: '$grayA7',
}

const contextSemanticColors = {
  panelBg: '$gray3',
  toastBg: '$gray3',
  overlayScrim: 'rgba(0, 0, 0, 0.72)',
  tooltipBg: '$white',
  tooltipColor: '$gray1',
  sidebarBg: '$grayA3',
  sidebarColor: '$gray12',
}

const deprecatedSemanticColors = {
  // Deprecated: use `softBg`.
  secondaryBg: '$grayA3',
  // Deprecated: use `surfaceOverlay`.
  overlayBg: '$gray2',
  // Deprecated: use `text`.
  subtleColor: '$gray11',
  // Deprecated: use `textStrong`.
  subtleHoverColor: '$gray12',
  // Deprecated: move to component-local token if still needed.
  panelTitleBg: '$gray5',
  // Deprecated: use `surface`.
  listBg: '$gray2',
  // Deprecated: use `surface`.
  dashboardBg: '$gray2',
  // Deprecated: use `surface`.
  defaultBg: '$gray2',
  // Deprecated: use `surface`.
  subbg: '$gray2',
  // Deprecated: use `textMuted`.
  label: '$grayA11',
  // Deprecated: use `textStrong`.
  hiContrast: '$gray12',
  // Deprecated: use `textInverted`.
  loContrast: '$gray1',
  // Deprecated: use `textInverted`.
  inversion: 'white',
  // Deprecated: use `toastBg`.
  toasterBg: '$gray3',
  // Deprecated: use `borderStrong` or component-local border tokens.
  borderFocus: '$gray3',
  // Deprecated: use `selectionBorder` or a status-specific border token.
  borderActive: '$blue10',
  // Deprecated: use component-local token if still needed.
  menuContentBackground: '$gray3',
  // Deprecated: use `textInverted` for text or component-local raw white where necessary.
  white: 'white',
}

export const semanticColors = {
  ...coreSemanticColors,
  ...statusSemanticColors,
  ...contextSemanticColors,
  ...deprecatedSemanticColors,
}

export const colors = {
  dark: { ...darkColors, ...semanticColors },
  light: {
    ...lightColors,
    ...semanticColors,
    appBg: '$gray2',
    surfaceOverlay: '$gray1',
    dashboardBg: '$gray2',
    listBg: '$gray2',
    toastBg: '$gray1',
    toasterBg: '$gray1',
    surface: '$gray1',
    surfaceSubtle: '$gray2',
    surfaceStrong: '$gray3',
    overlayBg: '$gray1',
    tooltipBg: '$gray12',
    tooltipColor: '$gray1',
    sidebarBg: '$blueA3',
    sidebarColor: '$blue11',
  },
} as const
