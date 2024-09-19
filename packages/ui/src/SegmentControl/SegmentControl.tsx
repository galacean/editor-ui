import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { styled } from "../../design-system";

const StyledSegmentControlItem = styled(RadioGroupPrimitive.Item, {
  all: "unset",
  display: "flex",
  textWrap: "nowrap",
  alignItems: "center",
  height: "100%",
  // flex: 1,
  // flexShrink: 0,
  overflow: 'hidden',
  padding: '0 $1',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  lineHeight: "var(--sizes-6)",
  color: "$grayA10",
  border: "none",
  fontSize: "$1",
  fontWeight: 300,
  backgroundColor: "transparent",
  outline: "none",
  cursor: "pointer",
  gap: "$1",
  transition: "all .2s ease",
  "& > svg": {
    height: "14px",
    width: "14px"
  },
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
  display: "grid",
  backgroundColor: "$grayA3",
  width: "100%",
  maxWidth: "100%",
  gridTemplateColumns: 'repeat(4, 1fr)',
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
