import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import LudoTable from './LudoTable';
const Ludo = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Games' subParent='Ludo Games History' mainTitle='Ludo Games History' />
      <Container fluid={true}>
        <Row>
          <LudoTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Ludo;
