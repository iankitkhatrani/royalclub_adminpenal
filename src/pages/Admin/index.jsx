import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import AdminTable from './AdminTable';
const Admin = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Admin' subParent='Admin Management' mainTitle='Admin Management' />
      <Container fluid={true}>
        <Row>
          <AdminTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Admin;
