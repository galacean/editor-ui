import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";
import { Text } from "../";

import { toast } from "./";

const promise = new Promise((s, j) => {
  setTimeout(() => {
    s(true);
  }, 3000);
});

export default {
  title: "Toast"
};

export const Overview: StoryFn = (args) => {
  return (
    <Flex gap="md">
      <Button onClick={() => toast("hello!")}>info</Button>
      <Button
        onClick={async () => {
          const id = toast.loading("hello!");
          toast.dismiss(id);
        }}
      >
        loading
      </Button>
      <Button
        onClick={() => {
          toast.promise(promise, {
            loading: "loading...",
            success: "success",
            error: "error"
          });
        }}
      >
        toast with promise
      </Button>
      <Button onClick={() => toast.success("Member Added!", { duration: 100000 })}>sucess</Button>
      <Button onClick={() => toast.error("hello!")}>error</Button>
      <Button
        onClick={() => {
          toast(
            (t) => {
              return (
                <Flex align="v">
                  <Text size="sm" secondary>
                    Custom and Undoable toast
                  </Text>
                  <Button css={{ marginLeft: "$2" }} size="sm" onClick={() => toast.dismiss(t.id)} variant="secondary">
                    Undo
                  </Button>
                </Flex>
              );
            },
            {
              duration: 3000
            }
          );
        }}
      >
        toast custom
      </Button>
    </Flex>
  );
};
