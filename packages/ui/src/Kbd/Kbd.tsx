import { IconHandFinger, IconHandTwoFingers } from "@tabler/icons-react";

import { MouseRightDownIcon } from "../Icons/MouseRightDownIcon";
import { MouseLeftDownIcon } from "../Icons/MouseLeftDownIcon";
import { MouseDoubleDownIcon } from "../Icons/MouseDoubleDownIcon";
import { styled } from "../../design-system";

const symbolsMap = {
  backspace: "⌫",
  delete: "Del",
  cmd: "⌘",
  alt: "⌥",
  option: "⌥",
  enter: "↩",
  ctrl: "⌃",
  shift: "⇧",
  tab: "⇥",
  capslock: "⇪",
};

const gastureList = ["OF", "TF", "MLD", "MRD", "MDD"];
const gastureMap = {
  OF: (
    <IconHandFinger
      width="16px"
      height="18px"
      stroke="var(colors-gray8)"
      strokeWidth={1.2}
      fill="var(colors-grayA2)"
      style={{ marginLeft: "2px" }}
    />
  ),
  TF: (
    <IconHandTwoFingers
      width="16px"
      height="18px"
      stroke="var(colors-gray8)"
      strokeWidth={1.2}
      fill="var(colors-grayA2)"
      style={{ marginLeft: "2px" }}
    />
  ),
  MLD: (
    <MouseLeftDownIcon
      width="18px"
      height="18px"
      stroke="var(colors-gray8)"
      fill="var(colors-gray8)"
      strokeWidth={1.2}
    />
  ),
  MRD: (
    <MouseRightDownIcon
      width="18px"
      height="18px"
      stroke="var(colors-gray8)"
      fill="var(colors-gray8)"
      strokeWidth={1.2}
    />
  ),
  MDD: (
    <MouseDoubleDownIcon
      width="18px"
      height="18px"
      stroke="var(colors-gray8)"
      fill="var(colors-gray8)"
      strokeWidth={1.2}
    />
  )
};

const IconSlot = styled("span", {
  display: "inline-block",
  marginLeft: "-1",
  height: "18px",
  width: "18px",
  variants: {
    half: {
      true: {
        marginLeft: "-0_5"
      }
    }
  }
});

const StyledKbd = styled("kbd", {
  display: "inline-block",
  background: "$gray3",
  fontSize: "10px",
  minWidth: "$3",
  height: "$4",
  lineHeight: "14px",
  borderRadius: "$2",
  backgroundColor: "$grayA2",
  border: "1px solid $grayA4",
  padding: "0 $1",
  marginRight: "$1",
  color: "currentColor",
  userSelect: "none",
  variants: {
    size: {
      xs: {
        minWidth: "$3",
        height: "$3",
        fontSize: "10px",
        borderRadius: '$1',
      },
      sm: {
        minWidth: "$4",
        height: "$4"
      }
    },
    uppercase: {
      true: {
        textTransform: "uppercase"
      }
    },
    lowercase: {
      true: {
        textTransform: "lowercase"
      }
    }
  },
  defaultVariants: {
    uppercase: true
  }
});

export const StyledKbdGroup = styled("div", {
  display: "inline-flex",
  alignItems: "center",
  "& > kbd:last-child": {
    marginRight: 0
  }
});

export const Kbd = StyledKbd;

type IKbdGroupProps = {
  shortcuts?: string | string[];
  uppercase?: boolean;
};

export function KbdGroup(props: IKbdGroupProps) {
  const { shortcuts, uppercase = true } = props;
  if (!shortcuts) return null;

  if (Array.isArray(shortcuts)) {
    return (
      <StyledKbdGroup>
        {shortcuts.map((key, index) => {
          if (gastureList.indexOf(key) !== -1) {
            return <IconSlot key={index}>{gastureMap[key]}</IconSlot>;
          }
          return (
            <Kbd uppercase={uppercase} key={index}>
              {symbolsMap[key] ?? key}
            </Kbd>
          );
        })}
      </StyledKbdGroup>
    );
  }

  const keys: string[] = shortcuts.split(/[,+]/).map((k) => symbolsMap[k] ?? k);

  return (
    <StyledKbdGroup>
      {keys.map((key, index) => {
        return (
          <Kbd uppercase={uppercase} key={index}>
            {key}
          </Kbd>
        );
      })}
    </StyledKbdGroup>
  );
}
