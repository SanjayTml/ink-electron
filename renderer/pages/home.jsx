import { remote } from 'electron';
import React, { useCallback } from 'react';
import Head from 'next/head';
import { default as styled, createGlobalStyle } from 'styled-components';
import { Container, Row, Col, H3, Button } from '@bootstrap-styled/v4';
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import { makeTheme } from 'bootstrap-styled/lib/theme';
import { backgroundSecondary } from '../layout/colors';

import Logo from '../components/Logo';
import '@ibm/plex/css/ibm-plex.css';

const inkTheme = makeTheme({
  '$font-family-sans-serif:':
    "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$font-family-base': "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$text-color': '#fff',
  '$headings-color': '#fff',
  '$body-bg': '#000',
  '$brand-primary': '#446487',
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

const Wrapper = styled(Container)`
  background-color: ${backgroundSecondary};
`;

const Heading = styled(H3)`
  display: inline-block;
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
      <GlobalStyle />

      <Head>
        <title>ununu • Ink</title>
      </Head>

      <Container fluid>
        <Row>
          <Col md={12}>
            <Logo size={25} />
            <Heading>Ink</Heading>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={12}>
            <Wrapper>
              <Button onClick={handleChooseRepository}>
                Choose Repository
              </Button>
            </Wrapper>
          </Col>
        </Row>
      </Container>
    </BootstrapProvider>
  );
};

export default Home;
