import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { IconCheck, IconChevronDown, IconSearch, IconX } from '@tabler/icons-react'
import React, { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Badge } from '../Badge'
import { Checkbox } from '../Checkbox'
import { styled } from '../design-system'
import { basicItemStyle } from '../design-system/recipes'
import { Flex } from '../Flex'
import { Popover, PopoverCloseTrigger } from '../Popover'
import { Text } from '../Typography'

const SELECT_ALL_VALUE = '$$SELECT_ALL$$'

const StyledComboboxTrigger = styled('button', {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  width: '100%',
  minHeight: '$6',
  gap: '$1',
  alignItems: 'center',
  padding: '$0_5 $6 $0_5 $0_5',
  borderRadius: '$2',
  boxSizing: 'border-box',
  backgroundColor: '$grayA3',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grayA4',
  },
  variants: {
    size: {
      xs: {},
      sm: {
        height: '$sm',
        borderRadius: '$2',
      },
      md: {
        height: '$md',
        borderRadius: '$4',
        paddingLeft: '$2',
      },
    },
  },
})

const StyledChevronDown = styled(IconChevronDown, {
  height: '14px',
  width: '14px',
  color: '$gray11',
  flexShrink: 0,
  position: 'absolute',
  right: '$1_5',
  top: '50%',
  transform: 'translateY(-50%)',
})

const SearchIcon = styled(IconSearch, {
  height: '14px',
  width: '14px',
  color: '$gray11',
  strokeWidth: 1.5,
  flexShrink: 0,
})

const StyledPlaceholder = styled('span', {
  all: 'unset',
  fontSize: '11px',
  color: '$gray11',
})

const StyledComboboxContent = styled(Flex, {
  padding: '$1',
  minHeight: '60px',
  maxHeight: '300px',
  overflowY: 'auto',
  position: 'relative',
  flex: 1,
  flexWrap: 'nowrap !important',
  '&[data-state="open"]': {
    animation: 'none',
  },
  '&::-webkit-scrollbar': {
    width: '$0_5',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '$grayA5',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '$grayA6',
  },
})

const StyledComboboxSearchInput = styled('input', {
  all: 'unset',
  width: '100%',
  padding: '$1',
  fontSize: '$1',
  color: '$gray11',
  boxSizing: 'border-box',
})

const StyledComboBoxItem = styled('button', basicItemStyle, {
  userSelect: 'none',
  width: '100%',
  flexShrink: 0,
  '&:hover': {
    color: '$blue12',
    backgroundColor: '$blue9',
  },
  variants: {
    focused: {
      true: {
        color: '$blue12',
        backgroundColor: '$blue9',
      },
    },
    selected: {
      true: {
        '&:hover': {
          color: '$blue12',
          backgroundColor: '$blue9',
        },
      },
    },
  },
})

const StyledComboboxHeader = styled(Flex, {
  borderBottom: '1px solid $border',
  padding: '$1 $2',
  flexShrink: 0,
  gap: '$2',
})

const StyledSelectAllWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
  padding: '$1 0',
  cursor: 'pointer',
})

const SelectAllText = styled('span', {
  fontSize: '$1',
  color: '$gray11',
  cursor: 'pointer',
  userSelect: 'none',
})

const StyledComboboxSlot = styled('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: '$gray9',
  transition: 'color 0.2s ease',
  userSelect: 'none',
  padding: '0 $1',
  fontSize: '$1',
})

interface ComboboxContextProps {
  autoClose: boolean
  placeholder?: string
  valueRenderer?: (value: string, location?: 'item' | 'trigger') => React.ReactNode

  value: string[]
  selectValue?: (val: string) => void

  open: boolean
  setOpen: (open: boolean) => void

  focusedIndex?: number
  setFocusedIndex?: (val: number) => void

  close?: () => void

  searchValue?: string
  setSearchValue?: (val: string) => void

  valueNode: any
  onValueNodeChange: (valueNode: any) => void
  maxDisplayCount?: number
  maxDisplayText?: string
  noneText?: string
}

const ComboboxContext = createContext<ComboboxContextProps>({
  autoClose: true,
  value: [],
  open: false,
  setOpen: () => {},

  valueNode: null,
  onValueNodeChange: () => {},
  maxDisplayCount: 0,
  maxDisplayText: '{count} items selected',
  noneText: '',
})

