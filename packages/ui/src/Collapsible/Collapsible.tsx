import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { IconTriangleInvertedFilled } from "@tabler/icons-react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { styled, StitchesComponent } from "../../design-system";

const StyledContent = styled(CollapsiblePrimitive.Content, {
  borderRadius: "0 0 $2 $2",
  // padding: "0 $1 $2",
  paddingBottom: "$1",
  backgroundColor: "$panelBg",
  "&:empty": {
    padding: 0
  },
  '&[data-state="open"]': {
    // animation: `${slideDown} .1s ease-in-out`
  },
  '&[data-state="closed"]': {
    // animation: `${slideUp} .1s ease-in-out`
  }
});

const StyledTitle = styled("div", {
  display: "flex",
  width: "100%",
  alignItems: "center",
  lineHeight: 1,
  justifyContent: "space-between",
  color: "$grayA11",
  padding: "0 $1 0 $1",
  height: "$7",
  fontSize: "$sm",
  userSelect: "none",
  backgroundColor: "$panelBg",
  variants: {
    border: {
      true: {
        minHeight: "$7",
        backgroundColor: "$grayA3",
        margin: "2px auto",
        border: "1px solid $grayA6",
        borderRadius: "$2"
      }
    }
  }
});

const StyledTitleContent = styled("div", {
  flex: 1
});

const StyledTrigger = styled(CollapsiblePrimitive.Trigger, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$1",
  height: "$5",
  width: "$5",
  cursor: "pointer",
  "&:focus-visible": {
    boxShadow: "0px 0px 0px 2px $colors$gray7"
  }
});

const StyledRoot = styled(CollapsiblePrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  color: "$grayA11",
  background: "$appBg",
  "& ~ &": {
    // borderRadius: "$2"
    [`${StyledTitle}`]: {
      borderRadius: "$2 $2 0 0",
      '&[data-state="closed"]': {
        borderRadius: "$2"
      }
    }
  },
  "&  &": {
    backgroundColor: "$panelBg",
    paddingLeft: "$1",
    [`${StyledTitle}`]: {
      paddingLeft: "$1"
    },
    [`& > ${StyledContent}`]: {
      padding: 0
    }
  },
  variants: {
    subtle: {
      true: {
        backgroundColor: "$appBg",
        borderRadius: "6px",
        border: "1px solid $gray6",
        [`& > ${StyledTitle}`]: {
          height: "$7"
        },
        [`& > ${StyledContent}`]: {
          backgroundColor: "$gray1",
          borderRadius: "6px",
          padding: "$1 $2 $1"
        },
        [`&[data-state=open] > ${StyledTitle}`]: {
          borderBottom: "1px solid $gray6"
        }
      }
    },
    transparent: {
      true: {
        backgroundColor: "transparent",
        [`& > ${StyledTitle}`]: {
          backgroundColor: "transparent"
        },
        [`& > ${StyledContent}`]: {
          backgroundColor: "transparent"
        }
      }
    },
    nesting: {
      true: {
        borderBottom: "none",
        [`& > ${StyledTitle} > svg`]: {
          display: "none"
        }
      }
    }
  }
});

const StyledChevron = styled(IconTriangleInvertedFilled, {
  marginRight: "$1",
  height: "6px",
  width: "6px",
  transform: "rotate(-90deg)",
  variants: {
    open: {
      true: {
        transform: "rotate(0)"
      }
    }
  }
});

type ICollapsiableProps = Omit<StitchesComponent<typeof StyledRoot>, "title"> & {
  title: any;
  triggerTitle?: boolean;
  collapsible?: boolean;
};

function Collapsible(props: ICollapsiableProps) {
  const { children, title, collapsible = true, triggerTitle = true, ...rest } = props;

  const [open, setOpen] = useControllableState({
    prop: props.open,
    onChange: props.onOpenChange,
    defaultProp: props.defaultOpen
  });

  const handleOnOpenChange = (open) => {
    if (!collapsible) return;
    setOpen(open);
    if (props.onOpenChange) {
      props.onOpenChange(open);
    }
  };

  return (
    <StyledRoot {...rest} open={open} onOpenChange={handleOnOpenChange} disabled={!collapsible}>
      {triggerTitle ? (
        <CollapsiblePrimitive.Trigger asChild disabled={!collapsible}>
          <StyledTitle>
            {collapsible && <StyledChevron open={open} />}
            <StyledTitleContent>{title}</StyledTitleContent>
          </StyledTitle>
        </CollapsiblePrimitive.Trigger>
      ) : (
        <StyledTitle>
          {collapsible && (
            <StyledTrigger disabled={!collapsible}>
              <StyledChevron open={open} />
            </StyledTrigger>
          )}
          <StyledTitleContent>{title}</StyledTitleContent>
        </StyledTitle>
      )}
      <StyledContent>{children}</StyledContent>
    </StyledRoot>
  );
}

export { Collapsible };
