import React, { useState, useEffect, forwardRef, useRef } from 'react'

import { useInputNumberState } from './useInputNumberState'
import { clamp } from '../utils/math'

import type { VariantProps } from '../design-system'
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
})

const StyledInputNumberRoot = styled('div', {
  position: 'relative',
})

export interface InputNumberProps
  extends VariantProps<typeof Input>,
    Omit<React.ComponentProps<typeof Input>, 'onChange'> {
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
    dragStep = 0.1,
    step = 0.1,
    disabled,
    onValueChange,
    ...rest
  } = props

  const [accurateMode, setAccurateMode] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [focused, setFocused] = useState(false)
  const downTimeRef = useRef<number>(0)
  const [startX, setStartX] = useState(0)
  const { ref, value, defaultValue, onBlur, onChange } = useInputNumberState({
    onChange: onValueChange,
    value: props.value,
    fallbackValue: 0,
    min,
    max,
  })

  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setAccurateMode(e.ctrlKey || e.metaKey)
    const step = accurateMode ? dragStep / 10 : dragStep
    if (!dragging) return
    const diff = safeTimes(safePlus(e.clientX, -startX), step)
    const newValue = clamp(safePlus(props.value, diff), min, max)
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
  }, [dragging, accurateMode])

  const handleMouseDown = (e) => {
    e.stopPropagation()
    e.preventDefault()
    downTimeRef.current = Date.now()
    if (e.ctrlKey || e.metaKey) setAccurateMode(true)
    setDragging(true)
    setStartX(e.clientX)
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
      return
    }

    setDragging(false)
    setAccurateMode(false)
  }

  function handleBlur() {
    setFocused(false)
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
        onBlur={compound(onBlur, handleBlur)}
        size={size}
        min={min}
        max={max}
        step={step}
        type="number"
        startSlot={startSlot}
      />
      {!disabled && !focused && <StyledNumController onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />}
    </StyledInputNumberRoot>
  )
})
