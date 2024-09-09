import React, { ComponentProps } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { styled, VariantProps } from "../../design-system";

const StyledProgressRoot = styled(ProgressPrimitive.Root, {
  position: "relative",
  width: "100%",
  background: "$grayA5",
  borderRadius: "$round",
  overflow: "hidden",
  variants: {
    size: {
      sm: {
        height: "$1"
      },
      md: {
        height: "$2"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

const StyledProgressIndicator = styled(ProgressPrimitive.Indicator, {
  width: "100%",
  height: "100%",
  borderRadius: "$round",
  backgroundColor: "$blue10"
});

export type ProgressProps = ComponentProps<typeof StyledProgressRoot> & VariantProps<typeof StyledProgressRoot>;

function Progress(props: ProgressProps) {
  return (
    <StyledProgressRoot {...props}>
      <StyledProgressIndicator style={{ transform: `translateX(-${100 - props.value!}%)` }} />
    </StyledProgressRoot>
  );
}

export { Progress };
