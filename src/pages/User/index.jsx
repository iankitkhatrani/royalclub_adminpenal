import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import UserTable from './UserTable';
const User = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Users' subParent='User Management' mainTitle='User Management' />
      <Container fluid={true}>
        <Row>
          <UserTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default User;
