import { styled } from '../design-system'
import { Flex } from '../Flex'

const StyledCallout = styled(Flex, {
  borderRadius: '$2',
  fontSize: '$1',
  padding: '$1 $2',
  userSelect: 'none',
  fontWeight: 500,
  variants: {
    type: {
      info: {
        backgroundColor: '$blue3',
        color: '$blueA11',
      },
      warning: {
        backgroundColor: '$amber3',
        color: '$amber11',
      },
      error: {
        backgroundColor: '$red3',
        color: '$red11',
      },
      success: {
        backgroundColor: '$green3',
        color: '$green11',
      },
    },
  },
})

export { StyledCallout as Callout }
