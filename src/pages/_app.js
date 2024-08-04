import React from 'react';
import Header from '../components/Header';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useRouter } from 'next/router';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0' // Light background color
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showHeader = router.pathname !== '/'; // Exclude header on the landing page

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showHeader && <Header />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
