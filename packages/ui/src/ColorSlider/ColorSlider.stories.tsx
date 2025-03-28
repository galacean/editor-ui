import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { GradientSlider as GradientSliderPrimitive } from './'
import { ParticleSlider as ParticleSliderPrimitive } from './'
import { HDRSlider as HDRSliderPrimitive } from './'
import { Flex } from '../Flex'

export default {
  title: 'Inputs/ColorSlider',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          'The ColorSlider provide three types of sliders: `<GradientSlider />`, `<ParticleSlider />`, and `<HDRSlider />`. Each serves different purposes in color selection and manipulation.',
      },
    },
  },
} as Meta

export const Overview: StoryFn = (args) => {
  const [hdrColor, setHdrColor] = useState({
    value: { r: 255, g: 100, b: 50, a: 1 },
    intensity: 0,
  })

  return (
    <Flex gap="md" direction="column" style={{ width: '300px' }}>
      <GradientSlider />
      <ParticleSlider />
      <HDRSliderPrimitive HDRColor={hdrColor} onChange={setHdrColor} />
    </Flex>
  )
}

/**
 * The `<GradientSlider />` component is designed to handle displaying color thumbs and gradients in a slider. Most of the time this component is used to handle gradients in a color picker.
 *
 * - double click on the top or bottom of the slider to add a new thumb.
 * - pick a thumb and drag down to remove it.
 *
 * This component provide both controlled and uncontrolled modes.
 *
 * > If you want to use the GradientSlider in a controlled mode, you have to keep in mind that the `colors` property must contain at least two `GradientColor` colors.
 */
export const GradientSlider: StoryFn = (args) => {
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <GradientSliderPrimitive />
    </Flex>
  )
}

/**
 * The `<ParticleSlider />` component is designed to handle displaying and color thumbs and transparent thumbs in a slider. Most of the time this component is used to handle gradients in a color picker.
 *
 * - double click on the top or bottom of the slider to add a new thumb.
 * - pick a thumb and drag down to remove it.
 *
 * This component provide both controlled and uncontrolled modes.
 *
 * > If you want to use the GradientSlider in a controlled mode, you have to keep in mind that the `colors` property must contain at least two `ParticleColor` colors.
 */
export const ParticleSlider: StoryFn = (args) => {
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <ParticleSliderPrimitive />
    </Flex>
  )
}

/**
 * The `<HDRSlider />` component is designed for handling High Dynamic Range (HDR) color adjustments. It allows users to modify the intensity of colors beyond the standard RGB range, making it possible to represent very bright or very dark colors more accurately.
 *
 * This slider provides:
 * - A numerical input for precise intensity values
 * - A slider for intuitive adjustment
 * - A preview panel showing the effect of different intensity levels on the selected color
 *
 * The component works with HDR color values where:
 * - The base color is represented in standard RGB format
 * - The intensity value determines how bright or dark the color appears
 * - Positive intensity values make colors brighter (beyond standard RGB limits)
 * - Negative intensity values make colors darker
 *
 * This component provides both controlled and uncontrolled modes.
 *
 * > When using HDRSlider in controlled mode, you need to provide both the base color and intensity values through the `HDRColor` prop.
 */
export const HDRSlider: StoryFn = (args) => {
  const [hdrColor, setHdrColor] = useState({
    value: { r: 255, g: 100, b: 50, a: 1 },
    intensity: 0,
  })

  return (
    <Flex gap="md" direction="column" style={{ width: '300px' }}>
      <HDRSliderPrimitive HDRColor={hdrColor} onChange={setHdrColor} />
    </Flex>
  )
}
