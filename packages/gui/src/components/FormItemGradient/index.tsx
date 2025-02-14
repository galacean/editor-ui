import React from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { IconEaseIn, IconEqual, IconVectorBezier2, IconPlusMinus, IconHexagonLetterEFilled } from "@tabler/icons-react";

import { Button, ColorPicker, type ParticleColor, Select, SelectItem } from "@galacean/editor-ui";
import { FormItem, withFormItem } from "../FormItem";
import { type Color, normalizeColor, denormalizeColor } from "@galacean/editor-ui";

export type GradientPropertyType = "constant" | "gradient" | "two-constant" | "two-gradient";

export type IEngineParticleColor = {
  color: { value: Color; time: number }[];
  alpha: { value: number; time: number }[];
};

export type ConstantValue = {
  type: "constant";
  label?: string;
  value: Color;
};

export type TwoConstantValue = {
  type: "two-constant";
  label?: string;
  value: [Color, Color];
};

export type GradientValue = {
  type: "gradient";
  label?: string;
  value: IEngineParticleColor;
};

export type GradientInsideValue = {
  type: "gradient";
  label?: string;
  value: ParticleColor;
};

export type TwoGradientValue = {
  type: "two-gradient";
  label?: string;
  value: [IEngineParticleColor, IEngineParticleColor];
};

export type TwoGradientInsideValue = {
  type: "two-gradient";
  label?: string;
  value: [ParticleColor, ParticleColor];
};

export type ParticleColorValue = ConstantValue | TwoConstantValue | GradientValue | TwoGradientValue;
export type ParticleColorInsideValue = ConstantValue | TwoConstantValue | GradientInsideValue | TwoGradientInsideValue;

export interface FormItemGradientProps {
  type?: GradientPropertyType;
  label: string;
  info?: string;
  labelFirst?: boolean;
  value: ParticleColorValue[];
  onValueChange?: (value: FormItemGradientProps["value"], type: GradientPropertyType) => void;
}

const particlePropertyTypeOptions = [
  { type: "constant", icon: <IconEqual size="14px" />, columns: "1fr 32px" },
  { type: "gradient", icon: <IconEaseIn size="14px" />, columns: "1fr 32px" },
  { type: "two-constant", icon: <IconPlusMinus size="14px" />, columns: "repeat(2, minmax(0, 12fr)) 32px" },
  { type: "two-gradient", icon: <IconVectorBezier2 size="14px" />, columns: "repeat(2, minmax(0, 12fr)) 32px" }
] as const;

// IParticleColor -> IEngineParticleColor
function normalizeGradientValue(rootValue: ParticleColorInsideValue[]) {
  return rootValue.map((item) => {
    const { type, value } = item;
    if (type === "constant") {
      return {
        type,
        label: item.label,
        value: normalizeColor(value)
      } as ConstantValue;
    }
    if (type === "two-constant") {
      return {
        type,
        label: item.label,
        value: [normalizeColor(value[0]), normalizeColor(value[1])]
      } as TwoConstantValue;
    }
    if (type === "gradient") {
      return {
        type,
        label: item.label,
        value: {
          color: value.color.map((v) => ({
            value: normalizeColor(v.value),
            time: v.position
          })),
          alpha: value.alpha.map((v) => ({
            value: v.value.a,
            time: v.position
          }))
        }
      } as GradientValue;
    }
    if (type === "two-gradient") {
      return {
        type,
        label: item.label,
        value: [
          {
            color: value[0].color.map((c) => ({
              value: normalizeColor(c.value),
              time: c.position
            })),
            alpha: value[0].alpha.map((a) => ({
              value: a.value.a,
              time: a.position
            }))
          },
          {
            color: value[1].color.map((c) => ({
              value: normalizeColor(c.value),
              time: c.position
            })),
            alpha: value[1].alpha.map((a) => ({
              value: a.value.a,
              time: a.position
            }))
          }
        ]
      } as TwoGradientValue;
    }
    return item;
  });
}

