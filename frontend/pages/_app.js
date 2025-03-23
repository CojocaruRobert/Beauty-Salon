import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../utils/createEmotionCache';
import theme from '../utils/theme';
import { store } from '../store/store';
import { restoreAuthState } from '../store/authSlice';
import '../styles/globals.css';
import { CircularProgress, Box } from '@mui/material';
import { useRouter } from 'next/router';

// Client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createEmotionCache();

// ClientOnly component to prevent hydration errors
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null; // Return null on first render to avoid hydration mismatch
  }
  
  return <>{children}</>;
};

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Initialize auth state on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('_app.js: Initializing auth state on client load');
      store.dispatch(restoreAuthState());
      // Give the store a moment to update before marking as initialized
      setTimeout(() => {
        setIsInitialized(true);
      }, 100);
    }
  }, []);

  // Show loading indicator while initializing on client side
  const LoadingScreen = () => (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
      }}
    >
      <CircularProgress />
    </Box>
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          {/* Wrap the entire app with ClientOnly to prevent hydration errors */}
          <ClientOnly>
            {!isInitialized && typeof window !== 'undefined' ? <LoadingScreen /> : <Component {...pageProps} />}
          </ClientOnly>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp; 