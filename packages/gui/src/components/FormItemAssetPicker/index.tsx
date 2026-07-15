import React, { ForwardedRef, useCallback, useState } from 'react'
import { IconChevronDown, IconCurrentLocation, IconFileFilled, IconUnlink } from '@tabler/icons-react'

import { BasicAssetType, AssetPickerPopoverProps } from './AssetPickerPopover'
import { AssetPickerContent } from './AssetPickerContent'

import { FormItem, extractFormItemProps } from '../FormItem'
import { ActionButton, Button, styled, Popover, PopoverCloseTrigger, useDrop } from '@galacean/editor-ui'
import { BaseFormItemProps } from '../FormItem/FormItem'

const PreviewFallbackIcon = styled(IconFileFilled, {
  flexShrink: 0,
})

const SelectedAssetPreview = styled('div', {
  width: '64px',
  height: '64px',
  borderRadius: '$1',
  flexShrink: 0,
  backgroundColor: '$softBg',
  border: '1px solid $gray5',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$gray11',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
})

const TextureAssetControl = styled('div', {
  width: '100%',
  minHeight: '68px',
  color: '$gray10',
  display: 'flex',
  alignItems: 'center',
  gap: '$1_5',
  outline: 'none',
  variants: {
    isDraggingOver: {
      true: {
        color: '$blue12',
        outline: '2px solid $colors$blue10',
        outlineOffset: '2px',
      },
    },
  },
})

const TextureAssetControls = styled('div', {
  minWidth: 0,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
})

const TextureAssetNamePopover = styled('div', {
  minWidth: 0,
  flex: 1,
})

const TextureAssetName = styled('button', {
  appearance: 'none',
  border: 0,
  minWidth: 0,
  width: '100%',
  height: '$sm',
  padding: '0 $2',
  borderRadius: '$sm',
  backgroundColor: '$softBg',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: '$sm',
  fontWeight: 500,
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$1',
  cursor: 'pointer',
  transition: '$backgroundColor, $color',
  '&:hover': {
    backgroundColor: '$softBgHover',
    color: '$textStrong',
  },
  '&:disabled': {
    backgroundColor: '$softBg',
    color: '$textMuted',
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: '$softBg',
      color: '$textMuted',
    },
  },
})

const TextureAssetActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
})

const TextureAssetNameText = styled('span', {
  minWidth: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 2,
})

const StyledTriggerButton = styled(Button, {
  width: '100%',
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

function stripImageExtension(name: string) {
  return name.replace(/\.(png|jpe?g|webp|hdr)$/i, '')
}

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
  const hasSelectedAsset = !!value
  const assetType = asset?.getMetaConfig?.().type
  const useLargePreview = hasSelectedAsset && ['Texture', 'Texture2D', 'TextureCube'].includes(assetType)
  const selectedThumbnail = useLargePreview ? asset?.thumbnailUrl : undefined
  const textureDisplayName = useLargePreview ? stripImageExtension(value) : value

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

  if (useLargePreview) {
    return (
      <FormItem {...extractFormItemProps(props)} fieldColumn="assetPreview">
        <TextureAssetControl ref={dropRef as any} isDraggingOver={isDraggingOver}>
          <SelectedAssetPreview>
            {selectedThumbnail ? <img src={selectedThumbnail} alt="" /> : <PreviewFallbackIcon size="24px" />}
          </SelectedAssetPreview>
          <TextureAssetControls>
            <TextureAssetNamePopover>
              <Popover
                compact
                disabled={disabled}
                sideOffset={6}
                trigger={
                  <TextureAssetName id={label} disabled={disabled}>
                    <TextureAssetNameText>{textureDisplayName}</TextureAssetNameText>
                    <IconChevronDown size="14px" />
                  </TextureAssetName>
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
            </TextureAssetNamePopover>
            <TextureAssetActions>
              <ActionButton size="sm" disabled={!value} onClick={handleLocate} variant="soft">
                <IconCurrentLocation />
              </ActionButton>
              <ActionButton size="sm" disabled={actionDisabled || !onDelete} onClick={onDelete} variant="soft">
                <IconUnlink />
              </ActionButton>
            </TextureAssetActions>
          </TextureAssetControls>
        </TextureAssetControl>
      </FormItem>
    )
  }

  const trigger = (
    <StyledTriggerButton
      ref={dropRef as any}
      size="sm"
      id={label}
      disabled={disabled}
      variant="soft"
      isDraggingOver={isDraggingOver}
      css={{
        justifyContent: 'initial',
      }}>
      <PreviewFallbackIcon size="14px" />
      <Placeholder>{value ? value : placeholder}</Placeholder>
    </StyledTriggerButton>
  )

  return (
    <FormItem {...extractFormItemProps(props)} fieldColumn="asset">
      <Popover compact disabled={disabled} sideOffset={6} trigger={trigger} onOpenChange={onOpenChange}>
        <AssetPickerContent
          assets={assets}
          selectedAssetId={asset?.id}
          onSelect={onSelect}
          customFilter={customFilter}
          groupBy={groupBy}
        />
      </Popover>
      <ActionButton size="sm" disabled={!value} onClick={handleLocate} variant="soft">
        <IconCurrentLocation />
      </ActionButton>
      <ActionButton size="sm" disabled={actionDisabled || !onDelete} onClick={onDelete} variant="soft">
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
