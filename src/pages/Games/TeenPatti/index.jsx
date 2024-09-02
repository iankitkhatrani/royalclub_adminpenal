import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import TeenPattiTable from './TeenPattiTable';
const TeenPatti = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Games' subParent='Teen Patti Games History' mainTitle='Teen Patti Games History' />
      <Container fluid={true}>
        <Row>
          <TeenPattiTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default TeenPatti;
