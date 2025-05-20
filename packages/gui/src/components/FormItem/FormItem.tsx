import React, { cloneElement, forwardRef, ReactElement, ReactNode } from 'react'
import { styled, type CSS, VariantProps } from '@galacean/editor-ui'
import { v4 as uuidv4 } from 'uuid'
import { Label } from './Label'

const StyledField = styled('div', {
  display: 'grid',
  columnGap: '$1',
  gridColumn: '2 / -1',
  alignItems: 'flex-start',
  variants: {
    withoutLabel: {
      true: {
        gridColumn: '1 / -1',
      },
    },
    column: {
      1: {
        gridTemplateColumns: '1fr',
      },
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      color: {
        gridTemplateColumns: '24px 1fr 52px',
      },
      number: {
        gridTemplateColumns: 'minmax(0, 8fr) repeat(2, 1fr)',
      },
      asset: {
        gridTemplateColumns: 'minmax(0, 8fr) $sm $sm',
      },
    },
  },
})

const StyledFormItem = styled('div', {
  display: 'grid',
  width: '100%',
  padding: '$0_5',
  gridTemplateColumns: 'minmax(0px, 1.3fr) repeat(3, minmax(0px, 1fr))',
  gridTemplateRows: 'auto',
  columnGap: '$1',
  alignItems: 'center',
  variants: {
    withoutLabel: {
      true: {
        gridTemplateColumns: '1fr',
      },
    },
    direction: {
      column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'normal',
        gap: '$1',
      },
      row: {},
    },
  },
})

export interface BaseFormItemProps<V> {
  label?: string
  info?: ReactNode
  disabled?: boolean
  value?: V
  defaultValue?: V
  onChange?: (value: V) => void
  formEndSlot?: ReactNode
  formStartSlot?: ReactNode
  direction?: 'column' | 'row'
}

export interface FormItemRangeProps extends BaseFormItemProps<number> {
  min?: number
  max?: number
  step?: number
  dragStep?: number
}

export interface FormItemSelectableProps<T> extends BaseFormItemProps<T> {
  options: { value: T; label: ReactNode }[]
}

export interface FormItemProps<T = any> extends BaseFormItemProps<T> {
  children?: React.ReactNode
  css?: CSS
  labelCss?: CSS
  fieldCss?: CSS
  size?: 'sm' | 'md'
  fieldColumn?: VariantProps<typeof StyledField>['column']
}

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(function FormItem(props, forwardedRef) {
  const {
    label: propLabel,
    fieldColumn,
    children,
    labelCss,
    info,
    formStartSlot,
    formEndSlot,
    fieldCss,
    css,
    size = 'sm',
    direction = 'row',
    ...rest
  } = props

  const name = propLabel

  const labelId = `${(name ?? '').replace(/\s/g, '-')}-${uuidv4()}`
  const withoutLabel = !propLabel

  const decorateChildren = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        id: labelId,
        size,
        label: name,
        // ...controlledProp,
      })
    }
    return null
  })

  return (
    <StyledFormItem ref={forwardedRef} direction={direction} withoutLabel={withoutLabel} css={css} {...rest}>
      {!withoutLabel && (
        <Label
          info={info}
          htmlFor={labelId}
          label={name ?? ''}
          css={labelCss}
          startSlot={formStartSlot}
          endSlot={formEndSlot}
        />
      )}
      <StyledField column={fieldColumn} withoutLabel={withoutLabel} css={fieldCss}>
        {decorateChildren}
      </StyledField>
    </StyledFormItem>
  )
})

export { FormItem }
