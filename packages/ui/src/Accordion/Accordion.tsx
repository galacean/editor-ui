import React, { ReactNode } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type {
  AccordionItemProps as PrimitiveItemProps,
  AccordionSingleProps,
  AccordionMultipleProps,
} from '@radix-ui/react-accordion'

import { keyframes, styled } from '../design-system'

const slideDown = keyframes({
  from: { height: 0, opacity: 0 },
  to: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
  to: { height: 0, opacity: 0 },
})

type AccordionSize = 'sm' | 'md'

const AccordionContext = React.createContext<{ size: AccordionSize }>({
  size: 'sm',
})

const StyledAccordion = styled(AccordionPrimitive.Root, {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const StyledItem = styled(AccordionPrimitive.Item, {
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',
  backgroundColor: '$surface',
  border: '1px solid $border',
  borderBottom: 'none',
  overflow: 'hidden',
  '&:first-child': {
    borderTopLeftRadius: '$sm',
    borderTopRightRadius: '$sm',
  },
  '&:last-child': {
    borderBottomLeftRadius: '$sm',
    borderBottomRightRadius: '$sm',
    borderBottom: '1px solid $border',
  },
  '&[data-state=open]': {
    borderColor: '$borderStrong',
    '&:not(:first-child)': {
      borderTopColor: '$borderStrong',
    },
    '& + &': {
      borderTopColor: '$borderStrong',
    },
  },
  '&:has(+ [data-state=open])': {
    borderBottomColor: '$borderStrong',
  },
})

const StyledChevron = styled(IconChevronRight, {
  width: '$iconSm',
  height: '$iconSm',
  color: 'currentColor',
  flexShrink: 0,
  transform: 'rotate(0deg)',
  transition: 'transform .2s ease, color .2s ease',
})

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'block',
})

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  width: '100%',
  minHeight: '30px',
  padding: '0 $3',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$2',
  fontSize: '$2',
  lineHeight: '$lineHeights$2',
  fontWeight: 500,
  color: '$text',
  overflow: 'hidden',
  boxSizing: 'border-box',
  userSelect: 'none',
  backgroundColor: '$grayA2',
  transition: '$backgroundColor, $borderColor, $color',
  '& > span': {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '&[data-state="open"]': {
    [`& ${StyledChevron}`]: {
      transform: 'rotate(90deg)',
    },
  },
  '&:hover': {
    backgroundColor: '$grayA3',
    color: '$textStrong',
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: '$focus',
  },
  variants: {
    size: {
      sm: {
        minHeight: '27px',
        padding: '0 $2',
        fontSize: '$1',
        lineHeight: '$lineHeights$1',
      },
      md: {
        minHeight: '30px',
        padding: '0 $3',
        fontSize: '$2',
        lineHeight: '$lineHeights$2',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: '$1',
  color: '$text',
  backgroundColor: '$grayA2',
  '&[data-state="open"]': {
    animation: `${slideDown} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 180ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&[data-state="open"], &[data-state="closed"]': {
      animation: 'none',
    },
  },
})

const StyledContentInner = styled('div', {
  color: '$text',
  borderTop: '1px solid $border',
  variants: {
    size: {
      sm: {
        padding: '$2',
        fontSize: '$1',
        lineHeight: '$lineHeights$1',
      },
      md: {
        padding: '$3',
        fontSize: '$1',
        lineHeight: '$lineHeights$2',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
  size?: AccordionSize
}

/**
 * The Accordion Component is used to show/hide content in a collapsible manner. Consists of `Accordion` and `AccordionItem` components.
 *
 * This Component provide controlled and uncontrolled modes.
 */
export const Accordion = function Accordion(props: AccordionProps) {
  const { size = 'sm', ...rest } = props
  return (
    <AccordionContext.Provider value={{ size }}>
      <StyledAccordion {...rest} />
    </AccordionContext.Provider>
  )
}

export type AccordionItemProps = Omit<PrimitiveItemProps, 'title'> & {
  title: ReactNode
  arrow?: boolean
}

export function AccordionItem(props: AccordionItemProps) {
  const { size } = React.useContext(AccordionContext)
  const { children, title, arrow = true, ...rest } = props
  return (
    <StyledItem {...rest}>
      <StyledHeader>
        <StyledTrigger size={size}>
          <span>{title}</span>
          {arrow && <StyledChevron aria-hidden />}
        </StyledTrigger>
      </StyledHeader>
      <StyledContent>
        <StyledContentInner size={size}>{children}</StyledContentInner>
      </StyledContent>
    </StyledItem>
  )
}
