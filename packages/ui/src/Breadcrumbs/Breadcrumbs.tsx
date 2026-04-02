import React, { Fragment } from 'react'
import { IconSlash } from '@tabler/icons-react'

import { styled, CSS } from '../design-system'

const StyledBreadcrumbs = styled('ol', {
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  fontSize: '$1',
  color: '$text',
  listStyle: 'none',
})

export interface BreadcrumbProps {
  css?: CSS
  size?: 'sm' | 'md'
  items: { id: number | string; label: string }[]
  onNavigate?: (id: number | string) => void
}

function Breadcrumbs(props: BreadcrumbProps) {
  const { items, size, onNavigate } = props
  const length = items.length

  const handleNavigate = (id) => {
    onNavigate && onNavigate(id)
  }

  return (
    <StyledBreadcrumbs>
      {items.map((item, index) => {
        return (
          <BreadcrumbItem
            size={size}
            key={item.id}
            isCurrent={index === length - 1}
            data-current={index === length - 1}
            onClick={() => handleNavigate(item.id)}>
            {item.label}
          </BreadcrumbItem>
        )
      })}
    </StyledBreadcrumbs>
  )
}

const StyledBreadcrumbItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  fontSize: '$1',
  lineHeight: '$lineHeights$1',
  outline: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  color: '$textMuted',
  '&[data-current="true"]': {
    color: '$textStrong',
  },
  variants: {
    size: {
      sm: {
        minHeight: '$xs',
        padding: '0 $1',
        fontSize: '$1',
        borderRadius: '$xs',
      },
      md: {
        minHeight: '$sm',
        padding: '0 $1_5',
        fontSize: '$2',
        lineHeight: '$lineHeights$2',
        borderRadius: '$sm',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const Slash = styled(IconSlash, {
  color: '$textMuted',
  variants: {
    size: {
      sm: {
        height: '$3',
        width: '$3',
        margin: '0 $0_5',
      },
      md: {
        height: '$4',
        width: '$4',
        margin: '0 $1',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export interface BreadcrumbItemProps extends React.HtmlHTMLAttributes<HTMLLIElement> {
  isCurrent?: boolean
  size?: 'sm' | 'md'
  children: React.ReactNode
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
  const { isCurrent, size, ...rest } = props
  return (
    <Fragment>
      <StyledBreadcrumbItem size={size} {...rest}>
        {rest.children}
      </StyledBreadcrumbItem>
      {!isCurrent && <Slash size={size} />}
    </Fragment>
  )
}

export { Breadcrumbs, BreadcrumbItem }
