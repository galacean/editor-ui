import { Fragment, ReactNode, useEffect, useState } from "react";
import { ActionButton, InputNumber } from "@galacean/editor-ui";
import { ConstrainIcon } from "../../Icons/ConstrainIcon";
import { FormItem, withFormItem, type BaseFormItemProps } from "../FormItem";

export type Vector3 = { x: number; y: number; z: number; };

const ConstrainButton = function ConstrainButton(props: { active: boolean; onClick: (e) => void }) {
  return (
    <ActionButton onClick={props.onClick} variant="subtle" fancy>
      <ConstrainIcon active={props.active} />
    </ActionButton>
  );
};

export interface FormItemVector3Props extends Omit<BaseFormItemProps<Vector3>, 'onChange'> {
  min?: number;
  max?: number;
  onChange?: (value: Vector3, key: keyof Vector3) => void;
  constrainable?: boolean;
};

export function _FormItemVector3(props: FormItemVector3Props) {
  const { label, info, value, onChange, disabled, min, max, constrainable = false, formEndSlot, ...rest } = props;
  const [constrainMode, setConstrainMode] = useState(false);

  const handleOnChange = (prefix: keyof Vector3) => (v: number) => {
    if (!onChange) return;
    const result = { ...value, [prefix]: v };
    let currentValue = value[prefix];
    if (value[prefix] === 0) {
      currentValue = 1;
    }
    const ratio = v / currentValue;

    if (constrainMode && v !== 0) {
      for (const key in result) {
        if (key !== prefix) {
          result[key] = value[key] * ratio;
        }
      }
    }

    onChange && onChange(result, prefix);
  };

  const handleToggleConstrain = (e) => {
    setConstrainMode(!constrainMode);
  };

  let endSlot: ReactNode = null;
  if (formEndSlot) {
    endSlot = formEndSlot;
  } else {
    if (constrainable) {
      endSlot = <ConstrainButton active={constrainMode} onClick={handleToggleConstrain} />;
    }
  }

  return [
    <InputNumber
      disabled={disabled}
      startSlot="X"
      key="x"
      min={min}
      max={max}
      value={value.x}
      onValueChange={handleOnChange("x")}
    />,
    <InputNumber
      disabled={disabled}
      min={min}
      max={max}
      startSlot="Y"
      key="y"
      value={value.y}
      onValueChange={handleOnChange("y")}
    />,
    <InputNumber
      disabled={disabled}
      min={min}
      max={max}
      startSlot="Z"
      key="z"
      value={value.z}
      onValueChange={handleOnChange("z")}
    />
  ]
}

export const FormItemVector3 = withFormItem(_FormItemVector3, "3");