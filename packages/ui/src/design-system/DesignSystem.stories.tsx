import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { styled, lightTheme } from '.'
import { semanticColors } from './colors'
import { fontSizes, radii, shadows, sizes, space } from './sizes'

const StoryPage = styled('div', {
  minHeight: '100vh',
  padding: '$6',
  backgroundColor: '$appBg',
  backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 120px)',
  color: '$textStrong',
})

const Hero = styled('header', {
  display: 'grid',
  gap: '$2',
  marginBottom: '$6',
})

const Eyebrow = styled('div', {
  fontSize: '$0_5',
  lineHeight: '$lineHeights$1',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '$textMuted',
})

const Title = styled('h1', {
  margin: 0,
  fontSize: '$6',
  lineHeight: '$lineHeights$6',
  fontWeight: 600,
})

const Intro = styled('p', {
  margin: 0,
  maxWidth: '720px',
  fontSize: '$2',
  lineHeight: '$lineHeights$3',
  color: '$text',
})

const Section = styled('section', {
  marginBottom: '$6',
})

const SectionTitle = styled('h2', {
  margin: '0 0 $3 0',
  fontSize: '$4',
  lineHeight: '$lineHeights$4',
  fontWeight: 600,
  color: '$textStrong',
})

const SectionDescription = styled('p', {
  margin: '0 0 $4 0',
  color: '$text',
  fontSize: '$1',
  lineHeight: '$lineHeights$2',
  maxWidth: '760px',
})

const Grid = styled('div', {
  display: 'grid',
  gap: '$3',
  variants: {
    columns: {
      two: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      three: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
      four: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      },
    },
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

const Card = styled('div', {
  backgroundColor: '$panelBg',
  border: '1px solid $border',
  borderRadius: '$lg',
  padding: '$4',
  boxShadow: '$1',
  minWidth: 0,
})

const ThemeFrame = styled('div', {
  borderRadius: '$lg',
  border: '1px solid $border',
  backgroundColor: '$appBg',
  padding: '$4',
  minHeight: '240px',
})

const ThemeHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$3',
})

const Label = styled('div', {
  fontSize: '$0_5',
  lineHeight: '$lineHeights$1',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '$textMuted',
})

const ThemeName = styled('div', {
  fontSize: '$2',
  lineHeight: '$lineHeights$2',
  fontWeight: 600,
  color: '$textStrong',
})

const SurfaceStack = styled('div', {
  display: 'grid',
  gap: '$2',
})

const SurfaceCard = styled('div', {
  borderRadius: '$md',
  border: '1px solid $border',
  padding: '$3',
})

const SurfaceHeading = styled('div', {
  fontSize: '$1',
  lineHeight: '$lineHeights$2',
  fontWeight: 600,
  color: '$textStrong',
})

const SurfaceText = styled('div', {
  fontSize: '$0_5',
  lineHeight: '$lineHeights$1',
  color: '$textMuted',
  marginTop: '$0_5',
})

const SwatchGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '$3',
})

const SwatchCard = styled('div', {
  borderRadius: '$md',
  overflow: 'hidden',
  border: '1px solid $border',
  backgroundColor: '$panelBg',
})

const SwatchPreview = styled('div', {
  height: '$10',
  borderBottom: '1px solid $border',
})

const SwatchMeta = styled('div', {
  padding: '$2',
  display: 'grid',
  gap: '$0_5',
})

const TokenName = styled('div', {
  fontSize: '$1',
  lineHeight: '$lineHeights$1',
  fontWeight: 600,
  color: '$textStrong',
})

const TokenValue = styled('div', {
  fontSize: '$0_5',
  lineHeight: '$lineHeights$1',
  color: '$textMuted',
  fontFamily: '$mono',
})

const ScaleList = styled('div', {
  display: 'grid',
  gap: '$2',
})

const ScaleRow = styled('div', {
  display: 'grid',
  gridTemplateColumns: '120px minmax(0, 1fr) 80px',
  gap: '$3',
  alignItems: 'center',
})

const ScaleLabel = styled('div', {
  fontSize: '$1',
  lineHeight: '$lineHeights$1',
  color: '$textStrong',
  fontFamily: '$mono',
})

const ScaleValue = styled('div', {
  fontSize: '$0_5',
  lineHeight: '$lineHeights$1',
  color: '$textMuted',
  fontFamily: '$mono',
  textAlign: 'right',
})

const Bar = styled('div', {
  height: '$2',
  borderRadius: '$round',
  backgroundColor: '$primary',
})

const RadiusPreview = styled('div', {
  width: '$10',
  height: '$8',
  backgroundColor: '$surfaceStrong',
  border: '1px solid $borderStrong',
})

