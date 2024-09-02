import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import PushNotificationCards from './PushNotificationCards';
const PushNotification = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Push Notification' mainTitle='Push Notification' />
      <Container fluid={true}>
        <Row>
          <PushNotificationCards />
        </Row>
      </Container>
    </Fragment>
  );
};

export default PushNotification;
