import { IconEdit } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'

import { styled, CSS } from '../design-system'
import { Text } from '../Typography'
import { Input } from '../Input'
import { Flex } from '../Flex'

const Icon = styled('span', {
  visibility: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  color: '$gray10',
  '& > svg': {
    height: '14px',
    width: '14px',
    strokeWidth: 1.8,
  },
})

const Container = styled('div', {
  maxWidth: '100%',
  display: 'inline-block',
  '&:hover': {
    [`${Icon}`]: {
      visibility: 'visible',
    },
  },
  variants: {
    focused: {
      true: {
        backgroundColor: '$gray1',
      },
    },
  },
})

type IEditableText = {
  value: string
  showIcon?: boolean
  onFocus?: (val: string) => void
  onEdit?: () => void
  onBlur?: (val: string) => void
  css?: CSS
}

function EditableText(props: IEditableText) {
  const { value, onBlur, showIcon, css, onEdit } = props
  const inputRef = useRef(null)
  const [draft, setDraftValue] = useState<string>(value)
  const [editing, setEditing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setDraftValue(value)
  }, [value])

  const finish = async () => {
    setLoading(true)
    if (onBlur && typeof onBlur === 'function') {
      await onBlur(draft)
    }
    setEditing(false)
    setLoading(false)
  }

  const edit = () => {
    setEditing(true)
    onEdit && onEdit()
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter') {
      finish()
    }
    if (e.key === 'Escape') {
      setDraftValue(value)
      finish()
    }
  }

  return (
    <Container focused={editing}>
      {editing ? (
        <Input
          disabled={loading}
          ref={inputRef}
          value={draft}
          onKeyDown={handleOnKeyDown}
          onChange={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setDraftValue(e.target.value)
          }}
          onKeyUp={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (e.key === 'Enter') finish()
          }}
          onBlur={() => {
            finish()
          }}
        />
      ) : (
        <Flex
          align="v"
          onClick={() => {
            !showIcon && edit()
          }}
          gap="xs"
          wrap="false"
          css={css}>
          <Text ellipsis size={1} css={css}>
            {draft}
          </Text>
          {showIcon && (
            <Icon onClick={edit}>
              <IconEdit />
            </Icon>
          )}
        </Flex>
      )}
    </Container>
  )
}

export { EditableText }
