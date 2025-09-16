import React, { ForwardedRef, useCallback, useState } from 'react'
import { IconCurrentLocation, IconFileFilled, IconUnlink } from '@tabler/icons-react'

import { BasicAssetType, AssetPickerPopoverProps } from './AssetPickerPopover'
import { AssetPickerContent } from './AssetPickerContent'

import { FormItem, extractFormItemProps } from '../FormItem'
import { ActionButton, Button, styled, Popover, PopoverCloseTrigger, useDrop } from '@galacean/editor-ui'
import { BaseFormItemProps } from '../FormItem/FormItem'

const StyledIconFile = styled(IconFileFilled, {
  marginLeft: '-$1',
  flexShrink: 0,
})

export interface FormItemAssetPickerProps<T extends BasicAssetType>
  extends AssetPickerPopoverProps<T>,
    BaseFormItemProps<string> {
  onDelete?: () => void
  onLocate?: (value: string) => void
  placeholder?: string
  onOpenChange?: (isOpen?: boolean) => void
  dropLayer: number
  onSelect?: (asset: T) => void
  customFilter?: (asset: T) => boolean
  groupBy?: (asset: T) => string
}

const Placeholder = styled('span', {
  paddingLeft: '$1',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  lineHeight: 2,
})

const StyledTriggerButton = styled(Button, {
  variants: {
    isDraggingOver: {
      true: {
        color: '$blue12',
        outline: '2px solid $colors$blue10',
        backgroundColor: '$blueA4',
      },
    },
  },
})

function _FormItemAssetPicker<T extends BasicAssetType>(props: FormItemAssetPickerProps<T>, ref) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const {
    label,
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
    customFilter,
    groupBy,
  } = props

  const actionDisabled = !!(disabled || !value)

  const dropRef = useDrop({
    accept: dropLayer,
    onDrop(_, item: any, dropElement) {
      setIsDraggingOver(false)
      onSelect(item)
      dropElement.blur()
    },
    onEnter(_, __, dropElement) {
      setIsDraggingOver(true)
      dropElement.focus()
    },
    onLeave(_, __, dropElement) {
      setIsDraggingOver(false)
      dropElement.blur()
    },
  })

  const handleLocate = useCallback(
    function handleLocate() {
      onLocate && onLocate(value)
    },
    [value]
  )

  return (
    <FormItem {...extractFormItemProps(props)} fieldColumn="asset">
      <Popover
        compact
        disabled={disabled}
        sideOffset={6}
        trigger={
          <StyledTriggerButton
            ref={dropRef as any}
            size="sm"
            id={label}
            disabled={disabled}
            variant="secondary"
            isDraggingOver={isDraggingOver}
            css={{
              justifyContent: 'initial',
            }}>
            <StyledIconFile size="14px" />
            <Placeholder>{value ? value : placeholder}</Placeholder>
          </StyledTriggerButton>
        }
        onOpenChange={onOpenChange}>
        <AssetPickerContent
          assets={assets}
          selectedAssetId={asset?.id}
          onSelect={onSelect}
          customFilter={customFilter}
          groupBy={groupBy}
        />
      </Popover>
      <ActionButton size="sm" disabled={!value} onClick={handleLocate} variant="secondary">
        <IconCurrentLocation />
      </ActionButton>
      <ActionButton size="sm" disabled={actionDisabled || !onDelete} onClick={onDelete} variant="secondary">
        <IconUnlink />
      </ActionButton>
    </FormItem>
  )
}

export const FormItemAssetPicker = React.forwardRef(_FormItemAssetPicker) as <T extends BasicAssetType>(
  props: FormItemAssetPickerProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof _FormItemAssetPicker>

export { PickableAssetItem } from './PickableAssetItem'
export { type BasicAssetType, type AssetPickerPopoverProps } from './AssetPickerPopover'
