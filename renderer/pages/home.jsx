import electron, { remote } from 'electron';
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { default as styled, createGlobalStyle } from 'styled-components';
import {
  Container,
  Row,
  Col,
  H3,
  H5,
  Button,
  Jumbotron,
} from '@bootstrap-styled/v4';
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import { makeTheme } from 'bootstrap-styled/lib/theme';
import { backgroundSecondary, complementarySecondary } from '../layout/colors';

import Logo from '../components/Logo';
import '@ibm/plex/css/ibm-plex.css';

const ipcRenderer = electron.ipcRenderer || false;

const inkTheme = makeTheme({
  '$font-family-sans-serif:':
    "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$font-family-base': "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$text-color': '#fff',
  '$headings-color': '#fff',
  '$body-bg': '#000',
  '$brand-primary': '#446487',
  '$jumbotron-bg': backgroundSecondary,
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

const Heading = styled(H3)`
  display: inline-block;
  margin-left: 10px;
`;

const Message = styled.p`
  color: ${complementarySecondary};
`;

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (ipcRenderer) {
      setProjects(ipcRenderer.sendSync('get-projects'));
    }
  }, []);

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

      <Container>
        <Row>
          <Col md={12} className="py-3">
            <Logo size={22} />
            <Heading>Ink</Heading>
          </Col>
        </Row>

        <Jumbotron className="py-3">
          <Row>
            <Col md={12}>
              <H5>Your Projects</H5>
            </Col>
          </Row>

          {projects.length > 0 ? (
            projects.map(project => (
              <Row>
                <Col md={12}>
                  <p>{project.name}</p>
                </Col>
              </Row>
            ))
          ) : (
            <Row>
              <Col md={12}>
                <Message>You have no active projects.</Message>
              </Col>
            </Row>
          )}

          <Row>
            <Col md={12}>
              <Button onClick={handleChooseRepository}>
                Choose Repository
              </Button>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </BootstrapProvider>
  );
};

export default Home;
