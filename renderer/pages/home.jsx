import { remote } from 'electron';
import React, { useCallback } from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { Row, Col, H3, Button } from '@bootstrap-styled/v4';
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import { makeTheme } from 'bootstrap-styled/lib/theme';
require('@ibm/plex/css/ibm-plex.css');

const inkTheme = makeTheme({
  '$font-family-sans-serif:':
    "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$font-family-base': "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$text-color': '#fff',
  '$headings-color': '#fff',
  '$body-bg': '#000',
  '$btn-primary-bg': '#446487',
});

const GlobalStyle = createGlobalStyle`
  html, body {
    min-width: 100%;
    min-height: 100%;
    margin: 0;
  }
  
  body {
    background: #000;
    color: #fff;
  }
`;

const Home = () => {
  const handleChooseRepository = useCallback(async () => {
    console.log(
      JSON.stringify(
        await remote.dialog.showOpenDialog({
          properties: ['openDirectory'],
        })
      )
    );
  });

  return (
    <BootstrapProvider theme={inkTheme}>
      <React.Fragment>
        <GlobalStyle />

        <Head>
          <title>ununu • Ink</title>
        </Head>
        <Row>
          <Col md={12}>
            <H3>Ink</H3>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Button onClick={handleChooseRepository}>Choose Repository</Button>
          </Col>
        </Row>
      </React.Fragment>
    </BootstrapProvider>
  );
};

export default Home;
