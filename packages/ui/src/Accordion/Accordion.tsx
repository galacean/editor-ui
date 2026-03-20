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

const StyledAccordion = styled(AccordionPrimitive.Root, {
  width: '100%',
  display: 'grid',
  gap: '$1',
})

const StyledItem = styled(AccordionPrimitive.Item, {
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',
  borderRadius: '$sm',
  backgroundColor: '$surface',
  border: '1px solid $border',
  overflow: 'hidden',
  '&[data-state=open]': {
    borderColor: '$borderStrong',
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
  minHeight: '$controlMd',
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
  backgroundColor: '$softBg',
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
    backgroundColor: '$softBgHover',
    color: '$textStrong',
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: '$focus',
  },
})

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: '$1',
  color: '$text',
  backgroundColor: '$surface',
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
  padding: '$3',
  fontSize: '$1',
  lineHeight: '$lineHeights$2',
  color: '$text',
  borderTop: '1px solid $border',
})

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

/**
 * The Accordion Component is used to show/hide content in a collapsible manner. Consists of `Accordion` and `AccordionItem` components.
 *
 * This Component provide controlled and uncontrolled modes.
 */
export const Accordion = function Accordion(props: AccordionProps) {
  return <StyledAccordion {...props} />
}

export type AccordionItemProps = Omit<PrimitiveItemProps, 'title'> & {
  title: ReactNode
  arrow?: boolean
}

export function AccordionItem(props: AccordionItemProps) {
  const { children, title, arrow = true, ...rest } = props
  return (
    <StyledItem {...rest}>
      <StyledHeader>
        <StyledTrigger>
          <span>{title}</span>
          {arrow && <StyledChevron aria-hidden />}
        </StyledTrigger>
      </StyledHeader>
      <StyledContent>
        <StyledContentInner>{children}</StyledContentInner>
      </StyledContent>
    </StyledItem>
  )
}
