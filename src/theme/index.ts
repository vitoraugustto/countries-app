import { createTheme } from '@mui/material';

export const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 820,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: { minHeight: 44, borderRadius: 5 },
      },
    },
  },
  typography: {
    body1: {
      color: '#000',
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: 16,
      letterSpacing: 0.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: '700',
      fontFamily: 'Titillium Web',
      letterSpacing: 1,
    },
    h1: {
      fontFamily: 'Titillium Web',
      fontWeight: '600',
      fontSize: 28,
      color: '#000',
    },
    h2: {
      fontFamily: 'Titillium Web',
      fontWeight: '600',
      fontSize: 24,
      color: '#000',
    },
    h3: {
      fontFamily: 'Titillium Web',
      fontWeight: '600',
      fontSize: 20,
      color: '#000',
    },
  },
});
