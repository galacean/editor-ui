import * as PrimitiveSeparator from '@radix-ui/react-separator';
import { styled } from '../../design-system';

const SeparatorRoot = styled(PrimitiveSeparator.Root, {
  backgroundColor: '$grayA5',
  '&[data-orientation=horizontal]': {
    height: 1,
    width: '100%',
    margin: '$2 0',
  },
  '&[data-orientation=vertical]': {
    height: '100%',
    width: 1,
    margin: '0 $2',
  },
});

export { SeparatorRoot as Separator }