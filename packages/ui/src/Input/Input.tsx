import React from "react";

import { StitchesComponent, styled } from "../../design-system";

const StyledInputSlot = styled("div", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "$gray9",
  padding: "0 $1",
  fontSize: "$1",
  transition: "color 0.2s ease",
  userSelect: "none"
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
        fontSize: "$1",
        paddingLeft: "$2"
      }
    },
    state: {
      invalid: {
        boxShadow: "0 0 0 1px $colors$red7",
        backgroundColor: "$red3",
        color: "$red11"
      },
      valid: {
        backgroundColor: "$green3",
        boxShadow: "0 0 0 1px $colors$green7",
        color: "$green11"
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
        fontSize: "13px",
        borderRadius: "$2"
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
    variant: {
      default: {
        boxShadow: "inset 0 0 0 1px $colors$border",
        backgroundColor: '$gray2',
      },
      subtle: {
        backgroundColor: "$secondaryBg"
      },
      transparent: {
        backgroundColor: "transparent",
        borderRadius: 0,
        outline: "none !important"
      }
    }
  },
  compoundVariants: [
  ],
  defaultVariants: {
    size: "sm",
    variant: "subtle"
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
    ...rest
  } = props;

  return (
    <StyledInputRoot
      css={css}
      ref={rootRef}
      size={size}
      disabled={disabled}
      variant={variant}
    >
      {!!startSlot && (
        overrideStartSlotStyle ? startSlot : <StyledInputSlot>{startSlot}</StyledInputSlot>
      )}
      <StyledInput disabled={disabled} ref={forwardedRef} size={size} {...rest} />
      {!!endSlot && (
        overrideEndSlotStyle ? endSlot : <StyledInputSlot>{endSlot}</StyledInputSlot>
      )}
    </StyledInputRoot>
  );
});
