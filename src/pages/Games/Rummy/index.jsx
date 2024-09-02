import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import RummyTable from './RummyTable';
const Rummy = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Games' subParent='Rummy Games History' mainTitle='Rummy Games History' />
      <Container fluid={true}>
        <Row>
          <RummyTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Rummy;