const ShadowPreview = styled('div', {
  height: '$8',
  borderRadius: '$md',
  backgroundColor: '$surface',
  border: '1px solid $border',
})

const SemanticTokenGrid = styled('div', {
  display: 'grid',
  gap: '$3',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
})

const semanticSwatches = [
  'primary',
  'primaryActive',
  'textMuted',
  'text',
  'textStrong',
  'textInverted',
  'softBg',
  'softBgHover',
  'softBgActive',
  'surface',
  'surfaceSubtle',
  'surfaceStrong',
  'surfaceOverlay',
  'successBg',
  'successBorder',
  'successText',
  'dangerBg',
  'dangerBorder',
  'dangerText',
  'warningBg',
  'warningText',
  'infoBg',
  'infoText',
  'selectionBg',
  'selectionBorder',
  'panelBg',
  'toastBg',
  'secondaryBg',
  'border',
  'borderStrong',
  'focusRing',
] as const

const controlSizeTokens = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const denseControlTokens = ['controlXs', 'controlSm', 'controlMd', 'controlLg'] as const
const iconSizeTokens = ['iconXs', 'iconSm', 'iconMd', 'iconLg'] as const
const compactSpaceTokens = ['0_5', '1', '1_5', '2', '3', '4', '5', '6', '7', '8', '10'] as const
const radiusTokens = ['xs', 'sm', 'md', 'lg', 'xl', 'round'] as const
const shadowTokens = ['1', '2', '3', 'focus', 'subtleFocus'] as const

function ThemeShowcase(props: { themeClassName?: string; name: string }) {
  const { themeClassName, name } = props

  return (
    <ThemeFrame className={themeClassName}>
      <ThemeHeader>
        <ThemeName>{name}</ThemeName>
        <Label>{themeClassName ? 'Light Theme' : 'Dark Theme'}</Label>
      </ThemeHeader>
      <SurfaceStack>
        <SurfaceCard css={{ backgroundColor: '$surface' }}>
          <SurfaceHeading>Surface</SurfaceHeading>
          <SurfaceText>Base editing surface and input shells.</SurfaceText>
        </SurfaceCard>
        <SurfaceCard css={{ backgroundColor: '$surfaceSubtle' }}>
          <SurfaceHeading>Surface Subtle</SurfaceHeading>
          <SurfaceText>Hover states, weak containers and quiet controls.</SurfaceText>
        </SurfaceCard>
        <SurfaceCard css={{ backgroundColor: '$surfaceStrong' }}>
          <SurfaceHeading>Surface Strong</SurfaceHeading>
          <SurfaceText>Pressed states and stronger separation inside panels.</SurfaceText>
        </SurfaceCard>
        <SurfaceCard css={{ backgroundColor: '$softBg' }}>
          <SurfaceHeading>Soft Background</SurfaceHeading>
          <SurfaceText>Editor button and field fills for the soft variant family.</SurfaceText>
        </SurfaceCard>
        <SurfaceCard css={{ backgroundColor: '$panelBg' }}>
          <SurfaceHeading>Panel Background</SurfaceHeading>
          <SurfaceText>Inspector panels, menus and nested editor chrome.</SurfaceText>
        </SurfaceCard>
      </SurfaceStack>
    </ThemeFrame>
  )
}

