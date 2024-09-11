import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Button } from "../Button";

import { AlertDialog } from ".";

export default {
  component: AlertDialog,
  argTypes: {
    onClose: {
      action: "onClosed"
    },
    onConfirm: {
      action: "onConfirm"
    }
  },
  parameters: {
    controls: {
      exclude: ["trigger"]
    }
  }
} as Meta;

export const Overview: StoryFn<typeof AlertDialog> = (args) => {
  return <AlertDialog trigger={<Button variant="primary">Open Alert Dialog</Button>} {...args} />;
};

Overview.args = {
  title: "Are you absolutely sure?",
  description:
    "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  cancelText: "Cancel",
  confirmText: "Confirm"
};

Overview.parameters = {};