export interface ComboboxTriggerProps {
  placeholder?: string
  children?: React.ReactNode
  valueRenderer?: (value: string) => React.ReactNode
  startSlot?: React.ReactNode
  size?: 'xs' | 'sm' | 'md'
}

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  function ComboboxTrigger(props, forwardedRef) {
    const { value, onValueNodeChange, placeholder, maxDisplayCount, maxDisplayText, noneText } =
      useContext(ComboboxContext)
    const { valueRenderer, startSlot, ...rest } = props

    const valueArray = Array.isArray(value) ? value : value ? [value] : []

    const shouldShowSummary = maxDisplayCount > 0 && valueArray.length > maxDisplayCount
    const shouldShowNoneText = valueArray.length === 0 && noneText

    const summaryText = maxDisplayText.replace('{count}', valueArray.length.toString())

    return (
      <StyledComboboxTrigger {...rest} ref={forwardedRef}>
        {startSlot && <StyledComboboxSlot>{startSlot}</StyledComboboxSlot>}
        <Flex gap="xxs" ref={onValueNodeChange}>
          {shouldShowSummary && (
            <Text size="sm" secondary css={{ padding: '0 $1_5' }}>
              {summaryText}
            </Text>
          )}
          {shouldShowNoneText && (
            <Text size="sm" secondary css={{ padding: '0 $1_5' }}>
              {noneText}
            </Text>
          )}
        </Flex>
        {valueArray.length === 0 && !noneText && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
        <StyledChevronDown />
      </StyledComboboxTrigger>
    )
  }
)

export interface ComboboxSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

function ComboboxSearchInput(props: ComboboxSearchInputProps) {
  const { close, searchValue, setSearchValue, selectValue, focusedIndex, setFocusedIndex } = useContext(ComboboxContext)
  const { onSearch, ...rest } = props

  const handleOnChange = (e) => {
    if (setSearchValue) {
      setSearchValue(e.target.value as string)
    }
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <Flex wrap={false} align="v" style={{ flex: 1 }}>
      <SearchIcon />
      <StyledComboboxSearchInput {...rest} value={searchValue} onChange={handleOnChange} />
      <IconX size="12px" />
    </Flex>
  )
}

export interface ComboboxItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  label?: string
  textValue?: string
  index?: number
  disabled?: boolean
  children: React.ReactNode
}

export function ComboboxItem(props: ComboboxItemProps) {
  const { value, children, index, ...rest } = props
  const {
    value: selectedValue,
    maxDisplayCount,
    focusedIndex,
    selectValue,
    close,
    setFocusedIndex,
    valueRenderer,
    valueNode,
    searchValue,
    autoClose,
  } = useContext(ComboboxContext)
  const selectedValueArray = Array.isArray(selectedValue) ? selectedValue : selectedValue ? [selectedValue] : []
  const isSelected = selectedValue.indexOf(value) !== -1
  const ivVisible = searchValue ? value.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 : true

  const preventDefault = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleRemove = () => {
    if (selectValue) {
      selectValue(value)
    }
  }

  function handleSelect(e) {
    e.preventDefault()
    e.stopPropagation()
    selectValue && selectValue(value)
    autoClose && close && close()
  }

  const shouldCreateBadge =
    isSelected && valueNode && (maxDisplayCount === 0 || selectedValueArray.length <= maxDisplayCount)

  return (
    <>
      {ivVisible && (
        <StyledComboBoxItem
          role="option"
          tabIndex={-1}
          {...rest}
          selected={isSelected}
          onPointerUp={handleSelect}
          focused={focusedIndex === index}>
          {valueRenderer ? valueRenderer(value) : children}
          {isSelected && <IconCheck size="12px" />}
        </StyledComboBoxItem>
      )}
      {shouldCreateBadge
        ? createPortal(
            <Badge onClick={preventDefault} closable onClose={handleRemove}>
              {valueRenderer ? valueRenderer(value, 'trigger') : children}
            </Badge>,
            valueNode
          )
        : null}
    </>
  )
}

export interface ComboboxProps {
  /**
   * indicates if the select is multiple
   */
  multiple?: boolean
  /**
   * The placeholder for the combobox
   */
  placeholder?: string
  /**
   * If true, the combobox will display a search input
   *
   * @default true
   */
  searchable?: boolean

  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void

  children?: React.ReactNode

