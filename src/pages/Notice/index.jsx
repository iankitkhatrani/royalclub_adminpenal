import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import NoticeTable from './NoticeTable';
const Notice = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Notice' mainTitle='Notice' />
      <Container fluid={true}>
        <Row>
          <NoticeTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Notice;
