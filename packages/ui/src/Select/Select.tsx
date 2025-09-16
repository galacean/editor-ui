import {
  Select as SingleSelect,
  SelectItem as SingleSelectItem,
  type SelectProps as SingleSelectProps,
  type SelectItemProps as SingleSelectItemProps,
} from './SingleSelect'

import { Combobox, ComboboxItem, type ComboboxProps, type ComboboxItemProps } from './Combobox'

import { SelectProvider, useSelectProvider } from './SelectProvider'

export type SelectProps = SingleSelectProps | ComboboxProps

export function Select(props: SelectProps) {
  return (
    <SelectProvider multiple={(props as ComboboxProps).multiple}>
      {(props as ComboboxProps).multiple ? (
        <Combobox {...(props as ComboboxProps)} />
      ) : (
        <SingleSelect {...(props as SingleSelectProps)} />
      )}
    </SelectProvider>
  )
}

export type SelectItemProps = SingleSelectItemProps | ComboboxItemProps

export function SelectItem(props: SelectItemProps & { size?: 'xs' | 'sm' | 'md' }) {
  const { multiple } = useSelectProvider()

  if (multiple) {
    return <ComboboxItem {...(props as ComboboxItemProps)} />
  }

  return <SingleSelectItem {...(props as SingleSelectItemProps)} />
}
