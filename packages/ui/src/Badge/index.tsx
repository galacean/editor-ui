import React, { forwardRef, useEffect, useState, useCallback, PropsWithChildren } from "react";
import { IconX } from "@tabler/icons-react";

import { styled, StitchesComponent } from "../../design-system";

const StyledCloseButton = styled("div", {
  height: "$3",
  width: "$3",
  lineHeight: "14px",
  borderRadius: "$round",
  textAlign: "center",
  color: "currentColor",
  cursor: "pointer",
  marginRight: "-$0_5",
  "&:hover": {
    backgroundColor: "$grayA6",
    color: "$gray12"
  },
  variants: {
    pill: {
      true: {
        borderRadius: "$round"
      }
    }
  }
});

const StyledBadge = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "4px",
  height: "fit-content",
  lineHeight: '16px',
  userSelect: "none",
  whiteSpace: "nowrap",
  fontWeight: 500,
  gap: "$1",
  fontSize: "$sm",
  padding: '$0_5 $2',
  variants: {
    pill: {
      true: {
        borderRadius: "$round",
      }
    },
    active: {
      true: {
        backgroundColor: "$blue10",
        color: "white"
      }
    },
    dot: {
      true: {
        height: "$2",
        width: "$2",
        borderRadius: "$round",
        padding: 0
      }
    },
    code: {
      true: {
        fontFamily: "$mono",
      }
    },
    status: {
      idle: {
        color: "$grayA11",
        backgroundColor: "$grayA4"
      },
      success: {
        color: "$greenA11",
        backgroundColor: "$greenA3"
      },
      failed: {
        color: "$redA11",
        backgroundColor: "$redA3"
      },
      info: {
        color: "$blueA11",
        backgroundColor: "$blueA3"
      },
      warning: {
        color: "$orange11",
        backgroundColor: "$orangeA3"
      },
      vip: {
        color: "$goldA11",
        backgroundColor: "$gold5"
      }
    }
  },
  defaultVariants: {
    status: "idle"
  },
});

type BadgeCloseButtonProps = React.ComponentProps<typeof StyledCloseButton>;

function BadgeCloseButton(props: BadgeCloseButtonProps) {
  return (
    <StyledCloseButton {...props}>
      <IconX size="10px" />
    </StyledCloseButton>
  );
}

export type BadgeProps = PropsWithChildren<
  Omit<StitchesComponent<typeof StyledBadge>, "dot"> & {
    closeable?: boolean;
    onClose?: (e) => void;
  }
>;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { closeable = false, onClose, children, ...rest },
  ref
) {
  const [closed, setClosed] = useState(false);

  const handleClose = useCallback(
    (e) => {
      setClosed(true);
      if (onClose) {
        onClose(e);
      }
    },
    [onClose]
  );

  if (closed) {
    return null;
  }

  return (
    <StyledBadge ref={ref} {...rest}>
      {children}
      {closeable && <BadgeCloseButton onClick={handleClose} pill={rest.pill} />}
    </StyledBadge>
  );
});

export { Badge };