export default {
  title: 'Foundations/Design System',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta

export const Overview: StoryFn = () => {
  return (
    <StoryPage>
      <Hero>
        <Eyebrow>Foundations</Eyebrow>
        <Title>Design System</Title>
        <Intro>
          This page documents the editor foundations behind the component library: semantic color roles, surface
          hierarchy, control sizing, spacing rhythm, radius decisions and shadow usage.
        </Intro>
      </Hero>

      <Section>
        <SectionTitle>Theme Surfaces</SectionTitle>
        <SectionDescription>
          The system is built around semantic surfaces instead of raw gray steps. The same role tokens should drive
          panels, controls, overlays and text across dark and light themes.
        </SectionDescription>
        <Grid columns="two">
          <ThemeShowcase name="Dark" />
          <ThemeShowcase name="Light" themeClassName={lightTheme.className} />
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Semantic Colors</SectionTitle>
        <SectionDescription>
          These are the recommended color roles for components. Use semantic tokens first; avoid binding components
          directly to raw `gray`, `blue`, `green` or `red` scales unless the component is explicitly visualizing data.
        </SectionDescription>
        <SwatchGrid>
          {semanticSwatches.map((token) => (
            <SwatchCard key={token}>
              <SwatchPreview css={{ backgroundColor: `$${token}` }} />
              <SwatchMeta>
                <TokenName>{token === 'secondaryBg' ? 'secondaryBg (Legacy)' : token}</TokenName>
                <TokenValue>{semanticColors[token]}</TokenValue>
              </SwatchMeta>
            </SwatchCard>
          ))}
        </SwatchGrid>
      </Section>

      <Section>
        <SectionTitle>Control Sizes</SectionTitle>
        <SectionDescription>
          Public sizes follow common component-library expectations, while dense editor forms can still opt into the
          explicit control aliases.
        </SectionDescription>
        <Grid columns="two">
          <Card>
            <Label>Public Control Heights</Label>
            <ScaleList css={{ marginTop: '$3' }}>
              {controlSizeTokens.map((token) => (
                <ScaleRow key={token}>
                  <ScaleLabel>{token}</ScaleLabel>
                  <Bar css={{ width: sizes[token], height: '$2' }} />
                  <ScaleValue>{sizes[token]}</ScaleValue>
                </ScaleRow>
              ))}
            </ScaleList>
          </Card>
          <Card>
            <Label>Dense Editor Controls</Label>
            <ScaleList css={{ marginTop: '$3', marginBottom: '$4' }}>
              {denseControlTokens.map((token) => (
                <ScaleRow key={token}>
                  <ScaleLabel>{token}</ScaleLabel>
                  <Bar css={{ width: sizes[token], height: '$2' }} />
                  <ScaleValue>{sizes[token]}</ScaleValue>
                </ScaleRow>
              ))}
            </ScaleList>
            <Label>Icon Sizes</Label>
            <ScaleList css={{ marginTop: '$3' }}>
              {iconSizeTokens.map((token) => (
                <ScaleRow key={token}>
                  <ScaleLabel>{token}</ScaleLabel>
                  <Bar css={{ width: sizes[token], height: sizes[token], borderRadius: '$round' }} />
                  <ScaleValue>{sizes[token]}</ScaleValue>
                </ScaleRow>
              ))}
            </ScaleList>
          </Card>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Spacing Rhythm</SectionTitle>
        <SectionDescription>
          Layout spacing follows a 4px rhythm with a few 2px and 6px bridge tokens for dense editor controls.
        </SectionDescription>
        <Card>
          <ScaleList>
            {compactSpaceTokens.map((token) => (
              <ScaleRow key={token}>
                <ScaleLabel>{token}</ScaleLabel>
                <Bar css={{ width: space[token], height: '$1_5' }} />
                <ScaleValue>{space[token]}</ScaleValue>
              </ScaleRow>
            ))}
          </ScaleList>
        </Card>
      </Section>

      <Section>
        <SectionTitle>Typography and Shape</SectionTitle>
        <SectionDescription>
          Type and radius are intentionally restrained. Buttons and dense inputs should mostly sit on 4px or 6px
          corners, while larger panels and overlays can step up to 8px.
        </SectionDescription>
        <Grid columns="two">
          <Card>
            <Label>Font Sizes</Label>
            <ScaleList css={{ marginTop: '$3' }}>
              {(['0_5', '1', '1_5', '2', '3', '4', '5', '6'] as const).map((token) => (
                <ScaleRow key={token}>
                  <ScaleLabel>{token}</ScaleLabel>
                  <div style={{ fontSize: fontSizes[token], color: 'var(--colors-gray12)' }}>Aa</div>
                  <ScaleValue>{fontSizes[token]}</ScaleValue>
                </ScaleRow>
              ))}
            </ScaleList>
          </Card>
          <Card>
            <Label>Radii</Label>
            <SemanticTokenGrid css={{ marginTop: '$3' }}>
              {radiusTokens.map((token) => (
                <div key={token}>
                  <RadiusPreview css={{ borderRadius: `$${token}` }} />
                  <TokenName css={{ marginTop: '$2' }}>{token}</TokenName>
                  <TokenValue>{radii[token]}</TokenValue>
                </div>
              ))}
            </SemanticTokenGrid>
          </Card>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Shadows and Focus</SectionTitle>
        <SectionDescription>
          Shadows are intentionally limited. Use the first three for elevation only, and reserve `focus` or
          `subtleFocus` for state rings instead of structural borders.
        </SectionDescription>
        <SemanticTokenGrid>
          {shadowTokens.map((token) => (
            <Card key={token}>
              <ShadowPreview css={{ boxShadow: `$${token}` }} />
              <TokenName css={{ marginTop: '$3' }}>{token}</TokenName>
              <TokenValue>{shadows[token]}</TokenValue>
            </Card>
          ))}
        </SemanticTokenGrid>
      </Section>
    </StoryPage>
  )
}
