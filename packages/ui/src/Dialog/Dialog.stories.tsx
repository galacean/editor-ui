import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";
import { Text, Title } from "../Typography";

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
      </Dialog>
    </Flex>
  );
};
