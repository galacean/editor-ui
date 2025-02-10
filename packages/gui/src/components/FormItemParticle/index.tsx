import React from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { IconEaseIn, IconEqual, IconVectorBezier2, IconPlusMinus } from "@tabler/icons-react";

import { InputNumber, Select, SelectItem, BezierCurveEditor, Button } from "@galacean/editor-ui";
import { FormItem } from "../FormItem";
import { BaseFormItemProps } from "../FormItem/FormItem";
import { BezierCurveEditorProps } from "@galacean/editor-ui/src/BezierCurveEditor/types";

type ParticlePropertyType = "constant" | "curve" | "two-constant" | "two-curve";

const particlePropertyTypeOptions = [
  { type: "constant", icon: <IconEqual size="14px" />, columns: "minmax(0, 12fr) 32px" },
  { type: "curve", icon: <IconEaseIn size="14px" />, columns: "minmax(0, 12fr) 32px" },
  { type: "two-constant", icon: <IconPlusMinus size="14px" />, columns: "repeat(2, minmax(0, 12fr)) 32px" },
  { type: "two-curve", icon: <IconVectorBezier2 size="14px" />, columns: "repeat(2, minmax(0, 12fr)) 32px" }
] as const;

const defaultPoints = [
  { x: 0, y: 0 },
  { x: 0.25, y: 0.25 },
  { x: 0.75, y: 0.75 },
  { x: 1, y: 1 }
] as const;

type ParticleValue = {
  value: any;
  type: ParticlePropertyType | string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}[]

export interface FormItemParticleProps extends BaseFormItemProps<ParticleValue> {
  type?: ParticlePropertyType;
  algo?: BezierCurveEditorProps["algo"];
  onValueChange?: (value: FormItemParticleProps["value"], type: ParticlePropertyType) => void;
}

export function FormItemParticle(props: FormItemParticleProps) {
  const { label, info, value, onValueChange, algo = "bezier", ...rest } = props;
  const [propType, setPropType] = useControllableState<ParticlePropertyType>({
    prop: props.type,
    defaultProp: "constant",
    onChange: (state) => {
      if (onValueChange) {
        onValueChange(value, state as ParticlePropertyType);
      }
    }
  });
  const [valueMap, setValueMap] = useControllableState<FormItemParticleProps["value"]>({
    prop: value,
    onChange: (state) => {
      if (onValueChange) {
        onValueChange(state, propType as ParticlePropertyType);
      }
    },
    defaultProp: [
      { value: 0, type: "constant" },
      { value: defaultPoints, type: "curve" },
      { value: [0, 0], type: "two-constant" },
      { value: [defaultPoints, defaultPoints], type: "two-curve" }
    ]
  });

  function renderTypeIcon(value, location) {
    if(location === "trigger") {
      return particlePropertyTypeOptions.find((option) => option.type === value)?.icon;
    }
    return value;
  }

  const handleConstantValueChange = (value) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        return { ...item, value };
      });
    });
  };

  const handleRdConstantValueChange = (index: number) => (value: number) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        const { value: prevValue } = item;
        if (index === 0) {
          return {
            ...item,
            value: [value, prevValue[1]]
          };
        }
        if (index === 1) {
          return {
            ...item,
            value: [prevValue[0], value]
          };
        }
        return item;
      });
    });
  };

  const handleCurveValueChange = (points) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        return { ...item, value: points };
      });
    });
  };

  const handleRdCurveValueChange = (index: number) => (points) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        const { value } = item;
        if (index === 0) {
          return {
            ...item,
            value: [points, value[1]]
          };
        }
        if (index === 1) {
          return {
            ...item,
            value: [value[0], points]
          };
        }
        return item;
      });
    });
  };

  return (
    <FormItem
      label={label}
      info={info}
      fieldCss={{
        gridTemplateColumns: particlePropertyTypeOptions.find((option) => option.type === propType)?.columns,
        columnGap: "$1"
      }}
      {...rest}
    >
      {valueMap.map((item) => {
        const { type, value, min, max, step } = item;
        if (!type || propType !== type) return null;

        switch (type) {
          case "constant":
            return (
              <InputNumber
                min={min}
                max={max}
                dragStep={step}
                step={step}
                key="constant"
                value={value}
                onValueChange={handleConstantValueChange}
              />
            );
          case "curve":
            return <BezierCurveEditor key="curve" algo={algo} value={value} onChange={handleCurveValueChange} />;
          case "two-constant":
            return (
              <React.Fragment key="two-constant">
                <InputNumber
                  size="sm"
                  startSlot="min"
                  value={value[0]}
                  min={min}
                  max={max}
                  dragStep={step}
                  step={step}
                  onValueChange={handleRdConstantValueChange(0)}
                />
                <InputNumber
                  size="sm"
                  startSlot="max"
                  value={value[1]}
                  min={min}
                  max={max}
                  dragStep={step}
                  step={step}
                  onValueChange={handleRdConstantValueChange(1)}
                />
              </React.Fragment>
            );
          case "two-curve":
            return (
              <React.Fragment key="two-curve">
                <BezierCurveEditor value={value[0]} algo={algo} onChange={handleRdCurveValueChange(0)} />
                <BezierCurveEditor value={value[1]} algo={algo} onChange={handleRdCurveValueChange(1)} />
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
      <Select
        defaultValue="constant"
        position="item-aligned"
        arrow={false}
        value={propType}
        valueRenderer={renderTypeIcon}
        onValueChange={(v) => setPropType(v as ParticlePropertyType)}
      >
        {valueMap.map((option) => (
          <SelectItem value={option.type} key={option.type}>
            {option.label || option.type}
          </SelectItem>
        ))}
      </Select>
    </FormItem>
  );
}
