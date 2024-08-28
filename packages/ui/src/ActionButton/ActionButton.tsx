
import React, { useState, forwardRef } from "react";

import { StitchesComponent, styled } from "@galacean/design-system";
import { useAsyncStatus } from "../../hooks/useAsyncStatus";
import { Spin } from "../Spin";
import { button } from "@galacean/design-system/recipes";
import { IconRightBottomCorner } from "../Icons/IconRightBottomCorner";

/**
 * Button component has many variant such as size, style variant and status
 * Size:
 * - xs (default)
 * - sm
 * - lg
 * - lg
 * Variant:
 * - primary
 * - light
 * - outline
 * - subtle
 * - uppercase
 * Status:
 * - disabled
 * - critical
 * - loading
 * - positive
 */

const StyledActionButton = styled("button", button, {
  boxShadow: "$prepend",
  transition: "$shadow, background-color 0.16s ease, color 0.16s ease, transform 0.2s ease",
  borderRadius: "$2",
  color: "$gray11",
  flexShrink: 0,
  flexGrow: 0,
  padding: 0,
  "&:focus-visible": {
    boxShadow: "0 0 0 1px $colors$blue10"
  },
  "&:disabled": {
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  variants: {
    withCorner: {
      true: {
        position: "relative"
      }
    },
    size: {
      xs: {
        height: "$xs",
        width: "$xs",
        borderRadius: "$2",
        "& > svg": {
          height: "$3",
          width: "$3"
        }
      },
      s: {
        height: "$s",
        width: "$s",
        borderRadius: "$2",
        "& > svg": {
          height: "14px",
          width: "14px"
        }
      },
      sm: {
        height: "$6",
        width: "$6",
        borderRadius: "$2",
        fontSize: "$sm",
        "& svg": {
          height: "14px",
          width: "14px"
        }
      },
      md: {
        height: "$7",
        width: "$7",
        borderRadius: "$3",
        "& svg": {
          height: "$4",
          width: "$4"
        }
      },
      lg: {
        height: "$8",
        width: "$8",
        borderRadius: "$4",
        "& svg": {
          height: "$4",
          width: "$4"
        }
      }
    },
    variant: {
      outline: {
        border: "1px solid $gray6",
        borderColor: "$gray6",
        borderWidth: "1px",
        borderStyle: "solid",
        color: "$gray11",
        fontSize: "$1",
        backgroundColor: "transparent",
        "&:hover": {
          color: "$gray12",
          borderColor: "$gray7",
          backgroundColor: "$grayA3"
        },
        "&:disabled": {
          color: "$grayA8",
          borderColor: "$gray7",
          backgroundColor: "$grayA3",
          cursor: "not-allowed"
        }
      },
      secondary: {
        backgroundColor: "$subtleBg",
        "&:hover": {
          backgroundColor: "$grayA4"
        },
        "&:disabled": {
          color: "$gray7",
          backgroundColor: "$grayA2",
          cursor: "not-allowed"
        }
      },
      subtle: {
        color: "CurrentColor",
        backgroundColor: "transparent",
        "&:hover": {
          color: "$gray12",
          backgroundColor: "$grayA4"
        },
        "&:disabled": {
          color: "$gray8",
          "&:hover": {
            color: "$gray8",
            backgroundColor: "transparent"
          }
        }
      },
      transparent: {
        color: "$gray11",
        backgroundColor: "transparent",
        "&:hover": {
          color: "$gray12"
        }
      }
    },
    active: {
      true: {
        backgroundColor: "$blue9",
        color: "$white",
        "&:hover": {
          backgroundColor: "$blueA9"
        }
      }
    },
    fancy: {
      true: {
        "&:active": {
          transform: "scale(0.96)"
        }
      }
    }
  },
  defaultVariants: {
    size: "sm",
    variant: "secondary"
  },
  compoundVariants: [
    {
      variant: "subtle",
      active: true,
      css: {
        color: "$white",
        backgroundColor: "transparent",
        "&:hover": {
          color: "$white",
          backgroundColor: "$grayeA3"
        }
      }
    },
    {
      variant: "transparent",
      active: true,
      css: {
        color: "$white",
        backgroundColor: "$blue9",
        "&:hover": {
          color: "$white",
          backgroundColor: "$blue10"
        }
      }
    }
  ]
});

const StyledActionButtonGroup = styled("div", {
  display: "flex",
  variants: {
    dir: {
      horizontal: {
        [`& ${StyledActionButton}:nth-child(1)`]: {
          borderRight: 0,
          borderRadius: "$2 0 0 $2"
        },
        [`& ${StyledActionButton}:nth-last-child(1)`]: {
          borderRadius: "0 $2 $2 0"
        }
      },
      vertical: {
        flexDirection: "column",
        [`& ${StyledActionButton}:nth-child(1)`]: {
          borderBottom: 0,
          borderRadius: "$2 $2 0 0"
        },
        [`& ${StyledActionButton}:nth-last-child(1)`]: {
          borderRadius: "0 0 $2 $2"
        }
      }
    }
  },
  defaultVariants: {
    dir: "horizontal"
  }
});

StyledActionButtonGroup.displayName = 'ActionButtonGroup'

const CornerIcon = styled(IconRightBottomCorner, {
  position: "absolute",
  width: "4px !important",
  height: "4px !important",
  color: "var(CurrentColor, $gray8)",
  bottom: 2,
  right: 2
});

export interface ActionButtonProps extends StitchesComponent<typeof StyledActionButton> {
  /**
   * An async function or a function which should return a Promise
   */
  async?: () => Promise<unknown>;
  loading?: boolean;
  as?: string;
  cornerIcon?: boolean;
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(function ActionButton(props, forwardedRf) {
  const { loading: propLoading, async, onClick, size, cornerIcon, ...rest } = props;
  const { handleClick, loading } = useAsyncStatus({
    asyncFunction: async,
    propLoading,
    onClick
  });

  return (
    <StyledActionButton
      {...rest}
      size={size}
      onClick={handleClick}
      ref={forwardedRf}
      withCorner={cornerIcon}
      disabled={loading || props.disabled}
    >
      {loading ? <Spin size="xs" color="default" /> : rest.children}
      {cornerIcon && <CornerIcon />}
    </StyledActionButton>
  );
});

ActionButton.toString = () => StyledActionButton.toString();

export { StyledActionButtonGroup as ActionButtonGroup };
