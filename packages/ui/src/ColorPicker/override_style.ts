import { globalCss } from '../design-system'

export const overrideStyle = globalCss({
  '.galacecan-color-picker .react-colorful': {
    width: '220px',
    height: '180px',
  },
  '.galacecan-color-picker .react-colorful__saturation': {
    borderBottom: '$3',
    borderRadius: '$3',
  },
  '.galacecan-color-picker .react-colorful__hue': {
    width: '140px',
    height: '6px',
    margin: '$3 0',
    borderRadius: '$1',
  },
  '.galacecan-color-picker .react-colorful__hue .react-colorful__pointer': {
    height: '12px',
    width: '12px',
    borderRadius: '$round',
    borderWidth: '2px',
  },
  '.galacecan-color-picker .react-colorful__pointer': {
    height: '$4',
    width: '$4',
    borderRadius: '$round',
    borderWidth: '2px',
  },
  '.galacecan-color-picker .react-colorful__alpha': {
    width: '140px',
    height: '6px',
    borderRadius: '$1',
  },
  '.galacecan-color-picker .react-colorful__alpha .react-colorful__pointer': {
    height: '12px',
    width: '12px',
    borderRadius: '$round',
    borderWidth: '2px',
  },
  '.galacecan-color-picker[data-readonly=true]': {
    '.react-colorful__saturation': {
      pointerEvents: 'none',
      opacity: '0.5',
    },
    '.react-colorful__hue': {
      pointerEvents: 'none',
      opacity: '0.5',
    },
  },
})
