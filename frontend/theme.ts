import { createMuiTheme, withStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { responsiveFontSizes } from '@material-ui/core/styles';

const greenish = '#1ca086'; // green-ish
const blueish = '#315f7a'; // blue-ish

const theme = createMuiTheme({
  palette: {
    primary: {
      main: greenish
    },
    secondary: {
      main: blueish
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    htmlFontSize: 20,
    fontFamily: [
      'Quattrocento Sans',
      'serif'
    ].join(','),
    body1: {
      fontSize: '1rem'
    }
  },
  overrides: {
    MuiLink: {
      root: {
        color: greenish
      }
    }
  },
});

export const GlobalCss = withStyles(theme => ({
  '@global': {
    html: {
      fontSize: '20px'
    },
    'a, a:visited, a:hover, a:active': {
      color: greenish,
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline'
    },
    h1: theme.typography.h1,
    h2: theme.typography.h2,
    h3: theme.typography.h3,
    h4: theme.typography.h4,
    h5: theme.typography.h5,
    h6: theme.typography.h6,
    p: theme.typography.body1
  }
}))(() => null)

export default responsiveFontSizes(theme);