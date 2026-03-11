import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { IconTriangleInvertedFilled } from '@tabler/icons-react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { styled, StitchesComponent } from '../design-system'

const StyledContent = styled(CollapsiblePrimitive.Content, {
  borderRadius: '0 0 $sm $sm',
  padding: '0 $1 $1 $1',
  backgroundColor: '$panelBg',
  '&:empty': {
    padding: 0,
  },
  variants: {
    guideline: {
      true: {
        position: 'relative',
        paddingLeft: '$1 !important',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '1px',
          height: '100%',
          backgroundColor: '$grayA5',
          left: -1,
        },
      },
    },
  },
})

const StyledTitle = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  lineHeight: 1,
  justifyContent: 'space-between',
  color: '$text',
  padding: '0 $1 0 $1',
  minHeight: '$controlSm',
  fontSize: '$1',
  userSelect: 'none',
  backgroundColor: '$panelBg',
})

const StyledTitleContent = styled('div', {
  flex: 1,
})

const StyledTrigger = styled(CollapsiblePrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$xs',
  height: '$6',
  width: '$6',
  cursor: 'pointer',
  '&:focus-visible': {
    boxShadow: '$subtleFocus',
  },
})

const StyledRoot = styled(CollapsiblePrimitive.Root, {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  color: '$text',
  borderRadius: '$sm',
  overflow: 'hidden',
  '&  &': {
    backgroundColor: '$panelBg',
    paddingLeft: '$1',
    '&::before': {
      display: 'none',
    },
    [`${StyledTitle}`]: {
      paddingLeft: '$1',
    },
    [`& > ${StyledContent}`]: {
      position: 'relative',
      padding: 0,
    },
  },
  variants: {
    subtle: {
      true: {
        backgroundColor: '$appBg',
        borderRadius: '$md',
        border: '1px solid $border',
        [`& > ${StyledTitle}`]: {
          minHeight: '$sm',
        },
        [`& > ${StyledContent}`]: {
          backgroundColor: '$surface',
          borderRadius: '$md',
          padding: '$1 $2 $1',
        },
        [`&[data-state=open] > ${StyledTitle}`]: {
          borderBottom: '1px solid $border',
        },
      },
    },
    transparent: {
      true: {
        backgroundColor: 'transparent',
        '& &': {
          backgroundColor: 'transparent',
        },
        [`& > ${StyledTitle}`]: {
          backgroundColor: 'transparent',
        },
        [`& > ${StyledContent}`]: {
          backgroundColor: 'transparent',
        },
      },
    },
    nesting: {
      true: {
        borderBottom: 'none',
        [`& > ${StyledTitle} > svg`]: {
          display: 'none',
        },
      },
    },
  },
})

const StyledChevron = styled(IconTriangleInvertedFilled, {
  margin: '0 $1_5 0 $1',
  height: '6px',
  width: '6px',
  transform: 'rotate(-90deg)',
  variants: {
    open: {
      true: {
        transform: 'rotate(0)',
      },
    },
  },
})

export type CollapsibleProps = Omit<StitchesComponent<typeof StyledRoot>, 'title'> & {
  title?: any
  triggerTitle?: boolean
  collapsible?: boolean
  transparent?: boolean
  guideline?: boolean
}

function Collapsible(props: CollapsibleProps) {
  const {
    children,
    title,
    guideline = false,
    transparent = false,
    collapsible = true,
    triggerTitle = true,
    ...rest
  } = props

  const [open, setOpen] = useControllableState({
    prop: props.open,
    onChange: props.onOpenChange,
    defaultProp: props.defaultOpen,
  })

  const handleOnOpenChange = (open) => {
    if (!collapsible) return
    setOpen(open)
    if (props.onOpenChange) {
      props.onOpenChange(open)
    }
  }

  return (
    <StyledRoot
      {...rest}
      className="collapsible"
      open={open}
      onOpenChange={handleOnOpenChange}
      disabled={!collapsible}
      transparent={transparent}>
      {triggerTitle ? (
        <CollapsiblePrimitive.Trigger asChild disabled={!collapsible}>
          <StyledTitle>
            {collapsible && <StyledChevron open={open} />}
            <StyledTitleContent>{title}</StyledTitleContent>
          </StyledTitle>
        </CollapsiblePrimitive.Trigger>
      ) : (
        <StyledTitle>
          {collapsible && (
            <StyledTrigger disabled={!collapsible}>
              <StyledChevron open={open} />
            </StyledTrigger>
          )}
          <StyledTitleContent>{title}</StyledTitleContent>
        </StyledTitle>
      )}
      <StyledContent guideline={guideline}>{children}</StyledContent>
    </StyledRoot>
  )
}

export { Collapsible }
