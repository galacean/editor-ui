import React, { Fragment, useEffect, useMemo, useRef } from 'react'
import { Panel } from '../Panel'

import {
  FormItemColor,
  FormItemGroup,
  FormItemInputNumber,
  FormItemRect,
  FormItemToggle,
  FormItemVector2,
  FormItemVector3,
  FormItemVector4,
  FormItemSlider,
  FormItemArray,
  FormItemSelect,
  FormItemInput,
  FormItemTextarea,
  FormItemCascadeSlider,
  FormItemInputProps,
  FormItemInputNumberProps,
  FormItemSliderProps,
  FormItemColorProps,
  FormItemGroupProps,
  FormItemToggleProps,
  FormItemVector2Props,
  FormItemVector3Props,
  FormItemVector4Props,
  FormItemSegmentControlProps,
  FormItemSelectProps,
  FormItemTextareaProps,
  FormItemCascadeSliderProps,
  FormItemArrayProps,
} from '..'
import { FormItemRectProps } from '../FormItemRect/FormItemRect'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { ColorSpace, resetStyle, styled } from '@galacean/editor-ui'

export const GUIItemTypeEnum = {
  Input: 'Input',
  Number: 'Number',
  Slider: 'Slider',
  Color: 'Color',
  Group: 'Group',
  Array: 'Array',
  Toggle: 'Toggle',
  Vector2: 'Vector2',
  Vector3: 'Vector3',
  Vector4: 'Vector4',
  Rect: 'Rect',
  Select: 'Select',
  Button: 'Button',
  Textarea: 'Textarea',
  CascadeSlider: 'CascadeSlider',
} as const

// 创建类型别名供内部使用
export type GUIItemType = (typeof GUIItemTypeEnum)[keyof typeof GUIItemTypeEnum]

// value will be injected by GUIRoot
type BaseGUIItemConfig<T> = Omit<T, 'value'> & { bindPath?: string }

interface GUIItemInputConfig extends BaseGUIItemConfig<FormItemInputProps> {
  type: typeof GUIItemTypeEnum.Input
}

interface GUIItemNumberConfig extends BaseGUIItemConfig<FormItemInputNumberProps> {
  type: typeof GUIItemTypeEnum.Number
}

interface GUIItemTextareaConfig extends BaseGUIItemConfig<FormItemTextareaProps> {
  type: typeof GUIItemTypeEnum.Textarea
}

interface GUIItemSliderConfig extends BaseGUIItemConfig<FormItemSliderProps> {
  type: typeof GUIItemTypeEnum.Slider
}

interface GUIItemColorConfig extends BaseGUIItemConfig<FormItemColorProps> {
  type: typeof GUIItemTypeEnum.Color
  colorSpace?: ColorSpace
}

interface GUIItemRectConfig extends BaseGUIItemConfig<FormItemRectProps> {
  type: typeof GUIItemTypeEnum.Rect
}

interface GUIItemToggleConfig extends BaseGUIItemConfig<FormItemToggleProps> {
  type: typeof GUIItemTypeEnum.Toggle
}

interface GUIItemVector2Config extends BaseGUIItemConfig<FormItemVector2Props> {
  type: typeof GUIItemTypeEnum.Vector2
}

interface GUIItemVector3Config extends BaseGUIItemConfig<FormItemVector3Props> {
  type: typeof GUIItemTypeEnum.Vector3
}

interface GUIItemVector4Config extends BaseGUIItemConfig<FormItemVector4Props> {
  type: typeof GUIItemTypeEnum.Vector4
}

interface GUIItemSegmentControlConfig extends BaseGUIItemConfig<FormItemSegmentControlProps> {
  type: typeof GUIItemTypeEnum.Select
}

interface GUIItemArrayConfig extends Omit<FormItemArrayProps, 'items'> {
  type: typeof GUIItemTypeEnum.Array
  bindPath: string
  items: GUIItemConfig[]
  onChange?: (value: any) => void
}

interface GUIItemGroupConfig extends Omit<BaseGUIItemConfig<FormItemGroupProps>, 'children'> {
  type: typeof GUIItemTypeEnum.Group
  items: GUIItemConfig[]
}

interface GUIItemSelectConfig extends BaseGUIItemConfig<FormItemSelectProps<any>> {
  type: typeof GUIItemTypeEnum.Select
}

interface GUIItemCascadeSliderConfig extends BaseGUIItemConfig<FormItemCascadeSliderProps> {
  type: typeof GUIItemTypeEnum.CascadeSlider
}

export type GUIItemConfig =
  | GUIItemInputConfig
  | GUIItemNumberConfig
  | GUIItemColorConfig
  | GUIItemTextareaConfig
  | GUIItemRectConfig
  | GUIItemToggleConfig
  | GUIItemSliderConfig
  | GUIItemVector2Config
  | GUIItemVector3Config
  | GUIItemVector4Config
  | GUIItemSelectConfig
  | GUIItemSegmentControlConfig
  | GUIItemCascadeSliderConfig
  | GUIItemArrayConfig
  | GUIItemGroupConfig

export type SourceData = any
export type KeyOrBindPath = string

export type GUIDefineItem = [SourceData, KeyOrBindPath, GUIItemConfig]

const StyledGroupWrapper = styled('div', {
  margin: '$0_5',
  borderRadius: '$3',
  boxShadow: '$border',
})

