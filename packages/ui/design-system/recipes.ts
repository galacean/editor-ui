import { styled, css, keyframes } from "./stitches.config";

type CSS = Parameters<typeof css>[0];

export const button = styled('button', {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  border: "1px solid transparent",
  boxSizing: "border-box",
  cursor: "pointer",
  "&:focus-visible": {
    boxShadow: "0 0 0 2px $colors$blueA7"
  },
  "&:disabled": {
    backgroundColor: "$grayA3",
    color: "$grayA8",
    cursor: "not-allowed"
  }
});


const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(-2px)"
  },
  to: {
    opacity: 1,
    transform: "translateY(0)"
  }
});

const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(2px)"
  },
  to: {
    opacity: 1,
    transform: "translateY(0)"
  }
});

const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: "translateX(-2px)"
  },
  to: {
    opacity: 1,
    transform: "translateX(0)"
  }
});

const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: "translateX(2px)"
  },
  to: {
    opacity: 1,
    transform: "translateX(0)"
  }
});

const openUp = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(.9)"
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)"
  }
});

const scaleOut = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1)"
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.9)"
  }
});

export const scaleIn = keyframes({
  from: {
    opacity: 0,
    transform: "scale(0)"
  },
  to: {
    opacity: 1,
    transform: "scale(1)"
  }
});

export const basicItemStyle = styled('div', {
  all: "unset",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  lineHeight: 1,
  fontSize: "11px",
  borderRadius: "$2",
  color: "$gray11",
  padding: "$1 $2",
  userSelect: "none",
  boxSizing: "border-box",
  minWidth: "max-content",
  cursor: "default",
  // disable state
  "&[data-disabled]": {
    color: "$grayA8",
    pointerEvents: "none"
  },

  "&:focus": {
    // backgroundColor: "$grayA3",
    // color: "$grayA11"
    backgroundColor: "$blue10",
    color: "$white"
  },

  variants: {
    size: {
      xs: {
        height: "$xs",
        fontSize: "$0_5",
        minWidth: "min-content"
      },
      sm: {
        height: "$sm"
      },
      md: {
        height: "$8",
        borderRadius: "$3"
      },
      lg: {
        height: "$10"
      }
    },
    critical: {
      true: {
        color: "$red10",
        "& > .kbd-item": {
          backgroundColor: "$redA3"
        },
        "&:focus": {
          // color: "$red11",
          color: "$white",
          backgroundColor: "$red10"
        }
      }
    }
  },
  defaultVariants: {
    size: "sm"
  }
});

export const selectContent: CSS = {
  overflow: "hidden",
  backgroundColor: "$gray3",
  borderRadius: "$2",
  boxShadow: "0 5px 10px rgba(0,0,0,0.08)",
  border: "1px solid $grayA4"
};

export const contentStyle = styled('div', {
  position: "relative",
  backgroundColor: "$listBg",
  borderRadius: "$3",
  padding: "$1",
  boxShadow: "0 5px 10px rgba(0,0,0,0.08)",
  transformOrigin: "var(--radix-context-menu-content-transform-origin)",
  border: "1px solid $grayA4",
  minWidth: "200px",
  animation: `${scaleIn} .2s ease`,
  animationDuration: "300ms",
  animationTimingFunction: `cubic-bezier(0.16, 1, 0.3, 1)`,
  willChange: "transform, opacity",
  '&[data-side="top"]': {
    animationName: slideDownAndFade
  },
  '&[data-side="bottom"]': {
    animationName: slideUpAndFade
  },
  '&[data-side="left"]': {
    animationName: slideRightAndFade
  },
  '&[data-side="right"]': {
    animationName: slideLeftAndFade
  },
  variants: {
    size: {
      xs: {
        minWidth: "max-content"
      },
      sm: {
        borderRadius: "$4"
      }
    }
  }
});

export const labelStyle = styled('span', {
  fontSize: "10px",
  color: "$gray9",
  padding: "$1 $2",
  userSelect: "none"
});

export const separatorStyle = styled('div', {
  height: 1,
  backgroundColor: "$gray5",
  margin: "$1"
});

export const indicatorStyle = styled('div', {
  position: "absolute",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  left: "$1",
  width: "$4",
  height: "$4",
  marginRight: "$1_5",
  "& > svg": {
    width: "14px",
    height: "14px"
  }
});

export const checkboxItemStyle = styled('div', basicItemStyle, {
  position: "relative !important",
  paddingLeft: "$6 !important",
  "&[data-state=checked]": {
    display: "flex",
    justifyContent: "initial"
  }
});

export const radioItemStyle = styled('div', basicItemStyle, {
  paddingLeft: "$7",
  "&[data-state=checked]": {
    display: "flex",
    justifyContent: "initial"
  }
});

export const subMenuItemStyle = styled('div', basicItemStyle, {
  position: "relative",
  // For CaretRightIcon style
  "& > svg": {
    width: "$3",
    height: "$3"
  }
});
