'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'sonner';

export interface ProvidersProps {
  children: React.ReactNode;
  // themeProps?: ThemeProviderProps;
}

export function Providers({ children,  }: ProvidersProps) {
  return (
    <NextUIProvider>
      {/* <NextThemesProvider
        enableSystem={false}
        forcedTheme='light'
        {...themeProps}
      > */}
      {children}
      {/* </NextThemesProvider> */}
      <Toaster position='top-center' />
    </NextUIProvider>
  );
}
