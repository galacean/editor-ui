import React, { useMemo, useRef } from 'react';
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
  FormItemSegmentControl,
  FormItemArray,
  FormItemSelect,
  FormItemButton,
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
import { FormItemRectProps, Rect } from '../FormItemRect/FormItemRect';
import { FormItemProps } from '../FormItem';
import { BaseFormItemProps, FormItem } from '../FormItem/FormItem';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

export enum GUIItemTypeEnum {
  Input = 'Input',
  Number = 'Number',
  Slider = 'Slider',
  Color = 'Color',
  Group = 'Group',
  Array = 'Array',
  Toggle = 'Toggle',
  Vector2 = 'Vector2',
  Vector3 = 'Vector3',
  Vector4 = 'Vector4',
  Rect = 'Rect',
  Select = 'Select',
  // SegmentControl = 'SegmentControl',
  Button = 'Button',
  Textarea = 'Textarea',
  CascadeSlider = 'CascadeSlider',
}

// value will be injected by GUIRoot
type BaseGUIItemConfig<T> = Omit<T, 'value'> & { bindPath?: string };

interface GUIItemInputConfig extends BaseGUIItemConfig<FormItemInputProps> {
  type: GUIItemTypeEnum.Input;
}

interface GUIItemNumberConfig extends BaseGUIItemConfig<FormItemInputNumberProps> {
  type: GUIItemTypeEnum.Number;
}

interface GUIItemTextareaConfig extends BaseGUIItemConfig<FormItemTextareaProps> {
  type: GUIItemTypeEnum.Textarea;
}

interface GUIItemSliderConfig extends BaseGUIItemConfig<FormItemSliderProps> {
  type: GUIItemTypeEnum.Slider;
}

interface GUIItemColorConfig extends BaseGUIItemConfig<FormItemColorProps> {
  type: GUIItemTypeEnum.Color;
}

interface GUIItemRectConfig extends BaseGUIItemConfig<FormItemRectProps> {
  type: GUIItemTypeEnum.Rect;
}

interface GUIItemToggleConfig extends BaseGUIItemConfig<FormItemToggleProps> {
  type: GUIItemTypeEnum.Toggle;
}

interface GUIItemVector2Config extends BaseGUIItemConfig<FormItemVector2Props> {
  type: GUIItemTypeEnum.Vector2;
}

interface GUIItemVector3Config extends BaseGUIItemConfig<FormItemVector3Props> {
  type: GUIItemTypeEnum.Vector3;
}

interface GUIItemVector4Config extends BaseGUIItemConfig<FormItemVector4Props> {
  type: GUIItemTypeEnum.Vector4;
}

interface GUIItemSegmentControlConfig extends BaseGUIItemConfig<FormItemSegmentControlProps> {
  type: GUIItemTypeEnum.Select;
}

interface GUIItemArrayConfig extends Omit<FormItemArrayProps, 'items'> {
  type: GUIItemTypeEnum.Array;
  bindPath: string;
  items: GUIItemConfig[];
  onChange?: (value: any) => void;
}

interface GUIItemGroupConfig extends Omit<BaseGUIItemConfig<FormItemGroupProps>, 'children'> {
  type: GUIItemTypeEnum.Group;
  items: GUIItemConfig[];
}

interface GUIItemSelectConfig extends BaseGUIItemConfig<FormItemSelectProps<any>> {
  type: GUIItemTypeEnum.Select;
}

// interface GUIItemButtonConfig extends {
//   type: GUIItemTypeEnum.Button;
// }

interface GUIItemCascadeSliderConfig extends BaseGUIItemConfig<FormItemCascadeSliderProps> {
  type: GUIItemTypeEnum.CascadeSlider;
}

export type GUIItemConfig = (
    GUIItemInputConfig
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
);
  // | GUIItemButtonConfig


export type SourceData = any;
export type KeyOrBindPath = string;

export type GUIDefineItem = [SourceData, KeyOrBindPath, GUIItemConfig];

