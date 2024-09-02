import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import TranscationTable from './TranscationTable';
const AgentTranscation = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Agent' subParent='Agent Transcation' mainTitle='Agent Transcation' />
      <Container fluid={true}>
        <Row>
          <TranscationTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default AgentTranscation;
