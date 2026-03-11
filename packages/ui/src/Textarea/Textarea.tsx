import { styled } from '../design-system'

const StyledTextarea = styled('textarea', {
  width: '100%',
  minHeight: '$14',
  padding: '$1_5 $2',
  borderRadius: '$sm',
  transition: '$borderColor, $backgroundColor, $shadow, $color',
  fontSize: '$1',
  lineHeight: '$lineHeights$1',
  outline: 'none',
  border: '1px solid $border',
  color: '$text',
  resize: 'none',
  boxSizing: 'border-box',
  '&::placeholder': {
    color: '$textMuted',
  },
  variants: {
    variant: {
      outline: {
        backgroundColor: '$surface',
        borderColor: '$border',
        '&:hover': {
          borderColor: '$borderStrong',
        },
      },
      soft: {
        backgroundColor: '$softBg',
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: '$softBgHover',
        },
      },
      subtle: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: '$surfaceSubtle',
        },
      },
    },
    size: {
      sm: {
        minHeight: '$14',
        padding: '$2 $2',
        fontSize: '$1',
        lineHeight: '$lineHeights$1',
        borderRadius: '$sm',
      },
      md: {
        minHeight: '$16',
        padding: '$2 $3',
        fontSize: '$2',
        lineHeight: '$lineHeights$2',
        borderRadius: '$md',
      },
    },
    state: {
      valid: {
        backgroundColor: '$successBg',
        borderColor: '$successBorder',
        color: '$successText',
        '&::placeholder': {
          color: '$successText',
          opacity: 0.8,
        },
      },
      invalid: {
        backgroundColor: '$dangerBg',
        borderColor: '$dangerBorder',
        color: '$dangerText',
        '&::placeholder': {
          color: '$dangerText',
          opacity: 0.8,
        },
      },
    },
    disabled: {
      true: {
        backgroundColor: '$surfaceSubtle',
        color: '$textMuted',
        cursor: 'not-allowed',
      },
    },
  },
  '&:focus-visible': {
    borderColor: '$borderStrong',
    boxShadow: '$focus',
    color: '$textStrong',
  },
  compoundVariants: [
    {
      state: 'valid',
      css: {
        '&:focus-visible': {
          borderColor: '$successBorder',
          boxShadow: '$focus',
          color: '$successText',
        },
      },
    },
    {
      state: 'invalid',
      css: {
        '&:focus-visible': {
          borderColor: '$dangerBorder',
          boxShadow: '$focus',
          color: '$dangerText',
        },
      },
    },
    {
      variant: 'outline',
      disabled: true,
      css: {
        backgroundColor: '$surfaceSubtle',
        borderColor: '$border',
      },
    },
    {
      variant: 'soft',
      disabled: true,
      css: {
        backgroundColor: '$surfaceSubtle',
        borderColor: 'transparent',
      },
    },
    {
      variant: 'subtle',
      disabled: true,
      css: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    },
    {
      state: 'valid',
      disabled: true,
      css: {
        backgroundColor: '$successBg',
        borderColor: '$successBorder',
        color: '$textMuted',
        '&::placeholder': {
          color: '$textMuted',
          opacity: 1,
        },
      },
    },
    {
      state: 'invalid',
      disabled: true,
      css: {
        backgroundColor: '$dangerBg',
        borderColor: '$dangerBorder',
        color: '$textMuted',
        '&::placeholder': {
          color: '$textMuted',
          opacity: 1,
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'soft',
    size: 'sm',
  },
})

export { StyledTextarea as Textarea }
