import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";

import { Accordion, AccordionItem } from ".";
import { IconBox, IconSun } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "../Badge";
import { Separator } from "../Separator";

export default {
  title: "Container/Accordion",
  tags: ['autodocs'],
  component: Accordion,
} as Meta<typeof Accordion>;

export const Overview: StoryFn<typeof Accordion> = (args) => {
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <Accordion type="single">
        <AccordionItem value="first" title="First item">
          first
        </AccordionItem>
        <AccordionItem value="second" title="Second item">
          second
        </AccordionItem>
        <AccordionItem value="third" title="Third item">
          third
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

/**
 * You could also use custom components for the title content by passing a `ReactNode` to the `title` prop.
 */
export const CustomTitleContent: StoryFn<typeof Accordion> = (args) => {
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <Accordion type="multiple">
        <AccordionItem
          value="first"
          title={
            <Flex gap="xs" align="v" css={{ fontFamily: "$mono" }}>
              <IconBox style={{ color: "var(--colors-blue10)" }} size="14px" />
              Bounding box 1
            </Flex>
          }
        >
          Bounding box 1
        </AccordionItem>
        <AccordionItem
          value="second"
          title={
            <Flex gap="xs" align="v" css={{ fontFamily: "$mono" }}>
              <IconBox style={{ color: "var(--colors-blue10)" }} size="14px" />
              Bounding box 2
            </Flex>
          }
        >
          Bounding box 2
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export const Uncontrolled = function Controlled(args) {
  return (
    <Flex gap="sm" direction="column" style={{ width: '300px' }}>
      <Badge status="info">Single Mode</Badge>
      <Accordion {...args} type="single" defaultValue="first">
        <AccordionItem value="first" title="First item">
          first
        </AccordionItem>
        <AccordionItem value="second" title="Second item">
          first
        </AccordionItem>
      </Accordion>
      <Separator />
      <Badge status="info">Multiple Mode</Badge>
      <Accordion {...args} type="multiple" defaultValue={["first"]}>
        <AccordionItem value="first" title="First item">
          first
        </AccordionItem>
        <AccordionItem value="second" title="Second item">
          first
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export const Controlled = function Uncontrolled(args) {
  const [value0, setValue0] = useState('first'); 
  const [value1, setValue1] = useState(['first']); 

  return (
    <Flex gap="sm" direction="column" style={{ width: '300px' }}>
      <Badge status="info">Single Mode</Badge>
      <Button onClick={() => setValue0('second')}>Open Second Accordion</Button>
      <Accordion {...args} type="single" value={value0} onValueChange={setValue0}>
        <AccordionItem value="first" title="First item">
          first
        </AccordionItem>
        <AccordionItem value="second" title="Second item">
          first
        </AccordionItem>
      </Accordion>
      <Separator />
      <Badge status="info">Multiple Mode</Badge>
      <Button onClick={() => setValue1(['first', 'second'])}>Open All Accordion</Button>
      <Accordion {...args} type="multiple" value={value1} onValueChange={setValue1}>
        <AccordionItem value="first" title="First item">
          first
        </AccordionItem>
        <AccordionItem value="second" title="Second item">
          first
        </AccordionItem>
      </Accordion>
    </Flex>
  );
} 