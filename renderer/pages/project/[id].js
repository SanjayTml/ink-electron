import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Col, Container, H5, H6, Jumbotron, Row } from '@bootstrap-styled/v4';
import Logo from '../../components/Logo';
import Heading from '../../components/Heading';
import useProjects from '../../effects/useProjects';
import Page from '../../components/Page';
import useProjectState from '../../effects/useProjectState';

export default function Repo() {
  const { query } = useRouter();
  const { projects } = useProjects();
  const project = projects.find(project => project.id === query.id);

  // state is of the following structure:
  // state = { new: Array(), modified: Array(), deleted: Array() }
  const { state } = useProjectState(project ? project.path : null);

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

        {project && (
          <Jumbotron className="py-3">
            <Row>
              <Col md={12}>
                <H5>
                  Repository for <code>{project.name}</code>
                </H5>
              </Col>
            </Row>

            {state.new && (
              <React.Fragment>
                <Row>
                  <H6>New Files</H6>
                </Row>

                {state.new.map((filePath, index) => (
                  <Row key={`new-${index}`}>
                    <Col md={12}>
                      <code>{filePath}</code>
                    </Col>
                  </Row>
                ))}
              </React.Fragment>
            )}
          </Jumbotron>
        )}
      </Container>
    </Page>
  );
}
