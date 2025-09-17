import { FormItem, extractFormItemProps } from "../FormItem";
import { Text } from "@galacean/editor-ui";
import { BaseFormItemProps } from "../FormItem/FormItem";

export interface FormItemDisplayProps extends Omit<BaseFormItemProps<string>, 'onChange'> {
  displayType?: "text" | "image";
}

export function FormItemDisplay(props: FormItemDisplayProps) {
  const { label, info, value, displayType = "text" } = props;
  return (
    <FormItem {...extractFormItemProps(props)}>
      {displayType === "text" && (
        <Text size="sm" selectable code>
          {value}
        </Text>
      )}
      {displayType === "image" && (
        <img src={value as string} alt={label} />
      )}
    </FormItem>
  );
}

export function PureFormItemDisplay({ inspectorConfig }) {
  return <FormItemDisplay {...inspectorConfig} />;
}
