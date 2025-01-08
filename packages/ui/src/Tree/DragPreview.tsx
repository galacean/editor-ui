import React from 'react'

import { styled, css } from '../design-system'

const StyledDragPreview = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '300px',
  height: '$7',
  fontSize: '$1',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  padding: '0 $2',
  color: 'white',
  backgroundColor: '$blue9',
  borderRadius: '$1',
  '& > span:nth-child(2)': {
    display: 'flex',
    alignItems: 'center',
    height: '$5',
    fontSize: '$xs',
    padding: '0 $2',
    borderRadius: '$round',
    backgroundColor: 'white',
    color: '$blue9',
  },
})

type IDragPreview = {
  text: React.ReactNode
  size?: number
}

function DragPreview(props: IDragPreview) {
  const { text, size } = props
  return (
    <StyledDragPreview>
      <span>{text}</span>
      {size > 1 && <span>{size}</span>}
    </StyledDragPreview>
  )
}

export { DragPreview }
