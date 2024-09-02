import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import RoulletteTable from './RoulletteTable';
const Roullette = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Games' subParent='Roullette Games History' mainTitle='Roullette Games History' />
      <Container fluid={true}>
        <Row>
          <RoulletteTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Roullette;
