import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ColorScheme, MantineProvider } from '@mantine/core';

import '../styles/globals.css';
import PageLoader from '../components/pageLoader/pageLoader';
import { AuthContextProvider } from '../features/authentication/context/authContextProvider';


function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const colorScheme :ColorScheme = "light";

    useEffect(() => {
      setTimeout(() => setLoading(true), 700);
    }, []);

  return (
    <AuthContextProvider>
        <MantineProvider 
          theme={{ 
            colorScheme,
            fontFamily: 'Montserrat, sans-serif'
          }} 
          withGlobalStyles 
          withNormalizeCSS
        >
          
            { !loading ?
              (<PageLoader />) :
              <>
              <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-VPNNPKHXZM" />

              <Script strategy="lazyOnload">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-G-VPNNPKHXZM', {
                  page_path: window.location.pathname,
                  });
              `}
              </Script>
              <Component {...pageProps} />
            </>
            }
        </MantineProvider>
    </AuthContextProvider>
  );
  
}

export default MyApp;