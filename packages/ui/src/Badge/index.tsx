import React, { forwardRef, useEffect, useState, useCallback, PropsWithChildren, Fragment } from 'react'
import { IconX } from '@tabler/icons-react'

import { styled, StitchesComponent } from '../design-system'

const StyledBadgeInner = styled('span', {
  all: 'unset',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  color: '$$color',
  backgroundColor: '$$bgColor',
  padding: '$0_5 $1_5',
  gap: '$1',
  borderRadius: '$2',
  border: '$$border',
  variants: {
    closable: {
      true: {
        borderRadius: '$2 0 0 $2',
        padding: '0 $1',
      },
    },
  },
})

const StyledCloseButton = styled('span', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '0 $0_5',
  lineHeight: '14px',
  borderRadius: '0 $2 $2 0',
  marginLeft: '0.5px',
  textAlign: 'center',
  color: '$$color',
  backgroundColor: '$$bgColor',
  border: '$$border',
  backdropFilter: '$$backdropFilter',
  cursor: 'pointer',
  '&:hover': {
    color: '$$highlightColor',
    backgroundColor: '$$highlightBgColor',
  },
  variants: {
    pill: {
      true: {
        borderRadius: '$round',
      },
    },
  },
})

const StyledBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',

  lineHeight: '16px',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  fontWeight: 500,
  fontSize: '$sm',
  variants: {
    size: {
      xs: {
        fontSize: '$0_5',
        height: '$4',
        [`& ${StyledBadgeInner}`]: {
          padding: '0 $1',
        },
      },
      sm: {
        height: '$5',
        fontSize: '$1',
        [`& ${StyledBadgeInner}`]: {
          padding: '0 $1_5',
        },
      },
    },

    closable: {
      true: {
        paddingRight: '$1',
      }
    },

    pill: {
      true: {
        [`& ${StyledBadgeInner}`]: {
          borderRadius: '$round',
          padding: '0 $2',
        }
      },
    },
    active: {
      true: {
        $$bgColor: '$colors$blue10',
        $$color: '$colors$white',
        $$highlightColor: '$colors$blueA12',
      },
    },
    dot: {
      true: {
        height: '$2',
        width: '$2',
        borderRadius: '$round',
        padding: 0,
      },
    },
    code: {
      true: {
        fontFamily: '$mono',
      },
    },
    variant: {
      solid: {
        $$border: 'none',
        $$backdropFilter: 'none',
      },
      surface: {
        $$border: '1px solid $$borderColor',
        $$backdropFilter: 'blur(8px)',
      },
    },
    color: {
      gray: {
        $$color: '$colors$grayA11',
        $$bgColor: '$colors$grayA3',
        $$highlightColor: '$colors$grayA12',
        $$highlightBgColor: '$colors$grayA5',
        $$borderColor: '$colors$grayA9',
      },
      green: {
        $$color: '$colors$greenA11',
        $$bgColor: '$colors$greenA3',
        $$highlightColor: '$colors$greenA12',
        $$highlightBgColor: '$colors$greenA5',
        $$borderColor: '$colors$greenA9',
      },
      red: {
        $$color: '$colors$redA11',
        $$bgColor: '$colors$redA3',
        $$highlightColor: '$colors$redA12',
        $$highlightBgColor: '$colors$redA5',
        $$borderColor: '$colors$redA9',
      },
      blue: {
        $$color: '$colors$blueA11',
        $$bgColor: '$colors$blueA3',
        $$highlightColor: '$colors$blueA12',
        $$highlightBgColor: '$colors$blueA5',
        $$borderColor: '$colors$blueA9',
      },
      orange: {
        $$color: '$colors$orangeA11',
        $$bgColor: '$colors$orangeA3',
        $$highlightColor: '$colors$orangeA12',
        $$highlightBgColor: '$colors$orangeA5',
        $$borderColor: '$colors$orangeA9',
      },
      amber: {
        $$color: '$colors$amberA11',
        $$bgColor: '$colors$amberA3',
        $$highlightColor: '$colors$amberA12',
        $$highlightBgColor: '$colors$amberA5',
        $$borderColor: '$colors$amberA9',
      },
      gold: {
        $$color: '$colors$goldA11',
        $$bgColor: '$colors$goldA3',
        $$highlightColor: '$colors$goldA12',
        $$highlightBgColor: '$colors$goldA5',
        $$borderColor: '$colors$goldA9',
      },
      violet: {
        $$color: '$colors$violetA11',
        $$bgColor: '$colors$violetA3',
        $$highlightColor: '$colors$violetA12',
        $$highlightBgColor: '$colors$violetA5',
        $$borderColor: '$colors$violetA9',
      },
    },
  },
  defaultVariants: {
    color: 'gray',
    size: 'sm',
    variant: 'solid',
  },
  compoundVariants: [
    {
      pill: true,
      size: 'xs',
      css: {
        [`& ${StyledBadgeInner}`]: {
          padding: '0 $1_5',
        },
      },
    },
    {
      pill: true,
      closable: true,
      size: 'sm',
      css: {
        [`& ${StyledBadgeInner}`]: {
          borderRadius: '$round 0 0 $round',
        },
        [`& ${StyledCloseButton}`]: {
          borderRadius: '0 $round $round 0',
        },
      },
    },
    {
      pill: true,
      closable: true,
      size: 'xs',
      css: {
        [`& ${StyledBadgeInner}`]: {
          borderRadius: '$round 0 0 $round',
        },
        [`& ${StyledCloseButton}`]: {
          borderRadius: '0 $round $round 0',
        },
      },
    },
  ],
})

type BadgeCloseButtonProps = React.ComponentProps<typeof StyledCloseButton>

function BadgeCloseButton(props: BadgeCloseButtonProps) {
  return (
    <StyledCloseButton {...props}>
      <IconX size="10px" />
    </StyledCloseButton>
  )
}

export type BadgeProps = PropsWithChildren<
  Omit<StitchesComponent<typeof StyledBadge>, 'dot'> & {
    closable?: boolean
    onClose?: (e) => void
  }
>

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { closable = false, onClose, children, ...rest },
  ref
) {
  const [closed, setClosed] = useState(false)

  const handleClose = useCallback(
    (e) => {
      setClosed(true)
      if (onClose) {
        onClose(e)
      }
    },
    [onClose]
  )

  if (closed) {
    return null
  }

  return (
    <StyledBadge ref={ref} {...rest} closable={closable}>
      <StyledBadgeInner closable={closable}>{children}</StyledBadgeInner>
      {closable && <BadgeCloseButton onClick={handleClose} pill={rest.pill} />}
    </StyledBadge>
  )
})

export { Badge }
