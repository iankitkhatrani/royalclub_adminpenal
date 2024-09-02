import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import AgentTable from './AgentTable';
const Agent = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Agent' subParent='Agent Management' mainTitle='Agent Management' />
      <Container fluid={true}>
        <Row>
          <AgentTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Agent;
