import { remote } from 'electron';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import React, { useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { default as styled } from 'styled-components';
import {
  Container,
  Row,
  Col,
  H5,
  Button,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Input
} from '@bootstrap-styled/v4';
import { complementarySecondary } from '../layout/colors';
import useProjects from '../effects/useProjects';
import useUser from '../effects/useUser';
import Heading from '../components/Heading';
import Logo from '../components/Logo';
import Page from '../components/Page';
import useInput from '../effects/useInput';
import fetch from 'isomorphic-unfetch';

const Message = styled.p`
  color: ${complementarySecondary};
`;

const ProjectName = styled.p`
  color: #fff;
`;

const Home = () => {
  const { user, setUser } = useUser();
  const { projects, setProjects } = useProjects();

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    // TODO call API once platform in place
    const user = await ipc.callMain('set-user', { email, password });
    setUser(user);
  }, [email, password]);

  const handleChooseRepository = useCallback(async () => {
    const { canceled, filePaths } = await remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    if (canceled || filePaths.length !== 1) {
      return;
    }

    const projectPath = filePaths[0];
    const projects = await ipc.callMain('add-project', projectPath);
    setProjects(projects);
  }, []);

  const handleResetProjects = useCallback(async () => {
    const projects = await ipc.callMain('reset-projects');
    setProjects(projects);
  }, []);

  return (
    <Page>
      <Head>
        <title>ununu • Ink</title>
      </Head>

      <Container>
        <Row>
          <Col md={12} className="py-3">
            <Logo size={22} />
            <Link href="/home">
              <Heading>Ink</Heading>
            </Link>
          </Col>
        </Row>

        {user && user.email ? (<Jumbotron className="py-3">
          <Row>
            <Col md={12}>
              <H5>Welcome {user.email}</H5>
              <H5>Your Projects</H5>
            </Col>
          </Row>

          {projects.length > 0 ? (
            projects.map(({ id, name, path }) => (
              <Row key={`project-${id}`}>
                <Col md={12}>
                  <Link href={`/project/${id}`}>
                    <a href="#">
                      <ProjectName>
                        {name} <code>{path}</code>
                      </ProjectName>
                    </a>
                  </Link>
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
      ) : (
        <Jumbotron className="py-3">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input required type="email" placeholder="Enter email" {...bindEmail} />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input required type="password" placeholder="Enter password" {...bindPassword} />
            </FormGroup>
            <Button className="mr-2" type="submit">
              Login
            </Button>
          </Form>
        </Jumbotron>
      )}
      </Container>
    </Page>
  );
};

export default Home;
