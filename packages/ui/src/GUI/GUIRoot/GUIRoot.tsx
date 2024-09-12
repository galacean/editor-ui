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
  FormItemTexareaProps,
  FormItemCascadeSliderProps,
} from '..'
import { FormItemRectProps, Rect } from '../FormItemRect/FormItemRect';
import { FormItemProps } from '../FormItem';
import { BaseFormItemProps } from '../FormItem/FormItem';

export enum GUIItemType {
  String = 'String',
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

interface GUIItemBaseConfig<T> extends BaseFormItemProps<T> {
  type: GUIItemType
}

interface GUIItemInputConfig extends FormItemInputProps {
  type: GUIItemType.String;
}

interface GUIItemTextareaConfig extends FormItemTexareaProps {
  type: GUIItemType.Textarea;
}

interface GUIItemNumberConfig extends FormItemInputNumberProps {
  type: GUIItemType.Number;
}

interface GUIItemSliderConfig extends FormItemSliderProps {
  type: GUIItemType.Slider;
}

interface GUIItemColorConfig extends FormItemColorProps {
  type: GUIItemType.Color;
}

interface GUIItemGroupConfig extends FormItemGroupProps {
  type: GUIItemType.Group;
}

interface GUIItemRectConfig extends FormItemRectProps {
  type: GUIItemType.Rect;
}

interface GUIItemToggleConfig extends FormItemToggleProps {
  type: GUIItemType.Toggle;
  value: boolean;
}

interface GUIItemVector2Config extends FormItemVector2Props {
  type: GUIItemType.Vector2;
  value: { x: number; y: number };
}

interface GUIItemVector3Config extends FormItemVector3Props {
  type: GUIItemType.Vector3;
  value: { x: number; y: number; z: number };
}

interface GUIItemVector4Config extends FormItemVector4Props {
  type: GUIItemType.Vector4;
  value: { x: number; y: number; z: number; w: number };
}

interface GUIItemSegmentControlConfig extends FormItemSegmentControlProps {
  type: GUIItemType.Select;
}

interface GUIItemArrayConfig extends GUIItemBaseConfig<any> {
  type: GUIItemType.Array;
  value: any[];
}

interface GUIItemSelectConfig extends FormItemSelectProps<any> {
  type: GUIItemType.Select;
  value: string;
}

// interface GUIItemButtonConfig extends {
//   type: GUIItemType.Button;
// }

interface GUIItemCascadeSliderConfig extends FormItemCascadeSliderProps {
  type: GUIItemType.CascadeSlider;
}

export type GUIItemConfig =
  | GUIItemColorConfig
  // | GUIItemGroupConfig
  | GUIItemNumberConfig
  | GUIItemInputConfig
  | GUIItemTextareaConfig
  | GUIItemRectConfig
  | GUIItemToggleConfig
  | GUIItemVector2Config
  | GUIItemVector3Config
  | GUIItemVector4Config
  | GUIItemSliderConfig
  | GUIItemSelectConfig
  | GUIItemSegmentControlConfig
  | GUIItemCascadeSliderConfig;
  // | GUIItemButtonConfig
  // | GUIItemArrayConfig


type SourceData = any;
type KeyOrBindPath = string;

export type GUIDefineItem = [SourceData, KeyOrBindPath, GUIItemConfig];

type GUIRootProps = {
  data: Record<string, any>;
  items?: GUIDefineItem[];
}

const defaultItems: GUIItemConfig[] = [
  
]

function renderGUIItem(item: GUIDefineItem, index: number) {
  const [data, keyOrBindPath, config] = item;
  const { type, value, onChange, ...rest } = config;

  let label = keyOrBindPath;
  let GUIComponent: React.FC<BaseFormItemProps<any>> = null;
  let nested = false;

  const realKey = keyOrBindPath.split('.').pop();

  if(realKey) {
    label = realKey;
    nested = true;
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
    case GUIItemType.String:
      GUIComponent = FormItemInput;
      break;
    case GUIItemType.Number:
      GUIComponent = FormItemInputNumber;
      break;
    case GUIItemType.Slider:
      GUIComponent = FormItemSlider;
      break;
    case GUIItemType.Color:
      GUIComponent = FormItemColor;
      break;
    case GUIItemType.Toggle:
      GUIComponent = FormItemToggle;
      break;
    case GUIItemType.Vector2:
      GUIComponent = FormItemVector2;
      break;
    case GUIItemType.Vector3:
      GUIComponent = FormItemVector3;
      break;
    case GUIItemType.Vector4:
      GUIComponent = FormItemVector4;
      break;
    case GUIItemType.Rect:
      GUIComponent = FormItemRect;
      break;
    case GUIItemType.Textarea:
      GUIComponent = FormItemTextarea;
      break;
    // case GUIItemType.Group:
    //   GUIComponent = FormItemGroup;
    //   break;
    // case GUIItemType.CascadeSlider:
    //   GUIComponent = FormItemCascadeSlider;
    //   break;
    // case GUIItemType.Select:
    //   GUIComponent = FormItemSelect;
    //   break;
    // case GUIItemType.Button:
    //   GUIComponent = FormItemButton;
    //   break;
  }

  return (
    <GUIComponent key={`label_${index}`} label={label} value={realValue} onChange={handleOnChange} {...rest} />
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

function GUIProvider({ children, items, gui }: { children: React.ReactNode, items: GUIDefineItem[], gui: any }) {
  return <GUIContext.Provider value={{ gui, items }}>{children}</GUIContext.Provider>;
}

export function GUIRoot(props: GUIRootProps) {
  const { items } = props;
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
    <GUIProvider gui={gui} items={items}>
      <Panel>
        {guiItems.map(renderGUIItem)}
      </Panel>
    </GUIProvider>
  );
}


