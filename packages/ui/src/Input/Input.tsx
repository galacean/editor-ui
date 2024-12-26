import React from "react";

import { StitchesComponent, styled } from "../../design-system";

const StyledInputSlot = styled("div", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "$gray9",
  transition: "color 0.2s ease",
  userSelect: "none",
  variants: {
    size: {
      sm: {
        padding: "0 $1",
        fontSize: "$1",
      },
      md: {
        padding: "0 $2",
        fontSize: "$1_5",
      }
    }
  }
});

const StyledInputBackground = styled("div", {
  position: "absolute",
  top: 0,
  inset: 0,
  borderRadius: "inherit",
  pointerEvents: 'none',
  variants: {
    variant: {
      default: {
        boxShadow: "inset 0 0 0 1px $colors$border, inset 0 -6px 18px 0px $colors$grayA2",
      },
      subtle: {
        backgroundColor: "$secondaryBg",
        '&:active': {
          boxShadow: 'inset 0 0 0 1px $colors$border',
        }
      },
      transparent: {
        backgroundColor: "transparent",
        borderRadius: '$2',
        outline: "none !important"
      }
    },
    state: {
      invalid: {
        boxShadow: "0 0 0 1px $colors$red7",
        backgroundColor: "$redA3",
        color: "$red11"
      },
      valid: {
        backgroundColor: "$green3",
        boxShadow: "0 0 0 1px $colors$green7",
        color: "$green11"
      }
    },
  },
  defaultVariants: {
    variant: "subtle",
  }
});

const StyledInput = styled("input", {
  appearance: "none",
  position: "relative",
  height: "100%",
  borderWidth: "0",
  boxSizing: "border-box",
  outline: "none",
  flex: 1,
  width: "100%",
  color: "$gray11",
  borderRadius: "$2",
  fontFamily: "$default",
  fontWeight: "$regular",
  backgroundColor: "transparent",
  textAlign: "inherit",
  padding: "0 0 $0_5",
  "&:hover": {
    color: "$gray12"
  },
  [`&:focus ~ ${StyledInputBackground}`]: {
    boxShadow: "inset 0 0 0 1px $colors$blue10"
  },
  "&:focus-visible": {
    color: "$gray12"
  },
  "&::placeholder": {
    color: "$grayA10"
  },
  "&[readonly]": {
    cursor: "default"
  },
  "&::read-only::placeholder": {
    color: "$grayA7"
  },
  variants: {
    code: {
      true: {
        fontFamily: "$mono $default"
      }
    },
    size: {
      sm: {
        fontSize: "$1",
        paddingLeft: "$1_5"
      },
      md: {
        fontSize: "$2",
        paddingLeft: "$2"
      }
    },
    ellipsis: {
      true: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    },
    cursor: {
      default: {
        cursor: "default",
        "&:focus": {
          cursor: "text"
        }
      },
      text: {
        cursor: "text"
      }
    }
  }
});

export const StyledInputRoot = styled("div", {
  position: "relative",
  display: "flex",
  width: "100%",
  color: "$gray12",
  transition: "box-shadow 0.2s ease",
  [`${StyledInputSlot} + ${StyledInput}`]: {
    paddingLeft: 0
  },
  variants: {
    size: {
      xs: {
        height: "$5",
        lineHeight: "$sizes$5",
        borderRadius: "$2",
        fontSize: "$1"
      },
      sm: {
        height: "$sm",
        lineHeight: "$sizes$sm",
        fontSize: "$sm",
        borderRadius: "$2",
        [`& ${StyledInput}`]: {
          '&::placeholder': {
            fontSize: '10px',
          }
        },
      },
      md: {
        height: "$md",
        fontSize: "$2",
        borderRadius: "$4"
      }
    },
    disabled: {
      true: {
        // backgroundColor: "$gray2",
        [`${StyledInputSlot}`]: {
          color: "$grayA7"
        },
        [`${StyledInput}`]: {
          color: "$grayA7",
          "&:focus": {
            color: "$grayA7"
          },
          "&:hover": {
            color: "$grayA7"
          }
        },
        [`${StyledInputSlot}`]: {
          color: "$grayA7",
          "&:focus": {
            color: "$grayA7"
          },
          "&:hover": {
            color: "$grayA7"
          }
        }
      }
    },
  },
  compoundVariants: [
  ],
  defaultVariants: {
    size: "sm",
  }
});

export interface InputProps extends StitchesComponent<typeof StyledInput> {
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  overrideStartSlotStyle?: boolean;
  overrideEndSlotStyle?: boolean;
  rootRef?: any;
  disabled?: boolean;
  variant?: "default" | "subtle" | "transparent";
  state?: "valid" | "invalid";
}

/**
 * The `<Input />` component could lets users enter one of various types of text on a single line.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, forwardedRef) {
  const {
    startSlot,
    endSlot,
    css,
    rootRef,
    disabled,
    size = "sm",
    variant,
    overrideStartSlotStyle,
    overrideEndSlotStyle,
    state,
    ...rest
  } = props;

  return (
    <StyledInputRoot
      css={css}
      ref={rootRef}
      size={size}
      disabled={disabled}
    >
      {!!startSlot && (
        overrideStartSlotStyle ? startSlot : <StyledInputSlot size={size}>{startSlot}</StyledInputSlot>
      )}
      <StyledInput disabled={disabled} ref={forwardedRef} size={size} {...rest} />
      {!!endSlot && (
        overrideEndSlotStyle ? endSlot : <StyledInputSlot size={size}>{endSlot}</StyledInputSlot>
      )}
      <StyledInputBackground variant={variant} state={state} />
    </StyledInputRoot>
  );
});
