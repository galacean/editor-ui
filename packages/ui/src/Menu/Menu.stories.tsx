import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { IconMenu } from '@tabler/icons-react'

import { styled } from '../design-system'
import { Flex } from '../Flex'
import { Button } from '../Button'
import { ActionButton } from '../ActionButton'

import { ContextMenu, DropdownMenu, MenuItem, SubMenuItem, MenuGroup, MenuCheckboxItem, MenuSeparator } from './'

const File = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '$10',
  width: '$10',
  borderRadius: '$2',
  backgroundColor: '$blue6',
  color: '$blue11',
})

const Area = styled(Flex, {
  width: '200px',
  height: '50px',
  borderRadius: '$2',
  color: '$gray8',
  border: '1px dashed $gray8',
})

export default {
  title: 'Display/Menu',
  tags: ['autodocs'],
} as Meta<typeof ContextMenu>

export const Overview = (args) => {
  return (
    <Flex gap="lg">
      <DropdownMenu trigger={<Button>menu</Button>}>
        <MenuItem name="Remove" />
      </DropdownMenu>
      <ContextMenu trigger={<Area align="both">Context area</Area>}>
        <MenuItem name="Remove" />
      </ContextMenu>
    </Flex>
  )
}

Overview.args = {}

export const DropdownMenuDemo: StoryFn<any> = () => {
  return (
    <Flex gap="md">
      <DropdownMenu
        size="sm"
        trigger={
          <ActionButton>
            <IconMenu />
          </ActionButton>
        }>
        <SubMenuItem name="Animation">
          <MenuItem name="Sprite Renderer" />
          <MenuItem name="Lottie" />
          <MenuItem name="Mars" />
          <MenuItem name="Spine Animation" />
        </SubMenuItem>
        <SubMenuItem name="Clips">
          <MenuItem name="Sprite Mask" />
          <MenuItem name="Sprite Renderer" />
          <MenuItem name="Lottie" shortcuts={['⌘', 'D']} />
          <MenuItem name="Mars" />
          <MenuItem name="Spine Animation" />
        </SubMenuItem>
        <SubMenuItem name="So many submenus">
          {
            Array.from(Array(30).keys()).map((item) => (
              <MenuItem key={item} name={`Layer ${item}`} />
            ))
          }
        </SubMenuItem>
        <MenuItem name="Remove" critical />
      </DropdownMenu>
    </Flex>
  )
}

export const ContextMenuDemo: StoryFn<typeof ContextMenu> = () => {
  return (
    <ContextMenu size="sm" trigger={<Area align="both">Context area</Area>}>
      <SubMenuItem name="Animation">
        <MenuItem name="Sprite Mask" />
        <MenuItem name="Sprite Renderer" />
        <MenuItem name="Lottie" />
        <MenuItem name="Mars" />
        <MenuItem name="Spine Animation" />
      </SubMenuItem>
      <SubMenuItem name="Clips">
        <MenuItem name="Sprite Mask" />
        <MenuItem name="Sprite Renderer" />
        <MenuItem name="Lottie" />
        <MenuItem name="Mars" />
        <MenuItem name="Spine Animation" />
      </SubMenuItem>
      <MenuItem name="Remove" />
    </ContextMenu>
  )
}

ContextMenuDemo.storyName = 'ContextMenu'

ContextMenuDemo.argTypes = {}

export const ContextMenuInList = (args) => {
  return (
    <Flex gap="sm">
      {Array.from(Array(20).keys()).map((item) => (
        <ContextMenu key={item} trigger={<File onClick={() => console.log(`${item} clicked`)}>{item}</File>}>
          <MenuItem name="Add Component" shortcuts={['A', 'C']} onClick={() => console.log(`Add Component ${item}`)} />
          <SubMenuItem name="Animation">
            <MenuItem name="Sprite Mask" />
            <MenuItem name="Sprite Renderer" />
            <MenuItem name="Lottie" />
            <MenuItem name="Mars" />
            <MenuItem name="Spine Animation" />
          </SubMenuItem>
          <SubMenuItem name="Create Entity">
            <MenuItem name="Camera" shortcuts={['C']} />
            <MenuGroup label="Light" divider="both">
              <MenuItem name="Direction light" />
              <MenuItem name="Point light" />
            </MenuGroup>
            <MenuGroup label="Model" divider>
              <MenuItem name="GLTF model" />
              <MenuItem name="Geometric model" />
            </MenuGroup>
            <MenuGroup label="Animation" divider>
              <MenuItem name="Sprite Mask" />
              <MenuItem name="Sprite Renderer" />
              <MenuItem name="Lottie" />
              <MenuItem name="Mars" />
              <MenuItem name="Spine Animation" />
              <MenuCheckboxItem checked={true} name="Check me" />
            </MenuGroup>
            <MenuGroup label="Collider" divider>
              <MenuItem name="Box Collider" />
              <MenuItem name="Sphere Collider" />
              <MenuItem name="Capsule Collider" />
            </MenuGroup>
            <MenuGroup label="Script" divider={false}>
              <MenuItem name="script6688355.ts" />
              <MenuItem name="script6688356.ts" />
              <MenuItem name="Create" />
            </MenuGroup>
          </SubMenuItem>
          <MenuItem name="Duplicated" shortcuts={['⇧', '⌘', 'D']} />
          <MenuSeparator />
          <MenuItem critical name="Delete" shortcuts={['⌥', '⌘', 'D']} />
        </ContextMenu>
      ))}
    </Flex>
  )
}
