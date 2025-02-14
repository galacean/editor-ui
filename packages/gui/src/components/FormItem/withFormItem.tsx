 import React from 'react';
import { FormItem, type BaseFormItemProps, type FormItemProps } from './FormItem';

// 提取出FormItem特有的props类型
type FormItemSpecificProps = Omit<BaseFormItemProps<any>, 'value' | 'onChange'>;

// 原始组件的props类型
type WrappedComponentProps<T> = {
  value?: T;
  onChange?: (value: T) => void;
  [key: string]: any;
};

export function withFormItem<T, P extends FormItemProps>(
  WrappedComponent: React.FunctionComponent<P>,
  defaultFieldColumn?: FormItemProps['fieldColumn'],
  overrideFormItemProps?: Partial<P>,
) {
  return function WithFormItemComponent(
    props: P
  ) {
    // 分离FormItem的props和组件自身的props
    const {
      label,
      children,
      labelCss,
      info,
      formStartSlot,
      formEndSlot,
      fieldCss,
      css,
      size,
      direction,
    } = {
      ...props,
      ...overrideFormItemProps,
    };

    return (
      <FormItem
        label={label}
        fieldColumn={defaultFieldColumn}
        labelCss={labelCss}
        info={info}
        formStartSlot={formStartSlot}
        formEndSlot={formEndSlot}
        fieldCss={fieldCss}
        css={css}
        size={size}
        direction={direction}
      >
        {WrappedComponent(props)}
      </FormItem>
    );
  };
} 