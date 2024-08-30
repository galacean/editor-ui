import { Meta, StoryFn } from "@storybook/react";
import {
  IconCodeFile,
  IconAnimationControllerFile,
  IconAnimatorClipFile,
  IconFontFile,
  IconLottieFile,
  IconPrefabFile,
  IconSceneFile,
  IconShaderFile,
  IconSpineSkeletonFile,
  IconSpineFile,
  IconSpriteFile,
  IconSpriteAltasFile,
  IconUnknownFile,
  IconVrReferenceImageFile,
} from "."
import { Flex } from '../Flex';
import { styled } from "@galacean/design-system";
 
export default {
  title: "Symbols/Iconography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Icons for different file types"
      }
    }
  }
} as Meta;

const StyledIconItem = styled('div', {
  height: '60px',
  width: '60px',
  marginBottom: '$6',
  '& > svg': {
    height: '100%',
    width: '100%'
  }
})

const Text = styled('p', {
  fontSize: '$1',
  color: '$gray10',
  textAlign: 'center',
})

function IconItem(props) {
  return (
    <StyledIconItem>
      {props.children}
    </StyledIconItem>
  )
}

export const Overview = () => {
  return (
    <Flex gap="lg" wrap>
      <IconItem>
        <IconCodeFile />
        <Text>Typescript</Text>
      </IconItem>
      <IconItem>
        <IconAnimationControllerFile />
        <Text>Animation Controller</Text>
      </IconItem>
      <IconItem>
        <IconAnimatorClipFile />
        <Text>Animator Clip</Text>
      </IconItem>
      <IconItem>
        <IconFontFile />
        <Text>Font</Text>
      </IconItem>
      <IconItem>
        <IconLottieFile />
        <Text>Lottie</Text>
      </IconItem>
      <IconItem>
        <IconPrefabFile />
        <Text>Prefab</Text>
      </IconItem>
      <IconItem>
        <IconSceneFile />
        <Text>Scene</Text>
      </IconItem>
      <IconItem>
        <IconShaderFile />
        <Text>Shader</Text>
      </IconItem>
      <IconItem>
        <IconSpineSkeletonFile />
        <Text>Spine Skeleton</Text>
      </IconItem>
      <IconItem>
        <IconSpineFile />
        <Text>Spine</Text>
      </IconItem>
      <IconItem>
        <IconSpriteFile />
        <Text>Sprite</Text>
      </IconItem>
      <IconItem>
        <IconSpriteAltasFile />
        <Text>Sprite Altas</Text>
      </IconItem>
      <IconItem>
        <IconUnknownFile />
        <Text>Unknown</Text>
      </IconItem>
      <IconItem>
        <IconVrReferenceImageFile />
        <Text>Vr Reference Image</Text>
      </IconItem>
    </Flex>
  )
}

