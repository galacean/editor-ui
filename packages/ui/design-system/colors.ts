// standard gray scale
import { gray, grayA, grayDark, grayDarkA } from "@radix-ui/colors";
import { slate, slateA, slateDark, slateDarkA } from "@radix-ui/colors";
// primary colors
import { blue, blueA, blueDark, blueDarkA } from "@radix-ui/colors";
import { orange, orangeA, orangeDark, orangeDarkA } from "@radix-ui/colors";
// positive colors
import { green, greenA, greenDark, greenDarkA } from "@radix-ui/colors";
// negative colors
import { red, redA, redDark, redDarkA } from "@radix-ui/colors";
import { amber, amberDark, amberDarkA } from "@radix-ui/colors";
import { yellow, yellowA, yellowDark, yellowDarkA } from "@radix-ui/colors";
// exclusive colors
import { gold, goldDark, goldDarkA } from "@radix-ui/colors";
// dedicated colors for prefab
import { cyan, cyanDark, cyanDarkA } from "@radix-ui/colors";
import { teal, tealDark } from "@radix-ui/colors";
import { violet, violetDark } from "@radix-ui/colors";

const conver2StandardGrayColors = (colors: Record<string, string>): typeof gray & typeof grayA => {
  const standardColors: any = {};
  for (const [key, value] of Object.entries(colors)) {
    standardColors[key.replace(/([a-z])+(A)?/, "gray$2")] = value;
  }
  return standardColors;
};

// Radix UI provide 7 types of gray.
export const lightStandardGrayColor = conver2StandardGrayColors({ ...slate, ...slateA });
export const darkStandardGrayColor = conver2StandardGrayColors({ ...slateDark, ...slateDarkA });

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
  ...violetDark,
};

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
  ...violet,
};

export const semanticColors = {
  primary: "$blue9",
  primaryActive: "$blue10",
  appBg: "$gray2",
  secondaryBg: "$grayA3",
  subtleColor: "$gray11",
  subtleHoverColor: "$gray12",
  panelTitleBg: "$gray5",
  // panelBg: "$gray3",
  panelBg: "$gray3",
  listBg: "$gray2",

  dashboardBg: "$gray2",
  sidebarBg: "$grayA3",
  sidebarColor: "$gray12",

  defaultBg: "$gray2",
  border: "$grayA5",
  borderFocus: "$gray3",
  borderActive: "$blue10",

  toasterBg: "$gray3",

  subbg: "$gray2",
  label: "$grayA11",
  hiContrast: "$gray12",
  loContrast: "$gray1",
  inversion: "white",
  tooltipColor: "$gray1",
  tooltipBg: "$white",
  white: "white",
  text: "$gray11",
  menuContentBackground: "$gray3"
};

export const colors = {
  dark: { ...darkColors, ...semanticColors },
  light: {
    ...lightColors,
    ...semanticColors,
    dashboardBg: "$white",
    listBg: "$white",
    toasterBg: "$gray1",
    tooltipBg: "$gray12",
    tooltipColor: "$gray1",
    sidebarBg: "$blueA3",
    sidebarColor: "$blue11"
  }
} as const;