  onSearch?: (value: string) => void

  valueRenderer?: (value: string) => React.ReactNode

  /**
   * If true, the popover will close when an item is selected
   *
   * @default true
   */
  autoClose?: boolean

  /**
   * Maximum number of selected items to display in the trigger.
   * If more items are selected, a summary badge will be shown instead.
   * Set to 0 or null to always show all selected items.
   *
   * @default 0
   */
  maxDisplayCount?: number

  /**
   * Text to display when more items are selected than maxDisplayCount
   * Use {count} as a placeholder for the number of selected items
   *
   * @default "{count} items selected"
   */
  maxDisplayText?: string

  /**
   * Text to display when no items are selected
   * @default ""
   */
  noneText?: string

  /**
   * Text to display for the select all option
   * @default "Select All"
   */
  selectAllText?: string

  /**
   * If true, the select all option will be shown
   * @default false
   */
  showSelectAll?: boolean

  /**
   * Content to display at the start of the trigger
   */
  startSlot?: React.ReactNode
  size?: 'xs' | 'sm' | 'md'
}

export function Combobox(props: ComboboxProps) {
  const {
    searchable = false,
    multiple = false,
    autoClose = multiple ? false : true,
    children,
    onSearch,
    valueRenderer,
    placeholder,
    maxDisplayCount = 0,
    maxDisplayText = '{count} items selected',
    noneText = '',
    size,
    showSelectAll = false,
    selectAllText = 'Select All',
  } = props
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [valueNode, setValueNode] = React.useState(null)
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const [searchValue, setSearchValue] = React.useState('')

  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue || [],
    onChange: props.onValueChange,
  })

  // Get all available options from children
  const options = React.useMemo(() => {
    const options: string[] = []
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.value) {
        options.push(child.props.value)
      }
    })
    return options
  }, [children])

  const selectValue = (val) => {
    if (!value) return
    if (val === SELECT_ALL_VALUE) {
      // If all options are selected, unselect all
      if (value.length === options.length) {
        setValue([])
      } else {
        // Otherwise select all options
        setValue([...options])
      }
    } else {
      if (value.includes(val)) {
        setValue(value.filter((v) => v !== val))
      } else {
        setValue([...value, val])
      }
    }
  }

  function close() {
    closeRef.current && closeRef.current.click()
  }

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current
      if (content.scrollHeight > content.clientHeight) {
        content.style.overflowY = 'auto'
      }
    }
  }, [children])

  return (
    <ComboboxContext.Provider
      value={{
        value: value!,
        selectValue,
        valueRenderer,

        focusedIndex,
        setFocusedIndex,

        searchValue,
        setSearchValue,

        open,
        setOpen,
        close,

        valueNode,
        onValueNodeChange: setValueNode,
        autoClose,
        placeholder,
        maxDisplayCount,
        maxDisplayText,
        noneText,
      }}>
      <Popover
        compact
        sideOffset={4}
        forceRender
        constrainSize
        css={{
          maxHeight: 'var(--radix-popover-content-available-height)',
          display: 'flex',
          flexDirection: 'column',
        }}
        trigger={<ComboboxTrigger placeholder={placeholder} startSlot={props.startSlot} size={size} />}
        onOpenChange={setOpen}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: 'inherit',
          }}>
          <div style={{ flexShrink: 0 }}>
            {searchable ||
              (options.length > 0 && showSelectAll && (
                <StyledComboboxHeader wrap={false} align="v">
                  {searchable && <ComboboxSearchInput onSearch={onSearch} />}
                  {options.length > 0 && showSelectAll && (
                    <StyledSelectAllWrapper
                      onClick={() => {
                        selectValue(SELECT_ALL_VALUE)
                      }}>
                      <Checkbox
                        checked={value.length === options.length}
                        onCheckedChange={() => {
                          selectValue(SELECT_ALL_VALUE)
                        }}
                      />
                      <SelectAllText>{selectAllText}</SelectAllText>
                    </StyledSelectAllWrapper>
                  )}
                </StyledComboboxHeader>
              ))}
          </div>
          <StyledComboboxContent ref={contentRef} direction="column" role="listbox">
            {children}
          </StyledComboboxContent>
        </div>
        <PopoverCloseTrigger ref={closeRef} style={{ display: 'none' }} />
      </Popover>
    </ComboboxContext.Provider>
  )
}
