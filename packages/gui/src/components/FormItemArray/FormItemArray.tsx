import { useMemo } from "react";
import { IconTrash, IconPlus, IconEdit } from "@tabler/icons-react";
import { Flex, ActionButton, Accordion, AccordionItem, Button } from "@galacean/editor-ui";

import { FormItem, type BaseFormItemProps } from "../FormItem";

interface AccordionTitleProps {
  title: string;
  onDelete?: () => void;
  removable?: boolean;
  renameable?: boolean;
  hasChild?: boolean;
}

function AccordionTitle(props: AccordionTitleProps) {
  const { renameable, onDelete, removable } = props;
  return (
    <Flex align="v" css={{ flex: 1, justifyContent: "space-between" }}>
      <span>{props.title}</span>
      <Flex gap="xxs">
        {renameable && (
          <ActionButton
            as="div"
            variant="subtle"
            aria-hidden
            tabIndex={-1}
            size="xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onDelete) {
                onDelete();
              }
            }}
          >
            <IconEdit size="14px" />
          </ActionButton>
        )}
        {removable && (
          <ActionButton
            as="div"
            variant="subtle"
            aria-hidden
            tabIndex={-1}
            size="xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onDelete) {
                onDelete();
              }
            }}
          >
            <IconTrash size="14px" />
          </ActionButton>
        )}
      </Flex>
    </Flex>
  );
}

type GroupItem = {
  id: string;
  name: any;
  children: any;
  removable?: boolean;
  renameable?: boolean;
};

export interface FormItemArrayProps extends Omit<BaseFormItemProps<any>, 'value' | 'onChange'> {
  items: GroupItem[];
  addable?: boolean;
  addItemText?: string;
  defaultValue?: string[];
  onAdd?: () => void;
  onDelete?: (item: GroupItem) => void;
};

export function FormItemArray(props: FormItemArrayProps) {
  const {
    label,
    info,
    items = [],
    onAdd,
    onDelete,
    addItemText = "Add Item",
    defaultValue: propDefaultValue,
    addable = false,
  } = props;

  const handleItemDelete = (item: GroupItem) => () => {
    onDelete && onDelete(item);
  };

  const defaultValue = useMemo(() => {
    if (items.length) {
      return items.map((item) => `${item.id}`);
    }
    return [];
  }, [items]);

  return (
    <FormItem label={label} info={info} direction="column">
      <Accordion type="multiple" defaultValue={propDefaultValue ?? defaultValue} data-state={"closed"} >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={`${item.id}`}
            title={<AccordionTitle title={item.name} onDelete={handleItemDelete(item)} removable={item.removable} renameable={item.renameable} />}
            arrow={!!item.children}
          >
            {item.children && <Flex direction="column">{item.children}</Flex>}
          </AccordionItem>
        ))}
        {addable && (
          <Button
            size="sm"
            variant="secondary"
            css={{
              width: "100%",
              borderRadius: 0,
              "& > svg": {
                marginRight: "$1"
              }
            }}
            onClick={onAdd}
          >
            <IconPlus size="12px" /> {addItemText}
          </Button>
        )}
      </Accordion>
    </FormItem>
  );
}
