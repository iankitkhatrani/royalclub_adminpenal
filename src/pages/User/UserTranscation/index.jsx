import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import TranscationTable from './TranscationTable';
const UserTranscation = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='User Transcation' mainTitle='User Transcation' />
      <Container fluid={true}>
        <Row>
          <TranscationTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default UserTranscation;
