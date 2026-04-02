import React, { ChangeEvent, FocusEventHandler, MutableRefObject, useCallback, useEffect } from 'react'
import { clamp } from '../utils/math'

interface InputNumberStateOptions {
  value?: number
  defaultValue?: string | number
  onChange?(val: number): void
  fallbackValue?: number
  min?: number
  max?: number
}

interface InputNumberProps {
  ref: React.MutableRefObject<HTMLInputElement>
  onChange?(e: ChangeEvent<HTMLInputElement>): void
  onBlur?: FocusEventHandler<HTMLInputElement>
  value: string
  defaultValue?: undefined
}

export function useInputNumberState(props: InputNumberStateOptions): InputNumberProps {
  const ref = React.useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>
  const initialValue = props.value ?? props.defaultValue ?? props.fallbackValue ?? 0
  const [value, setVal] = React.useState(`${initialValue}`)
  const { fallbackValue = 0, onChange: onChangeProps, min = -Infinity, max = Infinity } = props

  const isControlled = props.value !== undefined

  const result: InputNumberProps = { ref, value, defaultValue: undefined }

  function triggerOnChange(value: number) {
    if (value !== props.value && onChangeProps) onChangeProps(value)
  }

  useEffect(() => {
    if (!isControlled) return
    if (typeof document !== 'undefined' && ref.current === document.activeElement) return
    setVal(`${props.value ?? fallbackValue}`)
  }, [fallbackValue, isControlled, props.value])

  let showNumber = value
  if (isControlled && (!ref.current || ref.current !== document.activeElement)) {
    showNumber = `${props.value ?? fallbackValue}`
  }

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value
      setVal(nextValue)

      if (nextValue === '') {
        return
      }

      const parsedValue = Number(nextValue)
      if (Number.isNaN(parsedValue)) return

      triggerOnChange(clamp(parsedValue, min, max))
    },
    [onChangeProps, min, max]
  )

  const onBlur = useCallback(
    (e) => {
      if (e.target.value === '') {
        triggerOnChange(fallbackValue)
        setVal(fallbackValue.toString())
        return
      }
      const value = clamp(Number(e.target.value), min, max)
      if (!Number.isNaN(value)) {
        setVal(`${value}`)
        triggerOnChange(value)
      } else {
        setVal(fallbackValue.toString())
        triggerOnChange(fallbackValue)
      }
    },
    [onChangeProps, min, max]
  )

  result.onChange = onChange
  result.onBlur = onBlur
  result.value = showNumber

  return result
}
