import React from 'react';
import { createGlobalStyle } from 'styled-components';
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import theme from '../layout/theme';

const GlobalStyle = createGlobalStyle`
  html, body {
    min-width: 100%;
    min-height: 100%;
    margin: 0;
  }
  
  body {
    background: #000;
  }
`;

export default function Page({ children }) {
  return (
    <React.Fragment>
      <GlobalStyle />

      <BootstrapProvider theme={theme}>{children}</BootstrapProvider>
    </React.Fragment>
  );
}
