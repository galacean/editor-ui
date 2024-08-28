import React, { ComponentProps, PropsWithChildren } from "react";

import { styled } from "@galacean/design-system";
import type { StitchesComponent, VariantProps } from "@galacean/design-system";

const StyledFlex = styled("div", {
  display: "flex",
  boxSizing: "border-box",
  variants: {
    dir: {
      column: {
        flexDirection: "column",
        alignItems: "flex-start"
      },
      row: { flexDirection: "row" },
      rr: { flexDirection: "row-reverse" },
      cr: { flexDirection: "column-reverse" }
    },
    end: {
      true: {
        justifyContent: "flex-end"
      }
    },
    justifyContent: {
      center: {
        justifyContent: "center"
      },
      between: {
        justifyContent: "space-between"
      },
      around: {
        justifyContent: "space-around"
      }
    },
    align: {
      both: {
        alignItems: "center",
        justifyContent: "center"
      },
      v: {
        alignItems: "center",
        lineHeight: 1
      },
      h: {
        justifyContent: "center"
      }
    },
    wrap: {
      true: { flexWrap: "wrap" },
      false: { flexWrap: "nowrap" },
      reverse: { flexWrap: "wrap-reverse" }
    },
    gap: {
      none: { gap: "none" },
      xxs: { gap: "$0_5" },
      xs: { gap: "$1" },
      sm: { gap: "$2" },
      md: { gap: "$3" },
      lg: { gap: "$4" }
    }
  },
  defaultVariants: {
    dir: "row",
    wrap: true
  }
});

export type FlexProps = PropsWithChildren<StitchesComponent<typeof StyledFlex>>;

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(props: FlexProps, ref) {
  return (
    <StyledFlex {...props} ref={ref}>
      {props.children}
    </StyledFlex>
  );
});
