import React, { PropsWithChildren, ReactNode, forwardRef, useState, useEffect, useCallback } from "react";

import { styled, StitchesComponent } from "@galacean/design-system";
import { Spin } from "../Spin";
import { Flex } from "../Flex";
import { button } from "@galacean/design-system/recipes";
import { useAsyncStatus } from "../../hooks/useAsyncStatus";

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

const StyledButton = styled("button", button, {
  // for boxShadow transition
  boxShadow: "0 0 0 0 transparent",
  transition: "box-shadow .2s ease, opacity .6s ease-out",
  userSelect: "none",
  whiteSpace: "nowrap",
  "&:disabled": {
    backgroundColor: "$grayA2",
    color: "$grayA8",
    cursor: "not-allowed",
    "&:hover": {
      backgroundColor: "$grayA2",
      color: "$grayA8"
    }
  },
  variants: {
    // The scale of button
    size: {
      xs: {
        height: "$5",
        fontSize: "$sm",
        lineHeight: "$sizes$5",
        fontWeight: 300,
        borderRadius: "$2",
        padding: "0 $1_5",
        [`& ${Spin}`]: {
          height: "$2",
          width: "$2"
        }
      },
      s: {
        height: "$s",
        fontSize: "$sm",
        fontWeight: 400,
        borderRadius: "$2",
        padding: "0 $2",
        [`& ${Spin}`]: {
          height: "$3",
          width: "$3"
        }
      },
      sm: {
        height: "$sm",
        fontSize: "11px",
        fontWeight: 400,
        borderRadius: "$2",
        padding: "0 $2",
        [`& ${Spin}`]: {
          height: "$3",
          width: "$3"
        }
      },
      md: {
        height: "$md",
        borderRadius: "$4",
        padding: "0 $4",
        fontSize: "$1"
      },
      lg: {
        height: "$lg",
        fontSize: "$3",
        borderRadius: "$1",
        padding: "0 $4"
      }
    },
    // The Variant of button
    variant: {
      default: {
        color: "$gray11",
        backgroundColor: "transparent",
        border: "1px solid $grayA5",
        transition: "border-color .2s ease",
        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$grayA7"
        },
        "&:hover": {
          border: "1px solid $colors$gray8"
        },
        "&:active": {
          backgroundColor: "$gray3"
        }
      },
      /** the basic style */
      primary: {
        backgroundColor: "$blue9",
        color: "$white",
        "&:hover": {
          backgroundColor: "$blue10"
        },
        "&:active": {
          backgroundColor: "$blue10"
        }
      },
      outline: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "$blue7",
        color: "$blue11",
        backgroundColor: "$blue3",
        "&:hover": {
          borderColor: "$blue7",
          backgroundColor: "$blue4"
        },
        "&:active": {
          borderColor: "$blue8",
          backgroundColor: "$blue5"
        },
        "&:disabled": {
          borderColor: "$gray6"
        }
      },
      subtle: {
        color: "$blue9",
        backgroundColor: "transparent",
        "&:hover": {
          color: "$blue10",
          backgroundColor: "$blue4"
        },
        "&:active": {
          color: "$blue10",
          backgroundColor: "$blue4"
        }
      },
      secondary: {
        backgroundColor: "$subtleBg",
        color: "$gray11",
        "&:hover": {
          color: "$gray12",
          backgroundColor: "$grayA4"
        },
        "&:active": {
          color: "$gray12",
          backgroundColor: "$grayA5"
        },
        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$blue8"
        }
      },
      subsecondary: {
        color: "$gray11",
        "&:hover": {
          backgroundColor: "$grayA4",
          color: "$gray11"
        },
        "&:active": {
          backgroundColor: "$gray5"
        },
        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$gray7"
        }
      }
    },
    uppercase: {
      true: {
        textTransform: "uppercase"
      }
    },
    // The state of button
    critical: {
      true: {
        color: "$red11",
        backgroundColor: "transparent",
        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$redA7"
        },
        "&:hover": {
          backgroundColor: "$red3"
        },
        "&:active": {
          backgroundColor: "$red4"
        }
      }
    },
    positive: {
      true: {
        color: "$green11",
        backgroundColor: "transparent",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$greenA7"
        },
        "&:hover": {
          backgroundColor: "$greenA3"
        },
        "&:active": {
          backgroundColor: "$greenA4"
        }
      }
    },
    loading: {
      true: {
        opacity: ".6",
        pointerEvents: "none"
      }
    },
    round: {
      true: {
        borderRadius: "$round"
      }
    }
  },
  defaultVariants: {
    size: "sm",
    variant: "default"
  },
  compoundVariants: [
    {
      variant: "default",
      critical: true,
      css: {
        borderColor: "$red7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$redA7"
        },
        "&:hover": {
          borderColor: "$red8",
          backgroundColor: "$redA3"
        },
        "&:active": {
          backgroundColor: "$redA4"
        },
        "&:disabled": {
          borderColor: "$gray6"
        }
      }
    },
    {
      variant: "default",
      positive: true,
      css: {
        borderColor: "$green7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$greenA7"
        },
        "&:hover": {
          borderColor: "$green8",
          backgroundColor: "$greenA3"
        },
        "&:active": {
          backgroundColor: "$greenA4"
        }
      }
    },
    {
      variant: "primary",
      critical: true,
      css: {
        color: "white",
        backgroundColor: "$red9",
        "&:hover": {
          backgroundColor: "$red10"
        },
        "&:active": {
          backgroundColor: "$red9"
        }
      }
    },
    {
      variant: "primary",
      positive: true,
      css: {
        color: "white",
        backgroundColor: "$green9",
        "&:hover": {
          backgroundColor: "$green10"
        },
        "&:active": {
          backgroundColor: "$green10"
        }
      }
    },
    {
      variant: "outline",
      critical: true,
      css: {
        color: "$red11",
        backgroundColor: "transparent",
        borderColor: "$red7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$redA7"
        },
        "&:hover": {
          borderColor: "$red8",
          backgroundColor: "$redA3"
        },
        "&:active": {
          backgroundColor: "$redA4"
        }
      }
    },
    {
      variant: "secondary",
      critical: true,
      css: {
        color: "$red11",
        backgroundColor: "redA3",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$redA7"
        },
        "&:hover": {
          color: "$red11",
          backgroundColor: "$redA3"
        },
        "&:active": {
          backgroundColor: "$redA4"
        }
      }
    },
    {
      variant: "subsecondary",
      critical: true,
      css: {
        color: "$redA9",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$redA7"
        },
        "&:hover": {
          color: "$red11",
          backgroundColor: "$redA3"
        },
        "&:active": {
          backgroundColor: "$redA4"
        }
      }
    },
    {
      variant: "outline",
      positive: true,
      css: {
        color: "$green11",
        backgroundColor: "transparent",
        borderColor: "$green7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$greenA7"
        },
        "&:hover": {
          borderColor: "$green8",
          backgroundColor: "$greenA3"
        },
        "&:active": {
          backgroundColor: "$greenA4"
        }
      }
    }
  ]
});

export type ButtonProps = PropsWithChildren<
  StitchesComponent<typeof StyledButton> & {
    startSlot?: ReactNode;
    endSlot?: ReactNode;
    async?: () => Promise<unknown>;
  }
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { children, startSlot, endSlot, async, size, loading: propLoading, onClick, ...rest } = props;
  const { loading, handleClick } = useAsyncStatus({
    asyncFunction: async,
    propLoading: propLoading as unknown as boolean,
    onClick
  });

  const spin = <Spin color="default" size="xs" css={{ marginRight: "$1_5" }} />;

  return (
    <StyledButton ref={ref} loading={loading} size={size} onClick={handleClick} {...rest}>
      {startSlot && (loading ? spin : <Flex css={{ marginRight: "$1_5" }}>{startSlot}</Flex>)}
      {!startSlot && !endSlot && loading && spin}
      {children}
      {endSlot && (loading ? spin : <Flex css={{ marginLeft: "$1_5" }}>{endSlot}</Flex>)}
    </StyledButton>
  );
});

Button.toString = () => ".editor-button-component";

export { Button };
