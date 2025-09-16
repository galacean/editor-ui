import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { styled } from '../design-system'

const StyledSegmentControlItem = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  textWrap: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: '100%',
  color: '$grayA10',
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  cursor: 'pointer',
  padding: '0 $1_5',
  borderRadius: 'inherit',
  gap: '$1',
  transition: 'all .2s ease',
  userSelect: 'none',
  '& > svg': {
    height: '14px',
    width: '14px',
  },
  '&:hover': {
    color: '$grayA12',
  },
  '&[data-state=checked]': {
    backgroundColor: '$grayA3',
    color: '$white',
    boxShadow: 'inset 0 0 0 1px $colors$grayA4',
    '&:hover': {
      color: '$white',
    },
  },
  '&:focus-visible': {
    position: 'relative',
    boxShadow: 'inset 0 0 0 1px $colors$grayA8',
  },
})

const StyledSegmentControlRoot = styled(RadioGroupPrimitive.Root, {
  display: 'inline-grid',
  backgroundColor: '$grayA3',
  gridAutoColumns: '1fr',
  gridAutoFlow: 'column',
  width: '100%',
  alignItems: 'center',
  borderRadius: '$2',
  variants: {
    size: {
      sm: {
        height: '$sm',
        fontSize: '$1',
      },
      md: {
        height: '$md',
        fontSize: '$2',
        borderRadius: '$4',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const SegmentControl = StyledSegmentControlRoot
const SegmentControlItem = StyledSegmentControlItem

export { SegmentControl, SegmentControlItem }
