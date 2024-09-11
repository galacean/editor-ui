import { ComponentProps, ReactNode } from "react";
import { FormItem } from "./FormItem";
import { Input, Button, Textarea, CascadeSlider } from "..";

interface GUIComponentProps {
  label: string;
  info?: ReactNode;
  formStartSlot?: ReactNode;
  formEndSlot?: ReactNode;
}

function generateGUI<T extends React.JSXElementConstructor<any> | keyof React.JSX.IntrinsicElements>(Component: T, defaultProps?: ComponentProps<T>) {
  function GUIComponent(props: ComponentProps<T> & GUIComponentProps) {
    const { label, info, formStartSlot, formEndSlot, ...rest } = props;
    return (
      <FormItem label={label} info={info} formStartSlot={formStartSlot} formEndSlot={formEndSlot}>
        <Component {...defaultProps} {...rest as ComponentProps<T>} />
      </FormItem>
    );
  }

  // GUIComponent.displayName = Component.displayName;

  return GUIComponent;
}

export { FormItem };

export const FormItemButton = generateGUI(Button, {
  variant: "secondary",
});
export const FormItemInput = generateGUI(Input);
export const FormItemTextarea = generateGUI(Textarea);
export const FormItemCascadeSlider = generateGUI(CascadeSlider);

export { FormItemColor, type FormItemColorProps } from './FormItemColor'
export { FormItemGroup, type FormItemGroupProps } from './FormItemGroup'
export { FormItemInputNumber, type FormItemInputNumberProps } from './FormItemInputNumber'
export { FormItemToggle, type FormItemToggleProps } from './FormItemToggle'
export * from './FormItemVector2'
export * from './FormItemVector3'
export * from './FormItemVector4'
export * from './FormItemRect'
export { FormItemSlider, type FormItemSliderProps } from './FormItemSlider'
export { FormItemSegmentControl, type FormItemSegmentControlProps } from './FormItemSegmentControl'
export { FormItemArray, type FormItemArrayProps } from './FormItemArray'
export { FormItemSelect, type FormItemSelectProps } from './FormItemSelect'
export { FormItemToggleGroup, type FormItemToggleGroupProps } from './FormItemToggleGroup'
export { FormItemDisplay, type FormItemDisplayProps } from './FormItemDisplay'
export { FormItemAssetPicker, type FormItemAssetPickerProps } from './FormItemAssetPicker'
export {
  FormItemGradient,
  type FormItemGradientProps,
  type TwoGradientValue,
  type GradientPropertyType,
  type GradientValue,
} from './FormItemGradient'
export { FormItemParticle, type FormItemParticleProps } from './FormItemParticle'

