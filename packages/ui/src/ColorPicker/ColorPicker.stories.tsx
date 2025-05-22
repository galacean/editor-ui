import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Flex } from '../Flex'
import { Textarea } from '../Textarea'

import { ColorPicker } from './'

const argTypes = {
  disabled: {
    control: 'boolean',
  },
  fullsize: {
    control: 'boolean',
  },
}

export default {
  title: 'Inputs/ColorPicker',
  tags: ['autodocs'],
  component: ColorPicker,
  argTypes,
  args: {
    disabled: false,
    fullsize: true,
  },
} as Meta

export const Overview = (args) => {
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 })

  function handleOnChange(nextColor) {
    setColor(nextColor)
  }

  return (
    <Flex gap="sm" style={{ width: '300px' }} align="v" justifyContent="center">
      <ColorPicker mode="constant" value={color} onValueChange={handleOnChange} {...args} />
      <Textarea value={JSON.stringify(color)} />
    </Flex>
  )
}

Overview.argTypes = argTypes

export const GradientMode = (args) => {
  const [color, setColor] = useState([
    { value: { r: 200, g: 150, b: 35, a: 0.5 }, position: 0 },
    { value: { r: 200, g: 150, b: 35, a: 1 }, position: 1 },
  ])

  function handleOnChange(nextColor) {
    setColor(nextColor)
  }

  return (
    <Flex gap="sm" style={{ width: '300px' }} align="v" justifyContent="center">
      <ColorPicker mode="gradient" value={color} onValueChange={handleOnChange} {...args} />
      <Textarea value={JSON.stringify(color)} />
    </Flex>
  )
}

GradientMode.argTypes = argTypes

export const ParticleMode = (args) => {
  const [color, setColor] = useState({
    color: [
      { value: { r: 200, g: 150, b: 35, a: 0.5 }, position: 0 },
      { value: { r: 200, g: 150, b: 35, a: 1 }, position: 1 },
    ],
    alpha: [
      { value: { r: 255, g: 255, b: 255, a: 0.5 }, position: 0 },
      { value: { r: 255, g: 255, b: 255, a: 1 }, position: 1 },
    ],
  })

  function handleOnChange(nextColor) {
    setColor(nextColor)
  }

  return (
    <Flex gap="sm" style={{ width: '300px' }} align="v">
      <Textarea value={JSON.stringify(color)} />
      <ColorPicker mode="particle" value={color} onValueChange={handleOnChange} {...args} />
    </Flex>
  )
}

GradientMode.argTypes = argTypes

export const HDRMode = (args) => {
  const [color, setColor] = useState({
    r: 200,
    g: 150,
    b: 35,
    a: 0.8,
    intensity: 1,
  })

  function handleOnChange(nextColor) {
    setColor(nextColor)
  }

  return (
    <Flex gap="sm" style={{ width: '300px' }} align="v">
      <Textarea value={JSON.stringify(color)} />
      <ColorPicker colorSpace="Linear" mode="hdr" value={color} onValueChange={handleOnChange} />
    </Flex>
  )
}
