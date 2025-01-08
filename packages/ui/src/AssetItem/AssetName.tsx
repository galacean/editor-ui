import React, { useEffect, useRef, useState } from 'react'
import { styled } from '../design-system'

export const StyledAssetNameRoot = styled('div', {
  fontSize: '$sm',
  whiteSpace: 'break-word',
  minHeight: '$5',
  flexShrink: 0,
  overflowWrap: 'break-word',
  textAlign: 'center',
  maxWidth: '100%',
  cursor: 'default',
  userSelect: 'none',
  backgroundColor: 'transparent',
  borderRadius: '$2',
})

const AssetNameDisplay = styled('span', {
  display: 'block',
  height: '$5',
  color: '$gray11',
  padding: '0 $1_5',
  variants: {
    selected: {
      true: {
        height: '$5',
        lineHeight: '19px',
        borderRadius: '$2',
        backgroundColor: '$blueA10',
        color: '$white',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    editing: {
      true: {
        padding: 0,
        outline: '1px solid $blueA10',
      },
    },
  },
})

const AssetNameInput = styled('input', {
  all: 'unset',
  display: 'none',
  backgroundColor: 'transparent',
  fontSize: '$1',
  color: '$gray11',
  lineHeight: '14px',
  minHeight: '$5',
  flexShrink: 0,
  overflowWrap: 'break-word',
  textAlign: 'center',
  padding: '0 $1_5',
  width: '100%',
  maxWidth: '100%',
  userSelect: 'none',
  borderRadius: '$2',
  '&:focus': {
    boxShadow: '0 0 0 1px $colors$blueA10',
  },
  variants: {
    editing: {
      true: {
        display: 'block',
        boxSizing: 'border-box',
      },
    },
    renaming: {
      true: {
        display: 'block',
        userSelect: 'none',
        pointerEvents: 'none',
        backgroundColor: '$grayA3',
        color: '$gray9',
        boxShadow: 'none',
      },
    },
  },
})

export interface AssetNameProps {
  name: string
  selected?: boolean
  readOnly?: boolean
  onRename?: (name: string) => Promise<void>
}

export const AssetName = function AssetName(props: AssetNameProps) {
  const { selected, readOnly, onRename } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [name, setName] = useState(props.name)

  useEffect(() => {
    setName(props.name)
  }, [props.name])

  function handleDoubleClick(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    if (readOnly || !selected) return
    setEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleOnKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  async function handleOnBlur() {
    if (!name) {
      setName(props.name)
      return
    }
    if (!onRename) {
      setEditing(false)
      setName(props.name)
      return
    }
    if (name !== props.name) {
      setRenaming(true)
      try {
        await onRename?.(name)
        setName(name)
      } catch (error) {
        console.warn(error)
      }
      setRenaming(false)
      setEditing(false)
      return
    }
    setEditing(false)
    setName(props.name)
  }

  return (
    <StyledAssetNameRoot onDoubleClickCapture={handleDoubleClick}>
      {!editing && <AssetNameDisplay selected={selected}>{name}</AssetNameDisplay>}
      <AssetNameInput
        readOnly={readOnly}
        value={name}
        editing={editing}
        renaming={renaming}
        ref={inputRef}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
      />
    </StyledAssetNameRoot>
  )
}

export default AssetName
