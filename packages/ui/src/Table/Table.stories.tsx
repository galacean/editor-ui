import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Flex } from "../Flex";
import { Button } from "../Button";

import { Table } from "./";

type Props = any;

const dataSource = [
  {
    key: "1",
    name: "Bob",
    age: 32,
    address: "Beijing, China"
  },
  {
    key: "2",
    name: "Kevin",
    age: 42,
    address: "Hangzhou, China"
  }
];

const columns = [
  {
    title: "key",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "operation",
    dataIndex: "operation",
    key: "operation",
    render: (_, record) => {
      return <Button size="sm">delete</Button>;
    }
  }
];

export default {
  component: Table
} as Meta<typeof Table>;

export const Overview: StoryFn<typeof Table> = (args) => {
  return (
    <Flex gap="md">
      <Table columns={columns} dataSource={dataSource} rowKey="key" />
    </Flex>
  );
};
