import { ComponentProps, ReactNode } from "react";
import { FormItem } from "./FormItem";
import { Input, Button, Textarea, CascadeSlider, Checkbox } from "..";

interface GUIComponentProps {
  name: string;
  info?: ReactNode;
  formStartSlot?: ReactNode;
  formEndSlot?: ReactNode;
}

function generateGUI<T extends React.JSXElementConstructor<any> | keyof React.JSX.IntrinsicElements>(Component: T, defaultProps?: ComponentProps<T>) {
  function GUIComponent(props: ComponentProps<T> & GUIComponentProps) {
    const { name, info, formStartSlot, formEndSlot, ...rest } = props;
    return (
      <FormItem name={name} info={info} formStartSlot={formStartSlot} formEndSlot={formEndSlot}>
        <Component {...defaultProps} {...rest as ComponentProps<T>} />
      </FormItem>
    );
  }

  // GUIComponent.displayName = Component.displayName;

  return GUIComponent;
}


export const FormItemButton = generateGUI(Button, {
  variant: "secondary",
});
export const FormItemInput = generateGUI(Input);
export const FormItemTextarea = generateGUI(Textarea);
export const FormItemCascadeSlider = generateGUI(CascadeSlider);

export { FormItemColor, type FormItemColorProps } from './FormItemColor'
export { FormItemGroup, type FormItemGroupProps } from './FormItemGroup'
export { FormItemInputNumber, type FormItemInputNumberProps } from './FormItemInputNumber'
export { FormItemRect, type FormItemRectProps } from './FormItemRect'
export { FormItemToggle, type FormItemToggleProps } from './FormItemToggle'
export { FormItemVector2, type FormItemVector2Props } from './FormItemVector2'
export { FormItemVector3, type FormItemVector3Props } from './FormItemVector3'
export { FormItemVector4, type FormItemVector4Props } from './FormItemVector4'
export { FormItemSlider, type FormItemSliderProps } from './FormItemSlider'
export { FormItemSegmentControl, type FormItemSegmentControlProps } from './FormItemSegmentControl'
export { FormItemArray, type FormItemArrayProps } from './FormItemArray'
export { FormItemSelect, type FormItemSelectProps } from './FormItemSelect'

