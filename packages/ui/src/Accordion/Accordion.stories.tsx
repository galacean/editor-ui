import { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { IconBox, IconSun } from '@tabler/icons-react'

import { Badge } from '../Badge'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Input } from '../Input'
import { Select, SelectItem } from '../Select'
import { Text } from '../Typography'

import { Accordion, AccordionItem } from '.'

export default {
  title: 'Container/Accordion',
  tags: ['autodocs'],
  component: Accordion,
} as Meta<typeof Accordion>

const Panel = ({ children }: { children: React.ReactNode }) => (
  <Flex direction="column" gap="sm" css={{ width: '360px' }}>
    {children}
  </Flex>
)

export const Overview: StoryFn<typeof Accordion> = (args) => {
  return (
    <Panel>
      <Text secondary>Accordion works best as an inspector-style grouping surface instead of a floating card.</Text>
      <Accordion type="single" defaultValue="transform" collapsible {...args}>
        <AccordionItem value="transform" title="Transform">
          <Flex direction="column" gap="sm">
            <Input size="sm" variant="soft" placeholder="Position X" defaultValue="0" />
            <Input size="sm" variant="soft" placeholder="Position Y" defaultValue="1.25" />
            <Input size="sm" variant="soft" placeholder="Position Z" defaultValue="-4" />
          </Flex>
        </AccordionItem>
        <AccordionItem value="lighting" title="Lighting">
          <Flex direction="column" gap="sm">
            <Select size="sm" variant="soft" defaultValue="directional">
              <SelectItem value="directional">Directional</SelectItem>
              <SelectItem value="point">Point</SelectItem>
              <SelectItem value="spot">Spot</SelectItem>
            </Select>
            <Input size="sm" variant="soft" placeholder="Intensity" defaultValue="1" />
          </Flex>
        </AccordionItem>
        <AccordionItem value="metadata" title="Metadata">
          <Text secondary size="2">
            Collapsed groups should feel like part of the panel, not like nested popovers.
          </Text>
        </AccordionItem>
      </Accordion>
    </Panel>
  )
}

export const CustomTitleContent: StoryFn<typeof Accordion> = () => {
  return (
    <Panel>
      <Accordion type="multiple" defaultValue={['bounds']}>
        <AccordionItem
          value="bounds"
          title={
            <Flex gap="xs" align="v" css={{ fontFamily: '$mono', color: '$textStrong' }}>
              <IconBox size="14px" color="currentColor" />
              Bounding box
              <Badge css={{ marginLeft: '$1' }} color="blue">
                Active
              </Badge>
            </Flex>
          }>
          <Text secondary size="2">
            Custom title content should inherit the same density and color language as the default trigger.
          </Text>
        </AccordionItem>
        <AccordionItem
          value="sun"
          title={
            <Flex gap="xs" align="v" css={{ fontFamily: '$mono', color: '$textStrong' }}>
              <IconSun size="14px" color="currentColor" />
              Sun settings
            </Flex>
          }>
          <Flex direction="column" gap="sm">
            <Input size="sm" variant="soft" defaultValue="6500" placeholder="Temperature" />
            <Input size="sm" variant="soft" defaultValue="3.2" placeholder="Exposure" />
          </Flex>
        </AccordionItem>
      </Accordion>
    </Panel>
  )
}

export const Uncontrolled: StoryFn<typeof Accordion> = (args) => {
  return (
    <Panel>
      <Badge status="info">Single</Badge>
      <Accordion {...args} type="single" defaultValue="first" collapsible>
        <AccordionItem value="first" title="Scene">
          <Text secondary size="2">
            Default-open items should still read like embedded panel groups.
          </Text>
        </AccordionItem>
        <AccordionItem value="second" title="Rendering">
          <Text secondary size="2">
            Uncontrolled usage is ideal for simple settings sections.
          </Text>
        </AccordionItem>
      </Accordion>

      <Badge status="info">Multiple</Badge>
      <Accordion {...args} type="multiple" defaultValue={['first']}>
        <AccordionItem value="first" title="Meshes">
          <Text secondary size="2">
            Multiple mode works well for technical groups with independent visibility.
          </Text>
        </AccordionItem>
        <AccordionItem value="second" title="Materials">
          <Text secondary size="2">
            Each item keeps the same height and surface treatment for visual consistency.
          </Text>
        </AccordionItem>
      </Accordion>
    </Panel>
  )
}

export const Controlled = () => {
  const [singleValue, setSingleValue] = useState('first')
  const [multipleValue, setMultipleValue] = useState(['first'])

  return (
    <Panel>
      <Badge status="info">Controlled Single</Badge>
      <Button variant="soft" size="sm" onClick={() => setSingleValue('second')}>
        Open Rendering
      </Button>
      <Accordion type="single" value={singleValue} onValueChange={setSingleValue} collapsible>
        <AccordionItem value="first" title="Scene">
          <Text secondary size="2">
            Trigger and content should respond cleanly when state is controlled outside the component.
          </Text>
        </AccordionItem>
        <AccordionItem value="second" title="Rendering">
          <Text secondary size="2">
            The open state should only change the active group border and chevron orientation.
          </Text>
        </AccordionItem>
      </Accordion>

      <Badge status="info">Controlled Multiple</Badge>
      <Button variant="soft" size="sm" onClick={() => setMultipleValue(['first', 'second'])}>
        Open All
      </Button>
      <Accordion type="multiple" value={multipleValue} onValueChange={setMultipleValue}>
        <AccordionItem value="first" title="Physics">
          <Text secondary size="2">
            Controlled multiple accordions are useful when linked to editor presets or inspector filters.
          </Text>
        </AccordionItem>
        <AccordionItem value="second" title="Debug">
          <Text secondary size="2">
            Each section should keep the same density as other form surfaces in the system.
          </Text>
        </AccordionItem>
      </Accordion>
    </Panel>
  )
}
