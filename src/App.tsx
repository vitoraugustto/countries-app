import { ThemeProvider } from '@mui/material';
import { defaultTheme } from '@theme';

import { Routes } from './routes';

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes />
    </ThemeProvider>
  );
};
