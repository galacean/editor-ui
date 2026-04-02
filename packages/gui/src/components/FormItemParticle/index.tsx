import React from 'react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { IconEaseIn, IconEqual, IconVectorBezier2, IconPlusMinus } from '@tabler/icons-react'

import { InputNumber, Select, SelectItem, BezierCurveEditor } from '@galacean/editor-ui'
import type { BezierCurveEditorProps } from '@galacean/editor-ui'
import { FormItem } from '../FormItem'
import { FormItemProps } from '../FormItem/FormItem'

export type ParticlePropertyType = 'constant' | 'curve' | 'two-constant' | 'two-curve'

const particlePropertyTypeOptions = [
  { type: 'constant', icon: <IconEqual size="14px" />, columns: 'minmax(0, 12fr) 32px' },
  { type: 'curve', icon: <IconEaseIn size="14px" />, columns: 'minmax(0, 12fr) 32px' },
  { type: 'two-constant', icon: <IconPlusMinus size="14px" />, columns: 'repeat(2, minmax(0, 12fr)) 32px' },
  { type: 'two-curve', icon: <IconVectorBezier2 size="14px" />, columns: 'repeat(2, minmax(0, 12fr)) 32px' },
] as const

function renderTypeIcon(value, location) {
  if (location === 'trigger') {
    return particlePropertyTypeOptions.find((option) => option.type === value)?.icon
  }
  return value
}

const defaultPoints = [
  { x: 0, y: 0 },
  { x: 0.25, y: 0.25 },
  { x: 0.75, y: 0.75 },
  { x: 1, y: 1 },
] as const

type ParticleValue = {
  value: any
  type: ParticlePropertyType | string
  label?: string
  min?: number
  max?: number
  step?: number
}[]

type CurveScaleProps = Pick<
  BezierCurveEditorProps,
  'yTickScale' | 'yRangeMode' | 'onYTickScaleChange' | 'onYTickScaleCommit' | 'yTickScaleMin' | 'yTickScaleMax'
>

export interface FormItemParticleCurveProps extends FormItemProps<ParticleValue>, CurveScaleProps {
  type?: ParticlePropertyType
  algo?: BezierCurveEditorProps['algo']
  /** Hide the mode type selector. The grid column space is still reserved. */
  hideTypeSelector?: boolean
  onValueChange?: (value: FormItemParticleCurveProps['value'], type: ParticlePropertyType) => void
}

export function FormItemParticleCurve(props: FormItemParticleCurveProps) {
  const {
    label,
    info,
    value,
    onValueChange,
    algo = 'bezier',
    yRangeMode,
    yTickScale,
    yTickScaleMin,
    yTickScaleMax,
    onYTickScaleChange,
    onYTickScaleCommit,
    hideTypeSelector,
    ...rest
  } = props
  const [propType, setPropType] = useControllableState<ParticlePropertyType>({
    prop: props.type,
    defaultProp: 'constant',
    onChange: (state) => {
      if (onValueChange) {
        onValueChange(value, state as ParticlePropertyType)
      }
    },
  })
  const [valueMap, setValueMap] = useControllableState<FormItemParticleCurveProps['value']>({
    prop: value,
    onChange: (state) => {
      if (onValueChange) {
        onValueChange(state, propType as ParticlePropertyType)
      }
    },
    defaultProp: [
      { value: 0, type: 'constant' },
      { value: defaultPoints, type: 'curve' },
      { value: [0, 0], type: 'two-constant' },
      { value: [defaultPoints, defaultPoints], type: 'two-curve' },
    ],
  })

  const handleConstantValueChange = (value) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item
        return { ...item, value }
      })
    })
  }

  const handleRdConstantValueChange = (index: number) => (value: number) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item
        const { value: prevValue } = item
        if (index === 0) {
          return {
            ...item,
            value: [value, prevValue[1]],
          }
        }
        if (index === 1) {
          return {
            ...item,
            value: [prevValue[0], value],
          }
        }
        return item
      })
    })
  }

  const handleCurveValueChange = (points) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item
        return { ...item, value: points }
      })
    })
  }

  const handleRdCurveValueChange = (index: number) => (points) => {
    setValueMap((prev) => {
      return prev.map((item) => {
        if (item.type !== propType) return item
        const { value } = item
        if (index === 0) {
          return {
            ...item,
            value: [points, value[1]],
          }
        }
        if (index === 1) {
          return {
            ...item,
            value: [value[0], points],
          }
        }
        return item
      })
    })
  }

  const curveProps = {
    algo,
    yRangeMode,
    yTickScale,
    yTickScaleMin,
    yTickScaleMax,
    onYTickScaleChange,
    onYTickScaleCommit,
  }

  return (
    <FormItem
      label={label}
      info={info}
      fieldCss={{
        gridTemplateColumns: particlePropertyTypeOptions.find((option) => option.type === propType)?.columns,
        columnGap: '$1',
      }}
      {...rest}>
      {valueMap.map((item) => {
        const { type, value, min, max, step } = item
        if (!type || propType !== type) return null

        switch (type) {
          case 'constant':
            return (
              <InputNumber
                key="constant"
                min={min}
                max={max}
                dragStep={step}
                step={step}
                value={value}
                onValueChange={handleConstantValueChange}
              />
            )
          case 'curve':
            return <BezierCurveEditor key="curve" {...curveProps} value={value} onChange={handleCurveValueChange} />
          case 'two-constant':
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
            )
          case 'two-curve':
            return (
              <React.Fragment key="two-curve">
                <BezierCurveEditor {...curveProps} value={value[0]} onChange={handleRdCurveValueChange(0)} />
                <BezierCurveEditor {...curveProps} value={value[1]} onChange={handleRdCurveValueChange(1)} />
              </React.Fragment>
            )
          default:
            return null
        }
      })}
      {!hideTypeSelector && (
        <Select
          value={propType}
          position="item-aligned"
          cornerArrow
          valueRenderer={renderTypeIcon}
          onValueChange={(v: string) => setPropType(v as ParticlePropertyType)}>
          {valueMap.map((option) => (
            <SelectItem value={option.type} key={option.type}>
              {option.label || option.type}
            </SelectItem>
          ))}
        </Select>
      )}
    </FormItem>
  )
}
