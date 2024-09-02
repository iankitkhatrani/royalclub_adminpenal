import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import SettingsCards from './SettingsCards';
const Settings = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Settings' mainTitle='Change Password' />
      <Container fluid={true}>
        <Row>
          <SettingsCards />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Settings;
