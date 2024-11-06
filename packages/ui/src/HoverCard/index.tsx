import { PropsWithChildren } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

type HoverCardProps = {
  children: any;
  content?;
};

const HoverCard = (props: PropsWithChildren<HoverCardProps>) => {
  const {
    children,
    content
  } = props;

  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger>{children}</HoverCardPrimitive.Trigger>
      {content}
    </HoverCardPrimitive.Root>
  );
};

export { HoverCard };