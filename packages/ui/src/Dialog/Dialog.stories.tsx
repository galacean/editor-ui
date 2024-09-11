import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";
import { Input } from "../Input";
import { Select, SelectItem } from "../Select";
import { Text, Title } from "../Typography";
import { FormItem } from "../FormItem";
import { styled } from "../../design-system";

import { Dialog } from ".";

export default {
  title: "Dialog"
} as Meta<typeof Dialog>;

export const Overview: StoryFn<typeof Dialog> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <Flex gap="md">
      <Button variant="secondary" size="md" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog open={open} closable onOpenChange={(open) => setOpen(false)}>
        <Flex direction="column" gap="xs" css={{ marginBottom: "$6" }}>
          <Title order={2}>Register</Title>
          <Text>Register use password or OAuth2.0</Text>
        </Flex>
        <form action="">
          <FormItem name="Username">
            <Input placeholder="Input password" size="md" />
          </FormItem>
          <FormItem name="Password">
            <Input placeholder="Input password" size="md" />
          </FormItem>
          <FormItem name="Sex">
            <Select>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </Select>
          </FormItem>
        </form>
        <Flex gap="sm" css={{ marginTop: "$8" }}>
          <Button variant="light" size="md">
            Register
          </Button>
          <Button variant="secondary" size="md">
            Reset
          </Button>
        </Flex>
      </Dialog>
    </Flex>
  );
};
