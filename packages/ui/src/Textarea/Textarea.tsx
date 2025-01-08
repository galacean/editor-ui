import { styled } from '../design-system'

const StyledTextarea = styled('textarea', {
  width: '100%',
  minHeight: '80px',
  padding: '$1 $2',
  borderRadius: '$3',
  transition: '$shadow',
  fontSize: '$1',
  outline: 'none',
  border: 'none',
  color: '$gray11',
  resize: 'vertical',
  variants: {
    variant: {
      default: {
        border: '1px solid $border',
        backgroundColor: '$gray2',
      },
      subtle: {
        backgroundColor: '$secondaryBg',
      },
    },
  },
  '&:focus-visible': {
    boxShadow: '0px 0px 0px 1px $colors$blue10',
    color: '$hiContrast',
  },
  '&::placeholder': {
    color: '$gray9',
    fontSize: '$1',
  },
  defaultVariants: {
    variant: 'default',
  },
})

export { StyledTextarea as Textarea }
