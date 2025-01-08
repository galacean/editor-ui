import React, { useEffect, useRef, useState } from 'react'
import { IconChevronRight, IconChevronDown } from '@tabler/icons-react'

import { styled } from '../design-system'
import { Flex } from '../Flex'
import { Text } from '../Typography'

export const TreeGroup = styled('div', {
  borderRadius: '$2',
})

// TreeItemPreview is used for the preview of the tree item during drag and drop operation.
export const TreeItemPreview = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$1',
  height: '$6',
  fontSize: '$1',
  padding: '$2',
  borderRadius: '$round',
  backgroundColor: '$blueA10',
  color: '$white',
})

const TreeItemName = styled(Flex, {
  height: '100%',
  flex: 1,
  minWidth: 0,
  userSelect: 'none',
})

const TreeItemContentRoot = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '$6',
  fontSize: '$1',
  boxSizing: 'border-box',
  padding: '0 $1',
  borderRadius: '$2',
  gap: '$1',
  '&:hover': {
    boxShadow: '0 0 0 1px var(--colors-blue11)',
  },
  // borderRadius: '$2',
  variants: {
    selected: {
      true: {
        color: '$white',
        backgroundColor: '$blue10',
        borderRadius: 0,
      },
    },
    isActive: {
      false: {
        color: '$gray9',
      },
    },
  },
  compoundVariants: [
    {
      selected: true,
      isActive: false,
      css: {
        color: '$gray11',
      },
    },
  ],
})

// TreeItemRenameInput is used for renaming the tree item.
const TreeItemRenameInput = styled('input', {
  all: 'unset',
  width: '100%',
  fontWeight: 'inherit',
  height: '$5',
  outline: 'none',
  border: 'none',
  borderRadius: '$1',
  padding: '$1_5 0 $1_5 $1',
  fontSize: '$sm',
  backgroundColor: '$white',
  color: 'black',
  boxSizing: 'border-box',
})

/**
 * TreeItemRoot is the root element of the TreeItem component.
 * A basic structure of a TreeItem is as follows:
 * <TreeItemRoot>
 *  <InsertionIndicator />
 *  <TreeItemContent startSlot={<TreeItemIcon />} endSlot={<Button />} />
 *  <TreeGroup>
 *    <TreeItemRoot />
 *  </TreeGroup>
 *  <InsertionIndicator />
 *  <TreeItemDragPreview />
 * <TreeItemRoot />
 */
export const TreeItemRoot = styled('div', {
  position: 'relative',
  borderRadius: '0',
  color: '$gray11',
  fontWeight: 300,
  '&:hover': {
    backgroundColor: '$grayA2',
  },
  '&:focus-visible': {
    outline: 'none',
  },
  ['&[data-selected="true"]']: {
    // backgroundColor: "$blue10",
  },
  [`&[data-drop-target="true"] > ${TreeItemContentRoot}`]: {
    color: '$gray12',
    backgroundColor: '$grayA4',
    borderRadius: '$2',
  },
  variants: {
    isSelected: {
      true: {
        color: '$white',
        borderRadius: '$2',
        boxShadow: '0 0 0 1px var(--colors-blueA11)',
        overflow: 'hidden',
        [`& > ${TreeGroup}`]: {
          backgroundColor: '$blue3',
        },
      },
    },
    noTopRadius: {
      true: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
    noBottomRadius: {
      true: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },
})

interface TreeItemContentProps {
  id: string
  name: string
  isActive?: boolean
  prefabRemoved?: boolean
  renamable?: boolean
  level: number
  isExpandable: boolean
  isExpanded: boolean
  isSelected: boolean
  onSelect: (id: string) => void
  onExpand: (id: string) => void
  startSlot?: React.ReactNode
  endSlot?: React.ReactNode
  onRename?: (id: string, name: string) => void
}

export function TreeItemContent(props: TreeItemContentProps) {
  const input = useRef<HTMLInputElement>()
  const {
    id,
    name: propName,
    prefabRemoved,
    level,
    isExpandable,
    isExpanded,
    isSelected,
    onSelect,
    onExpand,
    startSlot,
    endSlot,
    isActive,
    onRename,
    renamable = true,
  } = props
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(propName)

  const toggleExpandEntity = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onExpand(id)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    onSelect(id)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    if (e.key === 'Enter') {
      setEditing(false)
      if (onRename) {
        onRename(id, name)
      }
    }
    if (e.key === 'Escape') {
      setEditing(false)
      setName(propName)
    }
  }

  const handleInputChange = (e) => {
    setName(e.target.value)
  }

  const handleInputBlur = (e) => {
    e.stopPropagation()
    setEditing(false)
    if (onRename) {
      onRename(id, name)
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (renamable) {
      setEditing(true)
    }
  }

  useEffect(() => {
    if (editing) {
      input.current?.focus()
      input.current?.select()
    }
  }, [editing])

  useEffect(() => {
    setName(propName)
  }, [propName])

  return (
    <TreeItemContentRoot
      style={{ paddingLeft: `${(isExpandable ? 0 : 16) + 6 + level * 6}px` }}
      onContextMenu={handleContextMenu}
      selected={isSelected}
      isActive={isActive}>
      {isExpandable && (
        <>
          {isExpanded ? (
            <IconChevronDown size="12px" onClick={toggleExpandEntity} />
          ) : (
            <IconChevronRight size="12px" onClick={toggleExpandEntity} />
          )}
        </>
      )}
      {startSlot}
      <TreeItemName align="v" onDoubleClick={handleDoubleClick}>
        {renamable && editing ? (
          <TreeItemRenameInput
            type="text"
            ref={input}
            value={name}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
          />
        ) : (
          <Text size="sm" ellipsis deleted={prefabRemoved}>
            {name}
          </Text>
        )}
      </TreeItemName>
      {endSlot}
    </TreeItemContentRoot>
  )
}

type IconPolicy<T> = {
  icon: JSX.Element
  policy: (item?: T) => boolean
  color?: string
}[]

interface TreeItemIconProps<T> {
  item: T
  selected: boolean
  policy?: IconPolicy<T>
}

export function TreeItemIcon<T = any>(props: TreeItemIconProps<T>) {
  const { item, selected, policy } = props
  const { icon, color } = policy.find(({ policy }) => policy(item)) || policy[policy.length - 1]
  return React.cloneElement(icon, { color: selected ? 'CurrentColor' : color })
}
