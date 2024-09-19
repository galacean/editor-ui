import React, { ForwardedRef, useCallback } from "react";
import { IconCurrentLocation, IconFileFilled } from "@tabler/icons-react";

import { BasicAssetType, AssetPickerPopoverProps } from "./AssetPickerPopover";
import { AssetPickerContent } from "./AssetPickerContent";

import { FormItem } from "../FormItem";
import { ActionButton ,Button, styled, Popover, PopoverCloseTrigger, useDrop } from '@galacean/editor-ui'
import { BaseFormItemProps } from "../FormItem/FormItem";

function UnlinkIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
      <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
      <line x1="16" y1="21" x2="16" y2="19" />
      <line x1="19" y1="16" x2="21" y2="16" />
      <line x1="3" y1="8" x2="5" y2="8" />
      <line x1="8" y1="3" x2="8" y2="5" />
    </svg>
  );
}

const StyledIconFile = styled(IconFileFilled, {
  marginLeft: "-$1",
  flexShrink: 0
});

export interface FormItemAssetPickerProps<T extends BasicAssetType> extends AssetPickerPopoverProps<T>, BaseFormItemProps<string> {
  onDelete?: () => void;
  onLocate?: (value: string) => void;
  placeholder?: string;
  onOpenChange?: (isOpen?: boolean) => void;
  dropLayer: number;
}

const Placeholder = styled("span", {
  paddingLeft: "$1",
  whiteSpace: "nowrap",
  overflow: "hidden",
  lineHeight: 2
});

function _FormItemAssetPicker<T extends BasicAssetType>(props: FormItemAssetPickerProps<T>, ref) {
  const {
    label,
    info,
    disabled,
    value,
    onDelete,
    onLocate,
    onOpenChange,
    placeholder,
    dropLayer,
    onSelect,
    assets,
    asset,
  } = props;

  const actionDisabled = !!(disabled || !value);

  const dropRef = useDrop({
    accept: dropLayer,
    onDrop(_, item: any, dropElement) {
      onSelect(item);
      dropElement.blur();
    },
    onEnter(_, __, dropElement) {
      dropElement.focus();
    },
    onLeave(_, __, dropElement) {
      dropElement.blur();
    }
  });

  const handleLocate = useCallback(
    function handleLocate() {
      onLocate && onLocate(value);
    },
    [value]
  );

  return (
    <FormItem label={label} info={info} fieldColumn="asset">
      <Popover
        compact
        disabled={disabled}
        sideOffset={6}
        trigger={
          <Button
            ref={dropRef as any}
            size="sm"
            id={label}
            disabled={disabled}
            variant="secondary"
            css={{ justifyContent: "initial" }}
          >
            <StyledIconFile size="14px" />
            <Placeholder>{value ? value : placeholder}</Placeholder>
          </Button>
        }
        onOpenChange={onOpenChange}
      >
        <AssetPickerContent assets={assets} selectedAssetId={asset?.id} onSelect={onSelect} />
      </Popover>
      <ActionButton size="sm" disabled={!value} onClick={handleLocate} variant="secondary">
        <IconCurrentLocation />
      </ActionButton>
      <ActionButton size="sm" disabled={actionDisabled || !onDelete} onClick={onDelete} variant="secondary">
        <UnlinkIcon />
      </ActionButton>
    </FormItem>
  );
}

export const FormItemAssetPicker = React.forwardRef(_FormItemAssetPicker) as <T extends BasicAssetType>(
  props: FormItemAssetPickerProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof _FormItemAssetPicker>;

export { PickableAssetItem } from "./PickableAssetItem";
