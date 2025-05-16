import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { FormItemTable } from '.'
import { Flex, InputNumber } from '@galacean/editor-ui'

export default {
  component: FormItemTable,
} as Meta<typeof FormItemTable>

export const Overview: StoryFn<typeof FormItemTable> = (args) => {
  const [items, setItems] = useState([{ id: 0, time: 0, count: 0 }])

  const handleItemDelete = (item) => {
    setItems(items.filter((i) => i.id !== item.id))
  }

  const handleItemAdd = () => {
    const nextId = items.length > 0 ? Math.max(...items.map((item) => Number(item.id))) + 1 : 0
    setItems([...items, { id: nextId, time: 0, count: 0 }])
  }

  const columns = [
    {
      title: 'Time',
      key: 'time',
      render: (item, rowIndex) => (
        <div style={{ width: '100%', paddingRight: '4px' }}>
          <InputNumber min={0} max={10} step={0.05} dragStep={0.05} value={item.time || 0} />
        </div>
      ),
    },
    {
      title: 'Count',
      key: 'count',
      render: (item, rowIndex) => (
        <div style={{ width: '100%', paddingRight: '4px' }}>
          <InputNumber min={0} max={10} step={0.05} dragStep={0.05} value={item.count || 0} />
        </div>
      ),
    },
  ]

  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <FormItemTable
        label="Table"
        items={items}
        columns={columns}
        onAdd={handleItemAdd}
        onDelete={handleItemDelete}
        emptyText="列表为空"
        addText="添加"
      />
    </Flex>
  )
}
