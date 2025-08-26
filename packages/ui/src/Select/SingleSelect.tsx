import type {
  SelectGroupProps as PrimitiveSelectGroupProps,
  SelectProps as PrimitiveSelectProps,
  SelectContentProps,
} from '@radix-ui/react-select'
import * as SelectPrimitive from '@radix-ui/react-select'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { IconCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import React, { forwardRef } from 'react'

import { CSS, styled } from '../design-system'
import { checkboxItemStyle, indicatorStyle, labelStyle } from '../design-system/recipes'
import { IconRightBottomCorner } from '../Icons'

const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 $1_5 0 $2',
  fontSize: '$1',
  height: '$6',
  gap: '$1',
  backgroundColor: '$grayA3',
  color: '$gray11',
  userSelect: 'none',
  cursor: 'pointer',
  width: '100%',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&:disabled': {
    backgroundColor: '$grayA2',
    color: '$grayA8',
    '&:hover': {
      backgroundColor: '$grayA2',
      color: '$grayA8',
      cursor: 'default',
    },
  },
  '&:hover': {
    backgroundColor: '$grayA4',
  },
  '&[data-placeholder]': {
    color: '$gray11',
  },
  // '&:focus-visible': {
  //   boxShadow: 'inset 0 0 0 1px $colors$blue10',
  // },
  '& > span:first-child': {
    display: 'flex',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    minWidth: 0,
    lineHeight: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  variants: {
    size: {
      xs: {
        height: '$xs',
        borderRadius: '$2',
      },
      sm: {
        height: '$sm',
        borderRadius: '$2',
      },
      md: {
        height: '$md',
        borderRadius: '$4',
      },
    },
  },
})

const SelectIcon = styled(SelectPrimitive.SelectIcon, {
  position: 'absolute',
  height: '100%',
  display: 'inline-flex',
  color: 'CurrentColor',
  alignItems: 'center',
  right: 4,
  lineHeight: 1,
  '& > svg': {
    height: '14px',
    width: '14px',
  },
})

const CornerIcon = styled(IconRightBottomCorner, {
  position: 'absolute',
  width: '4px !important',
  height: '4px !important',
  color: 'var(CurrentColor, $gray8)',
  bottom: 1,
  right: 1,
})

const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'auto',
  maxHeight: 'min(300px, var(--radix-select-content-available-height))',
  backgroundColor: '$gray2',
  minWidth: 'var(--radix-select-trigger-width)',
  borderRadius: '$4',
  boxShadow: '0 5px 10px rgba(0,0,0,0.08)',
  border: '1px solid $grayA4',
})

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: '$1',
  maxHeight: '300px',
  overflowY: 'auto',
  '@media (prefers-reduced-motion: no-preference)': {
    scrollBehavior: 'smooth',
  },
})

const StyledItem = styled(SelectPrimitive.Item, checkboxItemStyle)

const SelectLabel = styled(SelectPrimitive.Label, labelStyle)

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, indicatorStyle)

const scrollButtonStyles = {
  display: 'flex',
  height: '$4',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2',
  color: '$gray10',
  cursor: 'default',
}

const SelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles)

const SelectScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles)

type SelectContextProps = {
  size: 'xs' | 'sm' | 'md'
  valueType: 'string' | 'number'
  valueRenderer?: (value: string | number, location?: 'item' | 'trigger') => React.ReactNode
}

const SelectContext = React.createContext<SelectContextProps>({
  size: 'sm',
  valueType: 'string',
  valueRenderer: undefined,
})

const StyledSelectItemContent = styled('span', {
  display: 'flex',
  alignItems: 'center',
  '& > svg': {
    marginRight: '$1_5',
    width: '$4',
    height: '$4',
  },
})

