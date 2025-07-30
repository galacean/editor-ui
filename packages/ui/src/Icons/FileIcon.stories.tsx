import { Meta } from '@storybook/react'
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
} from '.'
import { Flex } from '../Flex'
import { styled } from '../design-system'
import IconPending from './Files/Pending'

export default {
  title: 'Symbols/Iconography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'We provide a set of icons for different file types. These icons are used in the file explorer and other places in the editor.',
      },
    },
  },
} as Meta

const StyledIconItem = styled(Flex, {
  marginBottom: '0 $6',
  gap: '$3',
  '& svg': {
    height: '60px',
    width: '60px',
  },
})

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
  gap: '$3',
  alignItems: 'self-start',
  width: '600px',
})

const Text = styled('p', {
  fontSize: '$1',
  color: '$gray10',
  textAlign: 'center',
})

function IconItem(props) {
  return (
    <StyledIconItem align="both" direction="column">
      {props.children}
    </StyledIconItem>
  )
}

export const Overview = () => {
  return (
    <Grid>
      <IconItem>
        <IconPending />
      </IconItem>
      <IconItem>
        <IconCodeFile />
        <Text>Typescript</Text>
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
      <IconItem>
        <IconAnimationControllerFile />
        <Text>Animation Controller</Text>
      </IconItem>
      <IconItem>
        <IconSpineSkeletonFile />
        <Text>Spine Skeleton</Text>
      </IconItem>
    </Grid>
  )
}
