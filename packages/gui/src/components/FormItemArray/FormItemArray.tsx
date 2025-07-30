import { useMemo } from 'react'
import { IconTrash, IconPlus, IconEdit } from '@tabler/icons-react'
import { Flex, ActionButton, Accordion, AccordionItem, Button, styled } from '@galacean/editor-ui'

import { FormItem, type BaseFormItemProps } from '../FormItem'

interface AccordionTitleProps {
  title: string
  onDelete?: () => void
  removable?: boolean
  renameable?: boolean
  hasChild?: boolean
}

const AddItemButton = styled(Button, {
  width: '100%',
  border: 'none',
  position: 'relative',
  borderRadius: 0,
  '& > svg': {
    marginRight: '$1',
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    borderTop: '1px solid $grayA2',
  },
})

function AccordionTitle(props: AccordionTitleProps) {
  const { renameable, onDelete, removable } = props
  return (
    <Flex align="v" css={{ flex: 1, justifyContent: 'space-between' }}>
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
              e.preventDefault()
              e.stopPropagation()
              if (onDelete) {
                onDelete()
              }
            }}>
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
              e.preventDefault()
              e.stopPropagation()
              if (onDelete) {
                onDelete()
              }
            }}>
            <IconTrash size="14px" />
          </ActionButton>
        )}
      </Flex>
    </Flex>
  )
}

type GroupItem = {
  id: string
  name: any
  children: any
  removable?: boolean
  renameable?: boolean
}

export interface FormItemArrayProps extends Omit<BaseFormItemProps<any>, 'value' | 'onChange'> {
  items: GroupItem[]
  addable?: boolean
  addItemText?: string
  defaultValue?: string[]
  onAdd?: () => void
  onDelete?: (item: GroupItem) => void
}

export function FormItemArray(props: FormItemArrayProps) {
  const {
    label,
    info,
    items = [],
    onAdd,
    onDelete,
    addItemText = 'Add Item',
    defaultValue: propDefaultValue,
    addable = false,
  } = props

  const handleItemDelete = (item: GroupItem) => () => {
    onDelete && onDelete(item)
  }

  const defaultValue = useMemo(() => {
    if (items.length) {
      return items.map((item) => `${item.id}`)
    }
    return []
  }, [items])

  return (
    <FormItem label={label} info={info} direction="column">
      <Accordion type="multiple" defaultValue={propDefaultValue ?? defaultValue}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={`${item.id}`}
            title={
              <AccordionTitle
                title={item.name}
                onDelete={handleItemDelete(item)}
                removable={item.removable}
                renameable={item.renameable}
              />
            }
            arrow={!!item.children}>
            {item.children && <Flex direction="column">{item.children}</Flex>}
          </AccordionItem>
        ))}
        {addable && (
          <AddItemButton size="sm" variant="secondary" onClick={onAdd}>
            <IconPlus size="12px" /> {addItemText}
          </AddItemButton>
        )}
      </Accordion>
    </FormItem>
  )
}
