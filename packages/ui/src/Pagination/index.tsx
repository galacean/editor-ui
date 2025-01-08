import React from 'react'
import { IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { DOTS, usePagination } from './usePagination'

import { styled, VariantProps } from '../design-system'

const StyledPaginationRoot = styled('ul', {
  display: 'flex',
  alignItems: 'center',
})

const StyledPaginationItem = styled('li', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid $gray6',
  color: '$gray11',
  userSelect: 'none',
  cursor: 'pointer',
  marginRight: '$2',
  '&:last-child': {
    marginRight: 0,
  },
  '&:hover': {
    backgroundColor: '$gray3',
  },
  '&:focus': {
    backgroundColor: '$gray4',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$gray3',
        color: '$gray12',
      },
    },
    disabled: {
      true: {
        backgroundColor: '$gray2',
        color: '$gray8',
        cursor: 'initial',
        '&:hover': {
          backgroundColor: '$gray2',
        },
      },
    },
    size: {
      sm: {
        height: '$6',
        width: '$6',
        fontSize: '$1',
        borderRadius: '$1',
        '& > svg': {
          width: '$3',
          height: '$3',
        },
      },
      md: {
        height: '$9',
        width: '$9',
        fontSize: '$3',
        borderRadius: '$2',
        '& > svg': {
          width: '$4',
          height: '$4',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

type IPaginationProps = {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage?: number
  onPageChange?: (nextPage: number) => void
  size?: Extract<VariantProps<typeof StyledPaginationItem>['size'], string>
}

function Pagination(props: IPaginationProps) {
  const { totalCount, onPageChange, currentPage, pageSize, siblingCount = 1, size } = props

  const [current = 1, setCurrentPage] = useControllableState({
    prop: currentPage,
    onChange: onPageChange,
    defaultProp: props.currentPage,
  })

  const range = usePagination({
    currentPage: current,
    totalCount,
    siblingCount,
    pageSize,
  })
  const lastPage = range[range.length - 1]

  if (current === 0 || range.length < 2) return null

  const onNext = () => {
    if (current >= lastPage) return
    setCurrentPage(current + 1)
  }

  const onPrev = () => {
    if (current === 1) return
    setCurrentPage(current - 1)
  }

  const onItemClick = (pageNo) => {
    setCurrentPage(pageNo)
  }

  return (
    <StyledPaginationRoot>
      <StyledPaginationItem size={size} onClick={onPrev} disabled={current === 1}>
        <IconChevronLeft />
      </StyledPaginationItem>
      {range.map((item, idx) => {
        if (item === DOTS) {
          return (
            <StyledPaginationItem size={size} key={`${DOTS}_${idx}`}>
              <IconDots />
            </StyledPaginationItem>
          )
        }
        return (
          <StyledPaginationItem key={item} onClick={() => onItemClick(item)} active={item === current} size={size}>
            {item}
          </StyledPaginationItem>
        )
      })}
      <StyledPaginationItem size={size} onClick={onNext} disabled={current === lastPage}>
        <IconChevronRight />
      </StyledPaginationItem>
    </StyledPaginationRoot>
  )
}

export { Pagination }
