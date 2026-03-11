import { styled } from '../design-system'

const StyledText = styled('p', {
  fontFamily: '$default',
  fontSynthesis: 'none',
  color: '$text',
  variants: {
    code: {
      true: {
        fontFamily: '$mono',
      },
    },
    highContrast: {
      true: {
        color: '$hiContrast',
      },
    },
    selectable: {
      true: {
        userSelect: 'auto',
      },
      false: {
        userSelect: 'none',
      },
    },
    weight: {
      light: {
        fontWeight: 300,
      },
      normal: {
        fontWeight: 400,
      },
      medium: {
        fontWeight: 500,
      },
      bold: {
        fontWeight: 600,
      },
    },
    size: {
      '0_5': {
        fontSize: '10px',
      },
      1: {
        fontSize: '$1',
        lineHeight: '$1',
      },
      2: {
        fontSize: '$2',
        lineHeight: '$2',
      },
      3: {
        fontSize: '$3',
        lineHeight: '$3',
      },
      4: {
        fontSize: '$4',
        lineHeight: '$4',
      },
      5: {
        fontSize: '$6',
        lineHeight: '$6',
      },
      sm: {
        fontSize: '$1',
        lineHeight: '$1',
      },
    },
    align: {
      center: {
        textAlign: 'center',
      },
    },
    secondary: {
      true: {
        color: '$textMuted',
      },
    },
    deleted: {
      true: {
        textDecoration: 'line-through',
      },
    },
    ellipsis: {
      true: {
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
    primary: {
      true: {
        color: '$textStrong',
      },
    },
    error: {
      true: {
        color: '$red9',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    highContrast: false,
  },
})

const StyledBold = styled('strong', {
  fontWeight: 'bold',
  color: '$textStrong',
  variants: {
    variant: {
      subtle: {
        color: '$grayA11',
      },
    },
  },
})

const StyledTitle = styled('h2', {
  display: 'block',
  margin: 0,
  color: '$textStrong',
  variants: {
    weight: {
      light: {
        fontWeight: 300,
      },
      normal: {
        fontWeight: 400,
      },
      medium: {
        fontWeight: 500,
      },
      semi: {
        fontWeight: 600,
      },
      bold: {
        fontWeight: 700,
      },
    },
    size: {
      1: {
        fontSize: '$1',
        lineHeight: 1.2,
      },
      2: {
        fontSize: '$2',
        lineHeight: 1.2,
      },
      3: {
        fontSize: '$4',
        lineHeight: 1.4,
      },
      4: {
        fontSize: '$6',
        lineHeight: 1.4,
      },
      5: {
        fontSize: '32px',
        lineHeight: 1.4,
      },
      6: {
        fontSize: '64px',
        fontWeight: 600,
        lineHeight: 1.4,
      },
    },
  },
  defaultVariants: {
    size: 1,
  },
})

const StyledLink = styled('a', {
  color: 'CurrentColor',
  textDecoration: 'underline',
  textDecorationColor: '$grayA6',
  textUnderlineOffset: '4px',
  cursor: 'pointer',
  '&:hover': {
    color: '$gray12',
  },
})

export { StyledText as Text, StyledBold as Bold, StyledLink as Link, StyledTitle as Title }
