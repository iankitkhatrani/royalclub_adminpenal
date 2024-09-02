import React, { Fragment, useState } from 'react';
import { Col, Card, Label, Input, Row, CardBody, CardFooter } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../store/settingsSlice';

const SettingsCards = () => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    oldPassword: '',
    newPassword: '',
    cPassword: '',
  });


  const submitChangePassword = () => {
    if (oldPasswordValid() || newPasswordValid() || cPasswordValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(changePassword({ oldPassword:formVar.oldPassword,newPassword:formVar.newPassword,cPassword:formVar.cPassword}))

  }


  const oldPasswordValid = () => {
    if (!formVar.oldPassword) {
      return "Old Password is required";
    }
  }
  const newPasswordValid = () => {
    if (!formVar.newPassword) {
      return "New Password is required";
    }
  }
  const cPasswordValid = () => {
    if (formVar.newPassword !== formVar.cPassword) {
      return "Password and confirm password are not match";
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="4">
              <Label className="col-form-label fw-bold" for="recipient-name">Old Password</Label>
              <Input className="form-control" placeholder='Enter Old Password' type="text"
                onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, password: e.target.value }))} value={formVar.password} />
              {submit && oldPasswordValid() ? <span className='d-block font-danger'>{oldPasswordValid()}</span> : ""}
            </Col>
            <Col md="4">
              <Label className="col-form-label fw-bold" for="recipient-name">New Password</Label>
              <Input className="form-control" placeholder='Enter New Password' type="text"
                onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, newPassword: e.target.value }))} value={formVar.newPassword} />
              {submit && newPasswordValid() ? <span className='d-block font-danger'>{newPasswordValid()}</span> : ""}
            </Col>
            <Col md="4">
              <Label className="col-form-label fw-bold" for="recipient-name">Confirm Password</Label>
              <Input className="form-control" placeholder='Enter Confirm Password' type="text"
                onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, cPassword: e.target.value }))} value={formVar.cPassword} />
              {submit && cPasswordValid() ? <span className='d-block font-danger'>{cPasswordValid()}</span> : ""}
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Col md="12" className='d-flex justify-content-end align-items-center'>
            <div className="text-end border-2">
              <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: submitChangePassword }}>
                Save Chenges
              </Btn>
            </div>
          </Col>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default SettingsCards;
