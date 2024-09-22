import React, { Fragment } from "react";
import { IconSlash } from "@tabler/icons-react";

import { styled, CSS } from "../../design-system";

const StyledBreadcrumbs = styled("ol", {
  display: "flex",
  alignItems: "center",
  margin: 0,
  padding: 0,
  fontSize: '$1',
  color: "$gray11",
  listStyle: "none",
});

export interface BreadcrumbProps {
  css?: CSS;
  items: { id: number | string, label: string }[];
  onNavigate?: (id: number | string) => void;
}

function Breadcrumbs(props: BreadcrumbProps) {
  const { items, onNavigate } = props;
  const length = items.length;

  const handleNavigate = (id) => {
    onNavigate && onNavigate(id);
  }

  return (
    <StyledBreadcrumbs>
      {
        items.map((item, index) => {
          return (
            <BreadcrumbItem
              key={item.id}
              isCurrent={index === length - 1}
              onClick={() => handleNavigate(item.id)}
            >
              {item.label}
            </BreadcrumbItem>
          );
        })
      }
    </StyledBreadcrumbs>
  );
}

const StyledBreadcrumbItem = styled("li", {
  display: "flex",
  borderRadius: "$1",
  alignItems: "center",
  fontSize: "$1",
  outline: "none",
  cursor: "pointer",
  userSelect: "none",
  color: "$gray10",
  '&[data-current="true"]': {
    color: "$grayA12"
  }
});

const Slash = styled(IconSlash, {
  height: "$3",
  width: "$3",
  margin: "0 $1",
  color: "$gray8"
});

export interface BreadcrumbItemProps extends React.HtmlHTMLAttributes<HTMLLIElement> {
  isCurrent?: boolean;
  children: React.ReactNode;
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
  const { isCurrent, ...rest } = props;
  return (
    <Fragment>
      <StyledBreadcrumbItem {...rest}>
        {rest.children}
      </StyledBreadcrumbItem>
      {!isCurrent && <Slash />}
    </Fragment>
  );
}

export { Breadcrumbs, BreadcrumbItem };
