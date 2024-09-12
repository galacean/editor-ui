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
} from '../'
import { FormItemRectProps, Rect } from '../FormItemRect/FormItemRect';

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

interface GUIItemBaseConfig {
  label: string;
  info?: React.ReactNode;
  formStartSlot?: React.ReactNode;
  formEndSlot?: React.ReactNode;
}

type GUIItemDefinition<T extends Record<string, any> = {}> = {
  type: GUIItemType;
  value: any;
}


interface GUIItemStringConfig extends FormItemInpu {
  type: GUIItemType.String;
  value: number;
}

interface GUIItemNumberConfig extends GUIItemBaseConfig {
  type: GUIItemType.Number;
  value: number;
}

interface GUIItemSliderConfig extends GUIItemBaseConfig {
  type: GUIItemType.Number;
  value: number;
}

interface GUIItemColorConfig extends GUIItemBaseConfig {
  type: GUIItemType.Color;
  value: string; // rgba
}

interface GUIItemGroupConfig extends GUIItemBaseConfig {
  type: GUIItemType.Group;
  items: GUIItemDefinition[];
}

interface GUIItemRectConfig extends GUIItemBaseConfig, FormItemRectProps {
  type: GUIItemType.Rect;
}

interface GUIItemToggleConfig extends GUIItemBaseConfig {
  type: GUIItemType.Toggle;
  value: boolean;
}

interface GUIItemVector2Config extends GUIItemBaseConfig {
  type: GUIItemType.Vector2;
  value: { x: number; y: number };
}

interface GUIItemVector3Config extends GUIItemBaseConfig {
  type: GUIItemType.Vector3;
  value: { x: number; y: number; z: number };
}

interface GUIItemVector4Config extends GUIItemBaseConfig {
  type: GUIItemType.Vector4;
  value: { x: number; y: number; z: number; w: number };
}

interface GUIItemSliderConfig extends GUIItemBaseConfig {
  type: GUIItemType.Slider;
  value: number;
}

interface GUIItemSegmentControlConfig extends GUIItemBaseConfig {
  type: GUIItemType.SegmentControl;
  value: string;
}

interface GUIItemArrayConfig extends GUIItemBaseConfig {
  type: GUIItemType.Array;
  value: any[];
}

interface GUIItemSelectConfig extends GUIItemBaseConfig {
  type: GUIItemType.Select;
  value: string;
}

interface GUIItemButtonConfig extends GUIItemBaseConfig {
  type: GUIItemType.Button;
}

interface GUIItemTextareaConfig extends GUIItemBaseConfig {
  type: GUIItemType.Textarea;
  value: string;
}

interface GUIItemCascadeSliderConfig extends GUIItemBaseConfig {
  type: GUIItemType.CascadeSlider;
  value: number;
}

type GUIItemConfig =
  | GUIItemColorConfig
  | GUIItemGroupConfig
  | GUIItemInputNumberConfig
  | GUIItemRectConfig
  | GUIItemToggleConfig
  | GUIItemVector2Config
  | GUIItemVector3Config
  | GUIItemVector4Config
  | GUIItemSliderConfig
  | GUIItemSegmentControlConfig
  | GUIItemArrayConfig
  | GUIItemSelectConfig
  | GUIItemButtonConfig
  | GUIItemInputConfig
  | GUIItemTextareaConfig
  | GUIItemCascadeSliderConfig;


type GUIContextType = {
  gui: {
    items: GUIItemDefinition[];
    onAdd: (item: GUIItemDefinition) => void;
  };
};

const GUIContext = React.createContext<GUIContextType>({
  gui: null
});

function GUIProvider({ children, gui }) {
  return <GUIContext.Provider value={{ gui }}>{children}</GUIContext.Provider>;
}

interface GUIRootProps {
  data: Record<string, any>;
  items?: GUIItemDefinition[];
}

export function GUIRoot(props: GUIRootProps) {
  const { data, items } = props;
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
    <GUIProvider gui={gui}>
      <Panel>
        {guiItems.map((item) => (
        ))}
      </Panel>
    </GUIProvider>
  );
}


