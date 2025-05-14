import React, { forwardRef, useEffect, useState, useCallback, PropsWithChildren, Fragment } from 'react'
import { IconX } from '@tabler/icons-react'

import { styled, StitchesComponent } from '../design-system'

const StyledBadgeInner = styled('div', {
  display: 'flex',
  height: '$5',
  alignItems: 'center',
  color: '$$color',
  backgroundColor: '$$bgColor',
  padding: '$0_5 $1_5',
  gap: '$1',
  borderRadius: '4px',
  variants: {
    closeable: {
      true: {
        borderRadius: '4px 0 0 4px',
      },
    },
  },
})

const StyledCloseButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '$5',
  // width: '$3',
  padding: '0 $0_5',
  lineHeight: '14px',
  borderRadius: '0 4px 4px 0',
  marginLeft: '0.5px',
  textAlign: 'center',
  color: '$$color',
  backgroundColor: '$$bgColor',
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
  borderRadius: '4px',
  height: 'fit-content',
  lineHeight: '16px',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  fontWeight: 500,
  fontSize: '$sm',
  variants: {
    size: {
      xs: {
        fontSize: '$1',
        padding: '2px 10px',
      },
    },

    pill: {
      true: {
        borderRadius: '$round',
        backgroundColor: '$$bgColor',
        paddingRight: '$1',
        [`& ${StyledCloseButton}`]: {
          background: 'transparent',
        },
        [`& ${StyledBadgeInner}`]: {
          backgroundColor: 'transparent',
          paddingRight: 0,
        },
      },
    },
    active: {
      true: {
        $$bgColor: '$blue10',
        $$color: '$white',
        $$highlightColor: '$blue12',
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
    color: {
      gray: {
        $$color: '$colors$grayA11',
        $$bgColor: '$colors$grayA4',
        $$highlightColor: '$colors$grayA12',
        $$highlightBgColor: '$colors$grayA5',
      },
      green: {
        $$color: '$colors$greenA11',
        $$bgColor: '$colors$greenA4',
        $$highlightColor: '$colors$greenA12',
        $$highlightBgColor: '$colors$greenA5',
      },
      red: {
        $$color: '$colors$redA11',
        $$bgColor: '$colors$redA4',
        $$highlightColor: '$colors$redA12',
        $$highlightBgColor: '$colors$redA5',
      },
      blue: {
        $$color: '$colors$blueA11',
        $$bgColor: '$colors$blueA4',
        $$highlightColor: '$colors$blueA12',
        $$highlightBgColor: '$colors$blueA5',
      },
      orange: {
        $$color: '$colors$orangeA11',
        $$bgColor: '$colors$orangeA4',
        $$highlightColor: '$colors$orangeA12',
        $$highlightBgColor: '$colors$orangeA5',
      },
      gold: {
        $$color: '$colors$goldA11',
        $$bgColor: '$colors$goldA4',
        $$highlightColor: '$colors$goldA12',
        $$highlightBgColor: '$colors$goldA5',
      },
    },
  },
  defaultVariants: {
    color: 'gray',
  },
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
    closeable?: boolean
    onClose?: (e) => void
  }
>

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { closeable = false, onClose, children, ...rest },
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
    <StyledBadge ref={ref} {...rest}>
      <StyledBadgeInner closeable={closeable}>{children}</StyledBadgeInner>
      {closeable && <BadgeCloseButton onClick={handleClose} pill={rest.pill} />}
    </StyledBadge>
  )
})

export { Badge }
