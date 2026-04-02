import React, { useState, useEffect, forwardRef, useRef } from 'react'

import { useInputNumberState } from './useInputNumberState'
import { clamp } from '../utils/math'

import { styled } from '../design-system'
import { Input } from '../Input'
import { mergeRefs } from '../utils/merge-refs'

const CLICK_THRESHOLD = 150

function round(value, precision = 2) {
  const power = Math.pow(10, precision)
  return Math.round(value * power + Number.EPSILON * power) / power
}

function safePlus(a, b): number {
  a = isNaN(Number(a)) ? 0 : Number(a)
  b = isNaN(Number(b)) ? 0 : Number(b)
  return round(a + b)
}

function safeTimes(a, b) {
  a = isNaN(Number(a)) ? 0 : Number(a)
  b = isNaN(Number(b)) ? 0 : Number(b)
  return round(a * b)
}

function compound<T extends (...args: any[]) => any>(fn1?: T, fn2?: T): T | undefined {
  if (!fn1 && !fn2) return undefined
  return ((...args: Parameters<T>) => {
    fn1?.(...args)
    fn2?.(...args)
  }) as T
}

const StyledNumController = styled('div', {
  position: 'absolute',
  cursor: 'ew-resize',
  inset: 0,
  borderRadius: 'inherit',
})

const StyledInputNumberRoot = styled('div', {
  position: 'relative',
  borderRadius: 'inherit',
})

export interface InputNumberProps
  extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value' | 'defaultValue' | 'type'> {
  min?: number
  max?: number
  step?: number
  dragStep?: number
  onValueChange?: (v: number) => void
  value?: number
  defaultValue?: number
}

/**
 * InputNumber is a component extending the Input component to allow for numerical input.
 *
 * This Component provide controlled and uncontrolled modes.
 */
export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  props: InputNumberProps,
  forwardedRef
) {
  const {
    size,
    min = -Infinity,
    max = Infinity,
    startSlot,
    endSlot,
    dragStep = 0.1,
    step = 0.1,
    disabled,
    onFocus,
    onValueChange,
    ...rest
  } = props

  const [accurateMode, setAccurateMode] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [focused, setFocused] = useState(false)
  const downTimeRef = useRef<number>(0)
  const dragStartXRef = useRef(0)
  const dragStartValueRef = useRef(0)
  const { ref, value, defaultValue, onBlur, onChange } = useInputNumberState({
    onChange: onValueChange,
    value: props.value,
    defaultValue: props.defaultValue,
    fallbackValue: 0,
    min,
    max,
  })

  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!dragging) return
    const nextAccurateMode = e.ctrlKey || e.metaKey
    setAccurateMode(nextAccurateMode)
    const currentStep = nextAccurateMode ? dragStep / 10 : dragStep
    const diff = safeTimes(safePlus(e.clientX, -dragStartXRef.current), currentStep)
    const newValue = clamp(safePlus(dragStartValueRef.current, diff), min, max)
    const valueString = newValue.toString()
    if (onChange) {
      onChange({ target: { value: valueString } } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, dragStep, min, max, onChange])

  const handleMouseDown = (e) => {
    e.stopPropagation()
    e.preventDefault()
    downTimeRef.current = Date.now()
    setAccurateMode(e.ctrlKey || e.metaKey)
    setDragging(true)
    dragStartXRef.current = e.clientX
    const currentValue = Number(ref.current?.value ?? props.value ?? props.defaultValue ?? 0)
    dragStartValueRef.current = Number.isNaN(currentValue) ? 0 : currentValue
  }

  const handleMouseUp = () => {
    const upTime = Date.now()
    const interval = upTime - downTimeRef.current

    if (interval < CLICK_THRESHOLD) {
      setDragging(false)
      if (ref.current) {
        ref.current.focus()
        setFocused(true)
      }
      setAccurateMode(false)
      return
    }

    setDragging(false)
    setAccurateMode(false)
  }

  function handleBlur() {
    setFocused(false)
  }

  function handleFocus() {
    setFocused(true)
  }

  return (
    <StyledInputNumberRoot>
      <Input
        ref={mergeRefs([ref, forwardedRef])}
        {...rest}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        onFocus={compound(onFocus, handleFocus)}
        onBlur={compound(onBlur, handleBlur)}
        size={size}
        min={min}
        max={max}
        step={step}
        type="number"
        startSlot={startSlot}
        endSlot={endSlot}
      />
      {!disabled && !focused && <StyledNumController onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />}
    </StyledInputNumberRoot>
  )
})
