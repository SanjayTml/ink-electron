import electron, { remote } from 'electron';
import React, { useCallback } from 'react';
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
import useProjects from '../effects/useProjects';
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
  '$jumbotron-bg': backgroundSecondary,
});

const ipcRenderer = electron.ipcRenderer || false;

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

const ProjectName = styled.p`
  color: #fff;
`;

const Home = () => {
  const projects = useProjects();
  console.log(projects);

  const handleChooseRepository = useCallback(async () => {
    const { canceled, filePaths } = await remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    if (canceled || filePaths.length !== 1) {
      return;
    }

    const projectPath = filePaths[0];
    if (ipcRenderer) ipcRenderer.send('add-project', projectPath);
  }, []);

  const handleResetProjects = useCallback(() => {
    if (ipcRenderer) ipcRenderer.send('reset-projects');
  }, []);

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
            projects.map(({ id, name, path }) => (
              <Row key={`project-${id}`}>
                <Col md={12}>
                  <ProjectName>
                    {name} <code>{path}</code>
                  </ProjectName>
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
              <Button className="mr-2" onClick={handleChooseRepository}>
                Add Repository
              </Button>
              <Button className="mr-2" onClick={handleResetProjects}>
                Reset Projects
              </Button>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </BootstrapProvider>
  );
};

export default Home;
