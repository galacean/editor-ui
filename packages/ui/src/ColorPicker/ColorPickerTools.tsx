import { useState, useCallback } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { colord } from "colord";
import { styled } from "../../design-system";

import { type Color } from "./helper";
import { useEyeDropper } from "../../hooks/useEyeDropper";

import { Flex } from "../Flex";
import { ActionButton } from "../ActionButton";
import { EyeDropperIcon } from "../Icons";

const StyledColorPickerTools = styled(Flex, {
  position: "absolute",
  top: "152px",
  right: 0,
  variants: {
    readonly: {
      true: {
        pointerEvents: "none",
        opacity: 0.5
      }
    }
  }
});

const StyledColorPreview = styled("div", {
  position: "relative",
  height: "30px",
  width: "30px",
  borderRadius: "$round",
  overflow: "hidden",
  background: "repeating-conic-gradient(#ebebeb 0 25%,#fff 0 50%) 50%/12px 12px",
  cursor: "pointer",
  "&:hover": {
    "& > svg": {
      visibility: "visible"
    }
  },
  "& > div": {
    width: "100%",
    height: "100%"
  },
  "& > svg": {
    visibility: "hidden",
    position: "absolute",
    color: "$white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "$4",
    height: "$4"
  }
});

interface ColorPickerToolsProps {
  color: Color;
  onPickColor?: (color: Color) => void;
  onCopyColor?: () => void;
  readonly: boolean;
}

export function ColorPickerTools(props: ColorPickerToolsProps) {
  const { color, onPickColor, onCopyColor, readonly } = props;
  const { open, isSupported } = useEyeDropper();
  const colorStr = colord(color).toRgbString();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(
    function copyToClipboard() {
      navigator.clipboard.writeText(colorStr);
      setCopied(true);
      onCopyColor && onCopyColor();
    },
    [color, onCopyColor]
  );

  // useEyeDropper will reject/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = useCallback(() => {
    // Using async/await (can be used as a promise as-well)
    const openPicker = async () => {
      try {
        const color = await open();
        const dcolor = colord(color.sRGBHex).toRgb();
        if(onPickColor) {
          onPickColor(dcolor);
        }
      } catch (e) {
        console.warn(e);
      }
    };
    openPicker();
  }, [open]);

  return (
    <StyledColorPickerTools align="v" gap="sm" readonly={readonly}>
      {isSupported() && (
        <ActionButton size="md" variant="subtle" onClick={pickColor}>
          <EyeDropperIcon />
        </ActionButton>
      )}
      <StyledColorPreview onClick={copyToClipboard} onMouseLeave={() => setCopied(false)}>
        <div style={{ background: colorStr }} />
        {copied ? <IconCheck size="10px" /> : <IconCopy size="10px" />}
      </StyledColorPreview>
    </StyledColorPickerTools>
  );
}
