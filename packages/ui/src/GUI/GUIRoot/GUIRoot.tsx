import React, { useMemo } from 'react';
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
} from '..'
import { FormItemRectProps, Rect } from '../FormItemRect/FormItemRect';
import { FormItemProps } from '../FormItem';
import { BaseFormItemProps, FormItem } from '../FormItem/FormItem';

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
type BaseGUIItemConfig<T> = Omit<BaseFormItemProps<T>, 'value'> & { bindPath: string };

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

interface GUIItemGroupConfig extends BaseGUIItemConfig<FormItemGroupProps> {
  type: GUIItemTypeEnum.Group;
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

interface GUIItemArrayConfig extends BaseGUIItemConfig<any> {
  type: GUIItemTypeEnum.Array;
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
);
  // | GUIItemGroupConfig
  // | GUIItemButtonConfig
  // | GUIItemArrayConfig


export type SourceData = any;
export type KeyOrBindPath = string;

export type GUIDefineItem = [SourceData, KeyOrBindPath, GUIItemConfig];

function renderGUIItem(item: GUIDefineItem, index: number) {
  const [data, keyOrBindPath, config] = item;
  const { type, onChange, bindPath, label, ...rest } = config;

  let realLabel = label;
  let value: any = data[keyOrBindPath];
  let GUIComponent: React.FC<BaseFormItemProps<any>> = null;
  let nested = false;

  const realKey = keyOrBindPath.split('.').pop();

  if(realKey) {
    realLabel = realLabel ?? realKey;
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

  function handleOnChange(nextValue: any, processFunc?: (value: any) => any) {
    let realNextValue = preprocesser(nextValue)(processFunc);
    let nextData = data;
    if(nested) {
      const keys = keyOrBindPath.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((acc, key) => acc[key], data);
      lastObj[lastKey] = realNextValue;
    } else {
      nextData[keyOrBindPath] = realNextValue;
    }
  }

  switch(type) {
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
    // case GUIItemTypeEnum.Group:
    //   GUIComponent = FormItemGroup;
    //   break;
    // case GUIItemTypeEnum.CascadeSlider:
    //   GUIComponent = FormItemCascadeSlider;
    //   break;
    // case GUIItemTypeEnum.Select:
    //   GUIComponent = FormItemSelect;
    //   break;
    // case GUIItemTypeEnum.Button:
    //   GUIComponent = FormItemButton;
    //   break;
  }

  if(!GUIComponent) {
    return null;
  }

  return (
    <GUIComponent key={`label_${index}`} label={realLabel} value={realValue} onChange={handleOnChange} {...rest} />
  );
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


