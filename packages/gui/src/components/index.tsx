import { PropsWithChildren } from "react";
import { FormItem } from "./FormItem";
import { Input, Button, Textarea, CascadeSlider, CSS, } from "@galacean/editor-ui";
import { BaseFormItemProps } from "./FormItem/FormItem";

function generateGUI<T>() {
  return <C extends React.JSXElementConstructor<any>>(Component: C, defaultProps?: React.ComponentProps<C>) => {
    return function GUIComponent(props: React.ComponentProps<C> & BaseFormItemProps<T>) {
      const { label, info, formStartSlot, formEndSlot, ...rest } = props;
      return (
        <FormItem label={label} info={info} formStartSlot={formStartSlot} formEndSlot={formEndSlot}>
          <Component {...defaultProps} {...rest as typeof defaultProps} />
        </FormItem>
      );
    }
  }
}

export type FormItemButtonProps = PropsWithChildren<Omit<BaseFormItemProps<string>, 'value' | 'onChange'>>;
export const FormItemButton = generateGUI<string>()(Button); 

export type FormItemCascadeSliderProps = BaseFormItemProps<number[]>;
export const FormItemCascadeSlider = generateGUI<number[]>()(CascadeSlider);

export { FormItemInput, type FormItemInputProps } from './FormItemInput'
export { FormItemSelect, type FormItemSelectProps } from './FormItemSelect'

export { FormItemColor, type FormItemColorProps } from './FormItemColor'
export { type Color } from '@galacean/editor-ui'
export { FormItemGroup, type FormItemGroupProps } from './FormItemGroup'
export { FormItemInputNumber, type FormItemInputNumberProps } from './FormItemInputNumber'
export { FormItemTextarea, type FormItemTextareaProps, } from './FormItemTextarea'

export { FormItemToggle, type FormItemToggleProps } from './FormItemToggle'
export { FormItemToggleGroup, type FormItemToggleGroupProps } from './FormItemToggleGroup'


export * from './FormItemVector2'
export * from './FormItemVector3'
export * from './FormItemVector4'
export * from './FormItemRect'
export { FormItemSlider, type FormItemSliderProps } from './FormItemSlider'
export { FormItemSegmentControl, type FormItemSegmentControlProps } from './FormItemSegmentControl'
export { FormItemArray, type FormItemArrayProps } from './FormItemArray'
export { FormItemDisplay, type FormItemDisplayProps } from './FormItemDisplay'
export * from './FormItemAssetPicker'
export {
  FormItemGradient,
  type FormItemGradientProps,
  type TwoGradientValue,
  type GradientPropertyType,
  type GradientValue,
} from './FormItemGradient'
export { FormItemParticle, type FormItemParticleProps } from './FormItemParticle'

export {
  FormItem,
  type BaseFormItemProps,
  type FormItemSelectableProps,
  type FormItemRangeProps
} from './FormItem'