import { Meta, StoryFn } from "@storybook/react";
import { GradientSlider as GradientSliderPrimitive } from "./"
import { ParticleSlider as ParticleSliderPrimitive } from "./"
import { Flex } from "../Flex";

export default {
  title: "Inputs/ColorSlider",
  tags: ['autodocs'],
  args: {

  },
  parameters: {
    docs: {
      description: {
        component: "The ColorSlider provide two types of sliders: `<GradientSlider />` and `<ParticleSlider />.`",
      },
    },
  }
} as Meta;


export const Overview: StoryFn = (args) => {
  return (
    <Flex gap="md" style={{ width: '300px' }}>
      <GradientSlider />
      <ParticleSlider />
    </Flex>
  );
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