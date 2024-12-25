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
  backgroundColor: "transparent",
  outline: "none",
  cursor: "pointer",
  padding: "0 $1_5",
  borderRadius: "$2",
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
    // backgroundColor: "$blue9",
    backgroundColor: "$grayA5",
    color: "$white",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
    "&:hover": {
      color: "$white"
    }
  },
  "&:focus-visible": {
    position: "relative",
    boxShadow: "0 0 0 4px $colors$blueA4, 0 0 0 1px $colors$blueA6"
  }
  // "&:first-child": {
  //   borderTopLeftRadius: "$2",
  //   borderBottomLeftRadius: "$2"
  // },
  // "&:last-child": {
  //   borderTopRightRadius: "$2",
  //   borderBottomRightRadius: "$2"
  // }
});

const StyledSegmentControlRoot = styled(RadioGroupPrimitive.Root, {
  display: "inline-flex",
  backgroundColor: "$grayA3",
  width: "100%",
  alignItems: "center",
  borderRadius: "$2",
  // padding: "1px",
  variants: {
    size: {
      sm: {
        height: "$sm"
      }
    }
  },
  defaultVariants: {
    size: "sm"
  }
});

const SegmentControl = StyledSegmentControlRoot;
const SegmentControlItem = StyledSegmentControlItem;

export { SegmentControl, SegmentControlItem };
