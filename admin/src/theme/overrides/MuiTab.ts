// Palette
import palette from '../palette';

export default {
  root: {
    height: '50px',
    fontWeight: 400,
    textTransform: undefined,
    fontSize: '14px',
    '@media (min-width: 960px)': {
      minWidth: '100px'
    },
    '&$selected': {
      fontWeight: 500
    }
  },
  label: {},
  labelContainer: {},
  textColorPrimary: {
    color: palette.text.secondary
  }
};
