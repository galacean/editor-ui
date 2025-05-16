import { IconTrash, IconPlus } from '@tabler/icons-react'
import { Flex, ActionButton, Button, styled } from '@galacean/editor-ui'

import { FormItem, type BaseFormItemProps } from '../FormItem'

const AddItemButton = styled(Button, {
  width: '100%',
  border: 'none',
  position: 'relative',
  borderRadius: 0,
  marginTop: '$1',
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

const TableContainer = styled('div', {
  width: '100%',
  borderRadius: '$2',
  backgroundColor: '$grayA3',
  overflow: 'hidden',
  position: 'relative',
  padding: '$1',
  boxSizing: 'border-box',
})

const TableHeader = styled('div', {
  display: 'grid',
  fontSize: '$sm',
  fontWeight: 'bold',
  marginBottom: '$1',
})

const TableRow = styled('div', {
  width: '100%',
  display: 'grid',
  padding: '0 0 $1 0',
  boxSizing: 'border-box',
  alignItems: 'stretch',
})

const TableCell = styled(Flex, {
  padding: '0 $1',
  all: 'unset',
  display: 'flex',
  minHeight: '$6',
  alignItems: 'center',
  fontSize: '$sm',
  fontWeight: 500,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  color: '$gray10',
  textOverflow: 'ellipsis',
  userSelect: 'none',
})

const EmptyState = styled('div', {
  paddingBottom: '$2',
  textAlign: 'center',
  color: '$gray8',
  width: '100%',
  fontSize: '$sm',
})

export interface ColumnDef<T = any> {
  title: string
  key: string
  render?: (item: T, rowIndex: number) => React.ReactNode
  width?: string | number
}

export interface FormItemTableProps<T = any> extends Omit<BaseFormItemProps<any>, 'value' | 'onChange'> {
  items: T[]
  columns: ColumnDef<T>[]
  onAdd?: () => void
  onDelete?: (item: T) => void
  addable?: boolean
  emptyText?: string
  addText?: string
}

export function FormItemTable<T extends { id: string | number }>(props: FormItemTableProps<T>) {
  const { label, info, items = [], columns = [], onAdd, onDelete, emptyText = '', addText = '' } = props

  const isEmpty = items.length === 0
  const gridTemplateColumns = columns.length > 0 ? `${columns.map((col) => col.width || '1fr').join(' ')} 25px` : '25px'

  const renderCellContent = (item: T, column: ColumnDef<T>, rowIndex: number) => {
    if (column.render) {
      return column.render(item, rowIndex)
    }

    return String(item[column.key as keyof T] || '')
  }

  const handleItemDelete = (item: T) => () => {
    onDelete && onDelete(item)
  }

  return (
    <FormItem label={label} info={info} direction="column">
      <TableContainer>
        {columns.length > 0 && (
          <TableHeader css={{ gridTemplateColumns }}>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.title}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableHeader>
        )}
        {isEmpty ? (
          <EmptyState>{emptyText}</EmptyState>
        ) : (
          <Flex direction="column">
            {items.map((item, rowIndex) => (
              <TableRow
                key={item.id}
                css={{
                  gridTemplateColumns,
                }}>
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.key}`}>{renderCellContent(item, column, rowIndex)}</TableCell>
                ))}
                <TableCell>
                  <ActionButton variant="secondary" onClick={handleItemDelete(item)}>
                    <IconTrash size="14px" />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </Flex>
        )}
        <AddItemButton size="sm" variant="secondary" onClick={onAdd}>
          <IconPlus size="12px" />
          {addText}
        </AddItemButton>
      </TableContainer>
    </FormItem>
  )
}
