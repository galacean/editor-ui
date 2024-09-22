import React, { ReactNode } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { AccordionItemProps as PrimitiveItemProps, AccordionSingleProps, AccordionMultipleProps } from "@radix-ui/react-accordion";

import { styled } from "../../design-system";

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: "$2",
  width: "100%",
  border: "1px solid $border",
  overflow: "hidden",
});

const StyledChevron = styled(IconChevronRight, {
  marginRight: "$0_5",
  width: "$3",
  height: "$3",
  transform: "rotate(0deg)",
  transition: "transform .2s ease"
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: "unset",
  display: "flex",
  width: "100%",
  padding: "0 $1",
  height: "$7",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "$1",
  color: "$grayA11",
  overflow: "hidden",
  boxSizing: "border-box",
  backgroundColor: "$grayA2",
  '&[data-state="open"]': {
    [`& ${StyledChevron}`]: {
      transform: "rotate(90deg)"
    }
  },
  "&:hover": { backgroundColor: "$grayA3" },
  '&:focus-visible': {
    outline: "none",
    boxShadow: "0 0 0 5px $colors$border"
  }
});

const StyledContent = styled(AccordionPrimitive.Content, {
  fontSize: "$1",
  padding: "$1",
  backgroundColor: "$grayA1",
  color: "$gray11",
  '&[data-state="open"]': {
    // borderBottom: "1px solid $gray2"
  },
  "&:empty": {
    padding: 0,
    borderTop: "none"
  }
});

const StyledItem = styled(AccordionPrimitive.Item, {
  position: "relative",
  boxSizing: "border-box",
  width: "100%",
  '& + &::after': {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "$border"
  },
  '&:first-child': {
    [`& ${StyledTrigger}`]: {
      borderRadius: "$2 $2 0 0 !important",
    }
  },
  // '&:last-of-type': {
  //   [`& ${StyledTrigger}`]: {
  //     borderRadius: "",
  //     borderBottom: '1px solid $border',
  //   }
  // },
  '&[data-state="open"] + &::after': {
    display: "none"
  },
  '&[data-state="open"]:last-child': {
    [`& ${StyledTrigger}`]: {
      borderRadius: "0",
    }
  }
});

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

/**
 * The Accordion Component is used to show/hide content in a collapsible manner. Consists of `Accordion` and `AccordionItem` components.
 * 
 * This Component provide controlled and uncontrolled modes.
 */
export const Accordion = function Accordion(props: AccordionProps) {
  return <StyledAccordion {...props} />;
};


export type AccordionItemProps = Omit<PrimitiveItemProps, "title"> & {
  title: ReactNode;
  arrow?: boolean;
};

export function AccordionItem(props: AccordionItemProps) {
  const { children, title, arrow = true, ...rest } = props;
  return (
    <StyledItem {...rest}>
      <StyledTrigger>
        {arrow && <StyledChevron aria-hidden />}
        {title}
      </StyledTrigger>
      <StyledContent>{children}</StyledContent>
    </StyledItem>
  );
}