const StyledSelectSlot = styled('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: '$gray9',
  transition: 'color 0.2s ease',
  userSelect: 'none',
  variants: {
    size: {
      xs: {
        padding: '0 $1',
        fontSize: '$1',
      },
      sm: {
        padding: '0 $1',
        fontSize: '$1',
      },
      md: {
        padding: '0 $2',
        fontSize: '$1_5',
      },
    },
  },
})

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: any
  children?: React.ReactNode
  icon?: React.ReactNode
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { children, value, icon, ...props },
  forwardedRef
) {
  const { size, valueType, valueRenderer } = React.useContext(SelectContext)

  const renderedValue = valueRenderer ? valueRenderer(value, 'item') : children

  return (
    <StyledItem {...props} value={valueType === 'number' ? String(value) : value} ref={forwardedRef} size={size}>
      <StyledItemIndicator>
        <IconCheck />
      </StyledItemIndicator>
      <StyledSelectItemContent>
        {icon}
        <SelectPrimitive.ItemText>{renderedValue ?? children}</SelectPrimitive.ItemText>
      </StyledSelectItemContent>
    </StyledItem>
  )
})

interface SelectGroupProps extends PrimitiveSelectGroupProps {
  label: string
  children: React.ReactNode
  divider?: boolean
  dividerPosition?: 'top' | 'bottom'
}

function SelectGroup(props: SelectGroupProps) {
  const { label, children, ...rest } = props

  return (
    <React.Fragment>
      <SelectPrimitive.Group {...rest}>
        {label && <SelectLabel>{label}</SelectLabel>}
        {children}
      </SelectPrimitive.Group>
    </React.Fragment>
  )
}

export interface SelectProps extends Omit<PrimitiveSelectProps, 'value' | 'defaultValue'> {
  placeholder?: string
  position?: SelectContentProps['position']
  size?: 'xs' | 'sm' | 'md'
  width?: 'initial'
  valueType?: 'string' | 'number'
  value?: string | number
  valueRenderer?: (value: string | number, location?: 'item' | 'trigger') => React.ReactNode
  defaultValue?: string | number
  onValueChange?: (value: any) => void
  id?: string
  sideOffset?: number
  children?: React.ReactNode
  arrow?: boolean
  cornerArrow?: boolean
  triggerCss?: CSS
  startSlot?: React.ReactNode
}

function Select(props: SelectProps) {
  const {
    placeholder,
    value: propValue,
    defaultValue: propDefaultValue,
    valueType: propValueType,
    position = 'popper',
    valueRenderer,
    size = 'sm',
    arrow = true,
    cornerArrow = false,
    width,
    id,
    sideOffset = 4,
    triggerCss,
    startSlot,
    ...rest
  } = props

  let valueType = 'string'
  if (propValueType) {
    valueType = propValueType
  } else {
    if (typeof propValue === 'number') {
      valueType = 'number'
    } else if (typeof propValue === 'string') {
      valueType = 'string'
    }
  }

  const [value, setValue] = useControllableState<string>({
    prop: propValue !== undefined && propValue !== null ? String(propValue) : undefined,
    defaultProp: propDefaultValue ? String(propDefaultValue) : undefined,
    onChange: (val) => {
      if (props.onValueChange) {
        if (valueType === 'number') {
          return props.onValueChange(Number(val))
        }
        props.onValueChange(val)
      }
    },
  })

  const renderedValue = valueRenderer ? valueRenderer(value, 'trigger') : undefined

  return (
    <SelectContext.Provider value={{ size, valueType: valueType as unknown as 'string' | 'number', valueRenderer }}>
      <SelectPrimitive.Root {...rest} value={value} onValueChange={setValue}>
        <SelectTrigger size={size} id={id} css={triggerCss}>
          {!!startSlot ? (
            <div style={{ position: 'relative', display: 'flex' }}>
              <StyledSelectSlot size={size}>{startSlot}</StyledSelectSlot>
              <SelectPrimitive.Value placeholder={placeholder}>{renderedValue}</SelectPrimitive.Value>
            </div>
          ) : (
            <SelectPrimitive.Value placeholder={placeholder}>{renderedValue}</SelectPrimitive.Value>
          )}
          {arrow && <SelectIcon>{cornerArrow ? <CornerIcon /> : <IconChevronDown />}</SelectIcon>}
        </SelectTrigger>
        <SelectPrimitive.Portal>
          <SelectContent position={position} sideOffset={sideOffset} collisionPadding={4}>
            <SelectScrollUpButton>
              <IconChevronUp size="14px" />
            </SelectScrollUpButton>
            <SelectViewport>{props.children}</SelectViewport>
            <SelectScrollDownButton>
              <IconChevronDown size="14px" />
            </SelectScrollDownButton>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  )
}

export { Select, SelectGroup, SelectItem, SelectLabel }
