import React from "react";

// import { toast, EditableText } from "../";
import { styled } from "@galacean/design-system";
import { EditableText } from './EditableText'

export const StyledAssetName = styled("div", {
  maxWidth: "100%",
  lineHeight: "14px",
  minHeight: "$5",
  padding: "0 $1_5",
  flexShrink: 0,
  whiteSpace: "break-word",
  overflowWrap: "break-word",
  fontSize: "$sm",
  textAlign: "center",
  borderRadius: "$2",
  cursor: "default",
  userSelect: "none",
  backgroundColor: "transparent",
  color: "$gray11",
  variants: {
    isSelected: {
      true: {
        height: "$5",
        lineHeight: "19px",
        borderRadius: "$2",
        backgroundColor: "$blueA10",
        color: "$white",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    },
    ellipsis: {
      false: {
        lineHeight: "20px",
        textAlign: "left"
      }
    },
    editing: {
      true: {
        padding: 0,
        outline: "1px solid $blueA10"
      }
    }
  },
  defaultVariants: {
    ellipsis: false
  }
});

export interface AssetNameProps {
  name: string;
  isSelected?: boolean;
  readonly?: boolean;
  ellipsis?: boolean;
  onRename?: (name: string) => Promise<void>;
}

export const AssetName = function AssetName(props: AssetNameProps) {
  const { readonly, ellipsis = false, onRename, name, isSelected } = props;
  const [editing, setEditing] = React.useState(false);

  const rename = async (nm: string) => {
    setEditing(false);
    if (nm === name) return;
    return await onRename(nm);
  };

  return (
    <StyledAssetName isSelected={isSelected} editing={editing} ellipsis={ellipsis}>
      {readonly || !isSelected ? (
        name
      ) : (
        <EditableText css={{ color: "$white" }} value={name} onBlur={rename} onEdit={() => setEditing(true)} />
      )}
    </StyledAssetName>
  );
};

export default AssetName;