function renderGUIItem(item: GUIDefineItem, index: number) {
  const [data, keyOrBindPath, config] = item;
  const { type, onChange, bindPath, label,  ...rest } = config as Exclude<GUIItemConfig, GUIItemGroupConfig>;
  const realKey = keyOrBindPath.split('.').pop();

  let realLabel = label ?? realKey;
  let value: any = data[keyOrBindPath];
  let GUIComponent = null;
  let nested = false;

  let extraProps: any = {};


  if(keyOrBindPath.indexOf('.') !== -1 && realKey) {
    nested = true;
  }

  if(nested) {
    const keys = keyOrBindPath.split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((acc, key) => acc[key], data);
    value = lastObj[lastKey];
  }

  let preprocesser = function preprocesser(value: any) {
    return function (processFunc?) {
      if(!processFunc) return value;
      return processFunc(value);
    }
  }

  let realValue = preprocesser(value)();

  function handleOnChange(nextValue, ...args) {
    let realNextValue = nextValue;
    let nextData = data;
    if(nested) {
      const keys = keyOrBindPath.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((acc, key) => acc[key], data);
      lastObj[lastKey] = realNextValue;
    } else {
      nextData[keyOrBindPath] = realNextValue;
    }
    // TODO: have to find a solution to make `onChange` satisfied with the extra args
    // @ts-ignore
    onChange && onChange(realNextValue, ...args);
  }

  switch(type as GUIItemTypeEnum) {
    case GUIItemTypeEnum.Input:
      GUIComponent = FormItemInput;
      break;
    case GUIItemTypeEnum.Number:
      GUIComponent = FormItemInputNumber;
      break;
    case GUIItemTypeEnum.Slider:
      GUIComponent = FormItemSlider;
      break;
    case GUIItemTypeEnum.Color:
      GUIComponent = FormItemColor;
      break;
    case GUIItemTypeEnum.Toggle:
      GUIComponent = FormItemToggle;
      break;
    case GUIItemTypeEnum.Vector2:
      GUIComponent = FormItemVector2;
      break;
    case GUIItemTypeEnum.Vector3:
      GUIComponent = FormItemVector3;
      break;
    case GUIItemTypeEnum.Vector4:
      GUIComponent = FormItemVector4;
      break;
    case GUIItemTypeEnum.Rect:
      GUIComponent = FormItemRect;
      break;
    case GUIItemTypeEnum.Textarea:
      GUIComponent = FormItemTextarea;
      break;
    case GUIItemTypeEnum.Array: {
      GUIComponent = FormItemArray;
      extraProps.items = (config as GUIItemArrayConfig).items.map((item, index) => {
        return {
          name: `${realLabel}${index}`,
          id: index,
          children: renderGUIItem([data, item.bindPath, item], index)
        };
      }) as unknown as FormItemArrayProps['items']
      break;
    };
    case GUIItemTypeEnum.Group: {
      GUIComponent = FormItemGroup;
      (extraProps as BaseGUIItemConfig<FormItemGroupProps>).children = (config as GUIItemGroupConfig).items.map((item, index) => {
        return renderGUIItem([data, item.bindPath, item], index);
      })
      break;
    }
    case GUIItemTypeEnum.CascadeSlider:
      GUIComponent = FormItemCascadeSlider;
      break;
    case GUIItemTypeEnum.Select:
      GUIComponent = FormItemSelect;
      break;
    // case GUIItemTypeEnum.Button:
    //   GUIComponent = FormItemButton;
    //   break;
  }

  if(!GUIComponent) {
    return null;
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
  );
}

function UnControlledComponent({
  value,
  onChange,
  label,
  GUIComponent,
  ...rest
}) {
  const onChangeRestParams = useRef([]);
  const [controlledValue, setControlledValue] = useControllableState({
    prop: undefined,
    defaultProp: value,
    onChange: (v) => {
      onChange(v, ...onChangeRestParams.current);
      onChangeRestParams.current = [];
    },
  })

  return (
    <GUIComponent
      label={label}
      value={controlledValue}
      onChange={(value, ...args) => {
        onChangeRestParams.current = args;
        setControlledValue(value);
      }}
      {...rest}
    />
  )
}

function GUIArray() {

}

type GUIContextType = {
  items: GUIDefineItem[];
  // onAdd: (item: GUIItemConfig) => void;
  gui: any;
};

const GUIContext = React.createContext<GUIContextType>({
  gui: null,
  items: []
});

interface GUIProviderProps {
  children: React.ReactNode;
  items: GUIDefineItem[];
  gui: any;
}

function GUIProvider({ children, items, gui }: GUIProviderProps) {
  return (
    <GUIContext.Provider value={{ gui, items }}>{children}</GUIContext.Provider>
  );
}

export interface GUIRootProps {
  data: Record<string, any>;
  items?: GUIDefineItem[];
}

export function GUIRoot(props: GUIRootProps) {
  const { items, data } = props;
  const [guiItems, setGUIItems] = React.useState(items);

  const gui = useMemo(() => {
    return {
      items: guiItems,
      onAdd: (item) => {
        setGUIItems((prev) => [...prev, item]);
      }
    };
  }, [guiItems]);
  
  return (
    <GUIProvider {...{ items, data, gui }}>
      <Panel>
        {guiItems.map(renderGUIItem).filter(Boolean)}
      </Panel>
    </GUIProvider>
  );
}


