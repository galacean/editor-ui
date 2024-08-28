import { styled } from '@galacean/design-system'

const StyledGrid = styled('div', {
  display: 'grid',
  gridAutoFlow: 'row',
  gridAutoRows: 'min-content',
  gap: '$2',
  variants: {
    align: {
      start: {
        alignItems: 'start'
      },
      center: {
        alignItems: 'center'
      },
      end: {
        alignItems: 'end'
      }
    },
    justify: {
      start: {
        justifyContent: 'start'
      },
      center: {
        justifyContent: 'center'
      },
      end: {
        justifyContent: 'end'
      }
    }
  }
})

export { StyledGrid as Grid };