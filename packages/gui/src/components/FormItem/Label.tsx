import { ReactNode } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { styled, type CSS } from "@galacean/editor-ui";

const StyledLabelRoot = styled("div", {
  all: "unset",
  display: "flex",
  minHeight: "$6",
  alignItems: "center",
  fontSize: "$sm",
  fontWeight: 500,
  overflow: "hidden",
  whiteSpace: "nowrap",
  color: "$gray10",
  textOverflow: "ellipsis",
  userSelect: "none"
});

const StyledLabel = styled(LabelPrimitive.Root, {
  display: "block",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

export interface LabelProps {
  info?: ReactNode;
  label: string;
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  htmlFor?: string;
  css?: CSS;
};

export function Label(props: LabelProps) {
  const { info, startSlot, endSlot, label, htmlFor, css } = props;

  if (props.info) {
    return (
      <StyledLabelRoot css={css}>
        {startSlot}
        <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>
        {endSlot}
      </StyledLabelRoot>
    );
  }
  return (
    <StyledLabelRoot css={css}>
      {startSlot}
      <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>
      {endSlot}
    </StyledLabelRoot>
  );
}