// IEngineParticleColor -> IParticleColor
function denormalizeGradientValue(value: ParticleColorValue[]) {
  return value.map((item) => {
    const { type, value } = item;
    if (type === "constant") {
      return {
        type,
        label: item.label,
        value: denormalizeColor(value)
      } as ConstantValue;
    }
    if (type === "two-constant") {
      return {
        type,
        label: item.label,
        value: [denormalizeColor(value[0]), denormalizeColor(value[1])]
      } as TwoConstantValue;
    }
    if (type === "gradient") {
      return {
        type,
        label: item.label,
        value: {
          color: value.color.map((v) => ({
            value: denormalizeColor(v.value),
            position: v.time
          })),
          alpha: value.alpha.map((v) => ({
            value: { r: 255, g: 255, b: 255, a: v.value },
            position: v.time
          }))
        }
      } as GradientInsideValue;
    }
    if (type === "two-gradient") {
      return {
        type,
        label: item.label,
        value: [
          {
            color: value[0].color.map((c) => ({
              value: denormalizeColor(c.value),
              position: c.time
            })),
            alpha: value[0].alpha.map((a) => ({
              value: { r: 255, g: 255, b: 255, a: a.value },
              position: a.time
            }))
          },
          {
            color: value[1].color.map((c) => ({
              value: denormalizeColor(c.value),
              position: c.time
            })),
            alpha: value[1].alpha.map((a) => ({
              value: { r: 255, g: 255, b: 255, a: a.value },
              position: a.time
            }))
          }
        ]
      } as TwoGradientInsideValue;
    }
    return item;
  });
}

export function FormItemGradient(props: FormItemGradientProps) {
  const { label, labelFirst, info, value } = props;
  const [valueMap, setValueMap] = useControllableState({
    prop: denormalizeGradientValue(value),
    onChange: (state) => {
      if (props.onValueChange) {
        props.onValueChange(normalizeGradientValue(state), propType as GradientPropertyType);
      }
    }
  });

  const [propType, setPropType] = useControllableState<GradientPropertyType>({
    prop: props.type,
    defaultProp: "constant",
    onChange: (state) => {
      if (props.onValueChange) {
        props.onValueChange(value, state as GradientPropertyType);
      }
    }
  });

  function renderTypeIcon(type, location) {
    if(location === "trigger") {
      return particlePropertyTypeOptions.find((option) => option.type === type)?.icon;
    }
    return type;

  }

  const handleConstantValueChange = (value) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        return { ...item, value };
      });
    });
  };

  const handleTwoConstantValueChange = (index: number) => (value: Color) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        const { value: prevValue } = item as TwoConstantValue;
        if (item.type === "two-constant") {
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
        }
        return item;
      });
    });
  };

  const handleCurveValueChange = (points: ParticleColor) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        if (item.type === "gradient") {
          return {
            ...item,
            value: points
          } as GradientInsideValue;
        }
        return item;
      });
    });
  };

  const handleTwoCurveValueChange = (index: number) => (points: ParticleColor) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item;
        if (item.type === "two-gradient") {
          const { value } = item;
          if (index === 0) {
            return {
              ...item,
              value: [points, value[1]]
            } as TwoGradientInsideValue;
          }
          if (index === 1) {
            return {
              ...item,
              value: [value[0], points]
            } as TwoGradientInsideValue;
          }
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
      }}
    >
      {valueMap.map((item) => {
        const { type, value } = item;
        if (!type || propType !== type) return null;

        switch (type) {
          case "constant":
            return (
              <ColorPicker
                fullsize
                key="constant"
                mode="constant"
                value={value}
                onValueChange={handleConstantValueChange}
              />
            );
          case "gradient":
            return (
              <ColorPicker
                fullsize
                key="gradient"
                mode="particle"
                value={value}
                onValueChange={handleCurveValueChange}
              />
            );
          case "two-constant":
            return (
              <React.Fragment key="two-constant">
                <ColorPicker
                  fullsize
                  mode="constant"
                  value={value[0]}
                  onValueChange={handleTwoConstantValueChange(0)}
                />
                <ColorPicker
                  fullsize
                  mode="constant"
                  value={value[1]}
                  onValueChange={handleTwoConstantValueChange(1)}
                />
              </React.Fragment>
            );
          case "two-gradient":
            return (
              <React.Fragment key="two-gradient">
                <ColorPicker fullsize mode="particle" value={value[0]} onValueChange={handleTwoCurveValueChange(0)} />
                <ColorPicker fullsize mode="particle" value={value[1]} onValueChange={handleTwoCurveValueChange(1)} />
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
      <Select
        defaultValue="constant"
        position="item-aligned"
        cornerArrow
        value={propType}
        valueRenderer={renderTypeIcon}
        onValueChange={(v) => setPropType(v as GradientPropertyType)}
      >
        {valueMap.map((option) => (
          <SelectItem
            value={option.type}
            key={option.type}
          >
            {option.label || option.type}
          </SelectItem>
        ))}
      </Select>
    </FormItem>
  );
}
