import React, { Fragment, useState } from 'react';
import { Col, Card, Label, Input, Row, CardBody, CardFooter } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useDispatch } from 'react-redux';
import { sendNotification } from '../../store/notificationSlice';

const PushNotificationCards = () => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    title: '',
    desc: '',
  });


  const submutPushNotification = () => {
    if (titleValid() || descValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(sendNotification({ notification: formVar.desc, title: formVar.title }))

  }


  const titleValid = () => {
    if (!formVar.title) {
      return "Title is required";
    }
  }
  const descValid = () => {
    if (!formVar.desc) {
      return "Description is required";
    }
  }


  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="12">
              <Label className="col-form-label fw-bold" for="recipient-name">Notification Title</Label>
              <Input className="form-control" placeholder='Enter Notification Title' type="text"
                onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, title: e.target.value }))} value={formVar.title} />
              {submit && titleValid() ? <span className='d-block font-danger'>{titleValid()}</span> : ""}
            </Col>
            <Col md="12">
              <Label className="col-form-label fw-bold" for="recipient-name">Notification Description</Label>
              <Input className="form-control" placeholder='Enter Notification Description' type="textarea" rows={9} 
                onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, desc: e.target.value }))} value={formVar.desc} />
              {submit && descValid() ? <span className='d-block font-danger'>{descValid()}</span> : ""}
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Col md="12" className='d-flex justify-content-end align-items-center'>
            <div className="text-end border-2">
              <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: submutPushNotification }}>
                Save Chenges
              </Btn>
            </div>
          </Col>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default PushNotificationCards;
