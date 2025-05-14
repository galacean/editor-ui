import React, { useState, useEffect, forwardRef } from 'react'

import { useInputNumberState } from './useInputNumberState'
import { clamp } from '../utils/math'

import type { VariantProps } from '../design-system'
import { styled } from '../design-system'
import { Input } from '../Input'
import { mergeRefs } from '../utils/merge-refs'

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

const StyledNumController = styled('div', {
  visibility: 'visible',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'ew-resize',
  '&::before': {
    left: '10px',
  },
  '&::after': {
    right: '10px',
  },
  variants: {
    active: {
      true: {
        '&::before, &::after': {
          backgroundColor: '$blue10',
        },
      },
    },
    tight: {
      true: {
        '&::before, &::after': {
          height: '30%',
        },
      },
    },
  },
})

const StyledInputNumberRoot = styled('div', {
  position: 'relative',
  '&:hover': {
    [`& ${StyledNumController}`]: {
      visibility: 'visible',
    },
  },
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
    if (onChange) {
      onChange({ target: { value: newValue.toString() } } as React.ChangeEvent<HTMLInputElement>)
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

  const [isHovering, setIsHovering] = useState(false)

  const handleMouseDown = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (ref.current) {
      ref.current.focus()
    }

    if (e.ctrlKey || e.metaKey) setAccurateMode(true)
    setDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setDragging(false)
    setAccurateMode(false)

    if (ref.current) {
      ref.current.focus()
    }
  }

  return (
    <StyledInputNumberRoot
      onMouseEnter={() => {
        setIsHovering(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
      }}>
      <Input
        ref={mergeRefs([ref, forwardedRef])}
        {...rest}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        size={size}
        min={min}
        max={max}
        step={step}
        type="number"
        startSlot={startSlot}
      />
      {!disabled && isHovering && (
        <StyledNumController
          active={dragging}
          tight={accurateMode}
          onMouseDown={handleMouseDown}
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
      )}
    </StyledInputNumberRoot>
  )
})
