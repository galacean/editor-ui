import { ButtonHTMLAttributes, HtmlHTMLAttributes, useEffect, useState } from 'react'
import { styled } from '../design-system'
import { IPoint } from './types'
import { IconCirclePlus, IconCirclePlusFilled, IconCircleXFilled } from '@tabler/icons-react'
import { Flex } from '../Flex'
import { Button } from '../Button'

const PresetPath = styled('path', {
  fill: 'none',
  stroke: '$grayA8',
  strokeWidth: '1.5px',
  transition: 'stroke .2s ease-in-out, stroke-width .2s ease-in-out',
})

const PresetSvg = styled('svg', {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '&:hover': {
    [`& ${PresetPath}`]: {
      stroke: '$orange10',
      strokeWidth: '2px',
    },
  },
})

const defaultPresets = [
  [
    { x: 0, y: 0 },
    { x: 0.2, y: 0.8 },
    { x: 0.8, y: 0.2 },
    { x: 1, y: 1 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0.25, y: 0.75 },
    { x: 0.75, y: 0.75 },
    { x: 1, y: 0 },
  ],
  [
    {
      x: 0,
      y: 0,
    },
    {
      x: 0.7,
      y: 0,
    },
    {
      x: 1,
      y: 0.5,
    },
    {
      x: 1,
      y: 1,
    },
  ],
  [
    {
      x: 0,
      y: 0,
    },
    {
      x: 0.42,
      y: 0,
    },
    {
      x: 0.58,
      y: 1,
    },
    {
      x: 1,
      y: 1,
    },
  ],
]

const PresetList = styled('div', {
  width: '100%',
  display: 'grid',
  padding: '$1 0',
  gridTemplateColumns: 'repeat(5, 1fr)',
  alignItems: 'center',
  gap: '$2',
})

const DeleteButton = styled('button', {
  all: 'unset',
  position: 'absolute',
  right: 0,
  top: 0,
  borderRadius: '$round',
  color: '$gray9',
  transform: 'translate(50%, -50%)',
  '&:hover': {
    color: '$red10',
  },
})

const CurvePresetItem = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '$8',
  borderRadius: '$2',
  color: '$grayA9',
  cursor: 'pointer',
  backgroundColor: '$appBackground',
  border: '1px solid $grayA3',
  transition: 'color .2s ease-in-out',
  '&:hover': {
    color: '$orange10',
  },
})

interface PresetItemProps extends React.HTMLAttributes<HTMLDivElement> {
  points?: IPoint[]
  width?: number
  height?: number
  deletable?: boolean
  onDelete?: () => void
}

function PresetItem(props: PresetItemProps) {
  const { points, width = 74, height = 34, deletable = false, onDelete, ...rest } = props
  const genPath = (points) => {
    if (points.length < 4) {
      return ''
    }

    let d = `M${points[0].x * width} ${points[0].y * height}`

    for (let i = 1; i < points.length; i += 3) {
      d += ` C${points[i].x * width} ${-points[i].y * height}, ${points[i + 1].x * width} ${-points[i + 1].y * height}, ${points[i + 2].x * width} ${-points[i + 2].y * height}`
    }

    return d
  }
  return (
    <CurvePresetItem {...rest}>
      <PresetSvg width={width} height={height} viewBox={`0 -${height} ${width} ${height}`}>
        <PresetPath d={genPath(points)} />
      </PresetSvg>
      {deletable && (
        <DeleteButton>
          <IconCircleXFilled size="14px" onClick={onDelete} />
        </DeleteButton>
      )}
    </CurvePresetItem>
  )
}

interface BezierCurveEditorProps {
  presets?: IPoint[][]
  onApplyPreset: (points: IPoint[]) => void
  onAddPreset: () => void
  onDeletePreset: (index: number) => void
}

export function BezierCurvePresets(props: BezierCurveEditorProps) {
  const { presets = [], onApplyPreset, onAddPreset, onDeletePreset } = props
  const [deletable, setDeletable] = useState(false)

  return (
    <>
      <Flex
        align="v"
        justifyContent="between"
        css={{ fontSize: '$1', marginTop: '$7', color: '$gray11', userSelect: 'none' }}>
        Pesets
        {presets.length > 0 && (
          <Button variant="subtle" onClick={() => setDeletable(!deletable)}>
            {deletable ? 'Done' : 'Edit'}
          </Button>
        )}
      </Flex>
      <PresetList>
        {defaultPresets.map((points, index) => (
          <PresetItem key={index} points={points} onClick={() => onApplyPreset && onApplyPreset(points)} />
        ))}
        {presets.map((points, index) => (
          <PresetItem
            deletable={deletable}
            key={index}
            points={points}
            onDelete={() => onDeletePreset(index)}
            onClick={() => onApplyPreset && onApplyPreset(points)}
          />
        ))}
        <CurvePresetItem onClick={onAddPreset}>
          <IconCirclePlusFilled size="16px" />
        </CurvePresetItem>
      </PresetList>
    </>
  )
}
