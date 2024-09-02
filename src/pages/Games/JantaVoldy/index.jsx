import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import JantaVoldyTable from './JantaVoldyTable';
const JantaVoldy = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Games' subParent='Janta Voldy Games History' mainTitle='Janta Voldy Games History' />
      <Container fluid={true}>
        <Row>
          <JantaVoldyTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default JantaVoldy;
