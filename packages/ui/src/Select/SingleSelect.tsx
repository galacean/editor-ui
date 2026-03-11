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
import { Flex } from '../Flex'

const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: '$text',
  border: '1px solid transparent',
  transition: '$borderColor, $backgroundColor, $color, $shadow',
  userSelect: 'none',
  cursor: 'pointer',
  width: '100%',
  boxSizing: 'border-box',
  '&:disabled': {
    backgroundColor: '$surfaceSubtle',
    borderColor: '$border',
    color: '$textMuted',
    '&:hover': {
      backgroundColor: '$surfaceSubtle',
      color: '$textMuted',
      cursor: 'default',
    },
  },
  '&:hover': {
    backgroundColor: '$softBgHover',
    borderColor: '$borderStrong',
  },
  '&[data-placeholder]': {
    color: '$textMuted',
  },
  '&:focus-visible': {
    borderColor: '$borderStrong',
    boxShadow: '$focus',
  },
  variants: {
    size: {
      xs: {
        height: '$controlXs',
        borderRadius: '$xs',
        padding: '0 $5 0 $1_5',
        fontSize: '$1',
      },
      sm: {
        height: '$sm',
        borderRadius: '$sm',
        padding: '0 $5 0 $2',
        fontSize: '$1',
      },
      md: {
        height: '$md',
        borderRadius: '$md',
        padding: '0 $6 0 $3',
        fontSize: '$2',
      },
    },
    variant: {
      outline: {
        backgroundColor: '$surface',
        borderColor: '$border',
        '&:hover': {
          backgroundColor: '$surfaceSubtle',
          borderColor: '$borderStrong',
        },
      },
      soft: {
        backgroundColor: '$softBg',
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: '$softBgHover',
          borderColor: 'transparent',
        },
      },
      subtle: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: '$surfaceSubtle',
          borderColor: 'transparent',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'soft',
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
    height: '$iconXs',
    width: '$iconXs',
  },
  variants: {
    size: {
      xs: {
        '& > svg': {
          height: '$iconXs',
          width: '$iconXs',
        },
      },
      sm: {
        '& > svg': {
          height: '$iconSm',
          width: '$iconSm',
        },
      },
      md: {
        '& > svg': {
          height: '$iconMd',
          width: '$iconMd',
        },
      },
    },
  },
})

const StyledTriggerContent = styled('div', {
  display: 'flex',
  flex: 1,
  minWidth: 0,
  height: '100%',
  alignItems: 'center',
  gap: '$1',
})

const SelectValue = styled(SelectPrimitive.Value, {
  display: 'flex',
  flex: 1,
  minWidth: 0,
  height: '100%',
  alignItems: 'center',
  lineHeight: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: 'inherit',
})

const CornerIcon = styled(IconRightBottomCorner, {
  position: 'absolute',
  width: '4px !important',
  height: '4px !important',
  color: 'currentColor',
  bottom: 1,
  right: 1,
})

const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'auto',
  maxHeight: 'min(300px, var(--radix-select-content-available-height))',
  backgroundColor: '$surfaceOverlay',
  minWidth: 'var(--radix-select-trigger-width)',
  borderRadius: '$lg',
  boxShadow: '$popContainer',
  border: '1px solid $border',
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
  color: '$textMuted',
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

const StyledSelectSlot = styled(Flex, {
  flexShrink: 0,
  userSelect: 'none',
  color: '$textMuted',
  variants: {
    size: {
      xs: {
        paddingRight: '$1',
        fontSize: '$1',
      },
      sm: {
        paddingRight: '$1',
        fontSize: '$1',
      },
      md: {
        paddingRight: '$2',
        fontSize: '$2',
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
  variant?: 'outline' | 'soft' | 'subtle'
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
    variant = 'soft',
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
    } else if (typeof propDefaultValue === 'number') {
      valueType = 'number'
    } else if (typeof propDefaultValue === 'string') {
      valueType = 'string'
    }
  }

  const [value, setValue] = useControllableState<string>({
    prop: propValue !== undefined && propValue !== null ? String(propValue) : undefined,
    defaultProp: propDefaultValue !== undefined && propDefaultValue !== null ? String(propDefaultValue) : undefined,
    onChange: (val) => {
      if (props.onValueChange) {
        if (valueType === 'number') {
          return props.onValueChange(Number(val))
        }
        props.onValueChange(val)
      }
    },
  })

  const triggerValue =
    valueType === 'number' && value !== undefined && value !== ''
      ? Number(value)
      : (value as string | number | undefined)
  const renderedValue = valueRenderer ? valueRenderer(triggerValue as string | number, 'trigger') : undefined

  return (
    <SelectContext.Provider value={{ size, valueType: valueType as unknown as 'string' | 'number', valueRenderer }}>
      <SelectPrimitive.Root {...rest} value={value} onValueChange={setValue}>
        <SelectTrigger size={size} variant={variant} id={id} css={triggerCss}>
          <StyledTriggerContent>
            {!!startSlot && (
              <StyledSelectSlot align="both" size={size}>
                {startSlot}
              </StyledSelectSlot>
            )}
            <SelectValue placeholder={placeholder}>{renderedValue}</SelectValue>
          </StyledTriggerContent>
          {arrow && <SelectIcon size={size}>{cornerArrow ? <CornerIcon /> : <IconChevronDown />}</SelectIcon>}
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
