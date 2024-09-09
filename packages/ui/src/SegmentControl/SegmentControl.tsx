import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { styled } from "../../design-system";

const StyledSegmentControlItem = styled(RadioGroupPrimitive.Item, {
  all: "unset",
  textWrap: "nowrap",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  height: "100%",
  lineHeight: "var(--sizes-6)",
  color: "$grayA10",
  border: "none",
  fontSize: "$1",
  fontWeight: 300,
  backgroundColor: "transparent",
  outline: "none",
  cursor: "pointer",
  gap: "$1",
  "& > svg": {
    height: "14px",
    width: "14px"
  },
  transition: "all .2s ease",
  "&:hover": {
    color: "$grayA12"
  },
  "&[data-state=checked]": {
    backgroundColor: "$blue10",
    color: "$blueA12",
    "&:hover": {
      color: "$white"
    }
  },
  "&:focus-visible": {
    position: "relative",
    boxShadow: "0 0 0 4px $colors$blueA4, 0 0 0 1px $colors$blueA6"
  },
  "&:first-child": {
    borderTopLeftRadius: "$2",
    borderBottomLeftRadius: "$2"
  },
  "&:last-child": {
    borderTopRightRadius: "$2",
    borderBottomRightRadius: "$2"
  }
});

const StyledSegmentControlRoot = styled(RadioGroupPrimitive.Root, {
  display: "inline-flex",
  backgroundColor: "$grayA3",
  width: "100%",
  alignItems: "center",
  borderRadius: "$2",
  variants: {
    size: {
      sm: {
        height: "$6"
      }
    },
    variant: {
      outline: {
        boxShadow: "0 0 0 1px $colors$border",
      },
    }
  },
  defaultVariants: {
    size: "sm",
  }
});

const SegmentControl = StyledSegmentControlRoot;
const SegmentControlItem = StyledSegmentControlItem;

export { SegmentControl, SegmentControlItem };
