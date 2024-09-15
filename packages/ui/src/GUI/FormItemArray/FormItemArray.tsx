import React, { PropsWithChildren, useMemo } from "react";
import { IconTrash, IconPlus } from "@tabler/icons-react";

import { FormItem } from "../FormItem";
import { Flex } from "../../Flex";
import { ActionButton } from "../../ActionButton";
import { Accordion, AccordionItem } from "../../Accordion";
import { Button } from "../../Button";
import { BaseFormItemProps } from "../FormItem/FormItem";

interface AccordionTitleProps {
  title: string;
  onDelete?: () => void;
  removable?: boolean;
  hasChild?: boolean;
}

function AccordionTitle(props: AccordionTitleProps) {
  return (
    <Flex align="v" css={{ flex: 1, justifyContent: "space-between" }}>
      <span>{props.title}</span>
      {props.removable && (
        <ActionButton
          as="div"
          variant="subtle"
          aria-hidden
          tabIndex={-1}
          size="xs"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (props.onDelete) {
              props.onDelete();
            }
          }}
        >
          <IconTrash size="14px" />
        </ActionButton>
      )}
    </Flex>
  );
}

type GroupItem = {
  id: number;
  name: string;
  children: any;
  removable?: boolean;
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
    <FormItem label={label} info={info}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "normal",
        gap: "$1",
      }}
    >
      <Accordion type="multiple" defaultValue={propDefaultValue ?? defaultValue} data-state={"closed"}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={`${item.id}`}
            title={<AccordionTitle title={item.name} onDelete={handleItemDelete(item)} removable={item.removable} />}
            arrow={!!item.children}
          >
            {item.children && <Flex direction="column">{item.children}</Flex>}
          </AccordionItem>
        ))}
        {addable ? (
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
        ) : null}
      </Accordion>
    </FormItem>
  );
}
