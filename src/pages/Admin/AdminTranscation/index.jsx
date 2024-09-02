import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import TranscationTable from './TranscationTable';
const AdminTranscation = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Admin' SubParent='Admin Transcation' mainTitle='Admin Transcation' />
      <Container fluid={true}>
        <Row>
          <TranscationTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default AdminTranscation;