function renderGUIItem(item: GUIDefineItem, index: number) {
  const [data, keyOrBindPath, config] = item
  const { type, onChange, bindPath, label, ...rest } = config as Exclude<GUIItemConfig, GUIItemGroupConfig>
  const realKey = keyOrBindPath.split('.').pop()

  let realLabel = label ?? realKey
  let value: any = data[keyOrBindPath]
  let GUIComponent = null
  let nested = false

  let extraProps: any = {}

  if (keyOrBindPath.indexOf('.') !== -1 && realKey) {
    nested = true
  }

  if (nested) {
    const keys = keyOrBindPath.split('.')
    const lastKey = keys.pop()
    const lastObj = keys.reduce((acc, key) => acc[key], data)
    value = lastObj[lastKey]
  }

  let preprocesser = function preprocesser(value: any) {
    return function (processFunc?) {
      if (!processFunc) return value
      return processFunc(value)
    }
  }

  let realValue = preprocesser(value)()

  function handleOnChange(nextValue, ...args) {
    let realNextValue = nextValue
    let nextData = data
    if (nested) {
      const keys = keyOrBindPath.split('.')
      const lastKey = keys.pop()
      const lastObj = keys.reduce((acc, key) => acc[key], data)
      lastObj[lastKey] = realNextValue
    } else {
      nextData[keyOrBindPath] = realNextValue
    }
    // TODO: have to find a solution to make `onChange` satisfied with the extra args
    // @ts-ignore
    onChange && onChange(realNextValue, ...args)
  }

  switch (type as GUIItemType) {
    case 'Input':
      GUIComponent = FormItemInput
      break
    case 'Number':
      GUIComponent = FormItemInputNumber
      break
    case 'Slider':
      GUIComponent = FormItemSlider
      break
    case 'Color':
      GUIComponent = FormItemColor
      break
    case 'Toggle':
      GUIComponent = FormItemToggle
      break
    case 'Vector2':
      GUIComponent = FormItemVector2
      break
    case 'Vector3':
      GUIComponent = FormItemVector3
      break
    case 'Vector4':
      GUIComponent = FormItemVector4
      break
    case 'Rect':
      GUIComponent = FormItemRect
      break
    case 'Textarea':
      GUIComponent = FormItemTextarea
      break
    case 'Array': {
      GUIComponent = FormItemArray
      extraProps.items = (config as GUIItemArrayConfig).items.map((item, index) => {
        return {
          name: `${realLabel}${index}`,
          id: index,
          children: renderGUIItem([data, item.bindPath, item], index),
        }
      }) as unknown as FormItemArrayProps['items']
      break
    }
    case 'Group': {
      GUIComponent = FormItemGroup
      ;(extraProps as BaseGUIItemConfig<FormItemGroupProps>).children = (config as GUIItemGroupConfig).items.map(
        (item, index) => {
          return renderGUIItem([data, item.bindPath, item], index)
        }
      )
      break
    }
    case 'CascadeSlider':
      GUIComponent = FormItemCascadeSlider
      break
    case 'Select':
      GUIComponent = FormItemSelect
      break
  }

  if (!GUIComponent) {
    return null
  }

  if (GUIComponent === FormItemGroup) {
    return (
      <StyledGroupWrapper>
        <UnControlledComponent
          key={`label_${index}`}
          label={realLabel}
          value={realValue}
          onChange={handleOnChange}
          GUIComponent={GUIComponent}
          {...rest}
          {...extraProps}
        />
      </StyledGroupWrapper>
    )
  }

  return (
    <UnControlledComponent
      key={`label_${index}`}
      label={realLabel}
      value={realValue}
      onChange={handleOnChange}
      GUIComponent={GUIComponent}
      {...rest}
      {...extraProps}
    />
  )
}

function UnControlledComponent({ value, onChange, label, GUIComponent, ...rest }) {
  const onChangeRestParams = useRef([])
  const [controlledValue, setControlledValue] = useControllableState({
    prop: undefined,
    defaultProp: value,
    onChange: (v) => {
      onChange(v, ...onChangeRestParams.current)
      onChangeRestParams.current = []
    },
  })

  return (
    <GUIComponent
      label={label}
      value={controlledValue}
      onChange={(value, ...args) => {
        onChangeRestParams.current = args
        setControlledValue(value)
      }}
      {...rest}
    />
  )
}

type GUIContextType = {
  items: GUIDefineItem[]
  // onAdd: (item: GUIItemConfig) => void;
  gui: any
}

const GUIContext = React.createContext<GUIContextType>({
  gui: null,
  items: [],
})

interface GUIProviderProps {
  children: React.ReactNode
  items: GUIDefineItem[]
  gui: any
}

function GUIProvider({ children, items, gui }: GUIProviderProps) {
  return <GUIContext.Provider value={{ gui, items }}>{children}</GUIContext.Provider>
}

export interface GUIRootProps {
  data: Record<string, any>
  items?: GUIDefineItem[]
}

export function GUIRoot(props: GUIRootProps) {
  const { items, data } = props
  const [guiItems, setGUIItems] = React.useState(items)

  const gui = useMemo(() => {
    return {
      items: guiItems,
      onAdd: (item) => {
        setGUIItems((prev) => [...prev, item])
      },
    }
  }, [guiItems])

  useEffect(() => {
    resetStyle()
  }, [])

  return (
    <GUIProvider {...{ items, data, gui }}>
      <Panel>{guiItems.map(renderGUIItem).filter(Boolean)}</Panel>
    </GUIProvider>
  )
}
