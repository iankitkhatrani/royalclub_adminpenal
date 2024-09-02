import React, { Fragment, useState, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { LoginId, Password, SignIn } from "../Constant";

import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/logo.png"
import CustomizerContext from "../_helper/Customizer";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

const Signin = ({ selected }) => {
  const dispatch = useDispatch();
  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");
  const [logintype, setLogintype] = useState('');
  const [submit, setSubmit] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);

  const onValueChange = (event) => {
    setLogintype(event.target.value)
  }
  const loginAuth = async (e) => {
    e.preventDefault();
    if (loginidValid() || passwordValid() || loginTypeValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(loginUser({ loginId: loginId, password: password, logintype: logintype, history, layoutURL }));
  };
  const loginidValid = () => {
    if (!loginId) {
      return "loginId is required";
    }
  }
  const loginTypeValid = () => {
    if (!logintype) {
      return "Login Type is required";
    }
  }
  const passwordValid = () => {
    if (!password) {
      return "password is required";
    } else if (password.length < 5) {
      return "password must be longer than or equal to 5 characters";
    }
  }
  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col lg="6" sm="12" xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                {/* <div className="login-page-logo-image">
                  <img src={logo} alt="" />
                </div> */}
                <Form className="theme-form">
                  <div className="sign-header">
                    <H4>{selected === "simpleLogin" ? "" : "Sign In With Admin Login"}</H4>
                    <P>{"Enter your loginId & password to login"}</P>
                  </div>
                  <FormGroup>
                    <Label className="col-form-label fw-bold">{LoginId}</Label>
                    <Input className="form-control" type="text" placeholder="Enter login id" onChange={(e) => setloginId(e.target.value)} value={loginId} />
                    {submit && loginidValid() ? <span className='d-block font-danger'>{loginidValid()}</span> : ""}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label fw-bold">{Password}</Label>
                    <div className="position-relative">
                      <Input className="form-control" type={togglePassword ? "text" : "password"} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                    {submit && passwordValid() ? <span className='d-block font-danger'>{passwordValid()}</span> : ""}
                  </FormGroup>
                  <Col md='12' sm='12'>
                    <Label className="col-form-label fw-bold" for="recipient-name">Type</Label>
                    <div className='d-flex mb-1 justify-content-between'>
                      <div className='radio radio-primary'>
                        <Input id='radioinline1' type='radio' className="radio_animated" name='radio1' checked={logintype === 'SuperAdmin'} onChange={onValueChange} value='SuperAdmin' />
                        <Label className='mb-0' for='radioinline1'>
                          <span className='digits fw-bold'>Super Admin</span>
                        </Label>
                      </div>
                      <div className='radio radio-primary'>
                        <Input id='radioinline2' type='radio' className="radio_animated" name='radio2' checked={logintype === 'Admin'} onChange={onValueChange} value='Admin' />
                        <Label className='mb-0' for='radioinline2'>
                          <span className='digits fw-bold'>Admin</span>
                        </Label>
                      </div>
                      <div className='radio radio-primary'>
                        <Input id='radioinline3' type='radio' className="radio_animated" name='radio2' checked={logintype === 'Agent'} onChange={onValueChange} value='Agent' />
                        <Label className='mb-0' for='radioinline3'>
                          <span className='digits fw-bold'>Agent</span>
                        </Label>
                      </div>
                    </div>
                    {submit && loginTypeValid() ? <span className='d-block font-danger'>{loginTypeValid()}</span> : ""}

                  </Col>
                  <div className="position-relative form-group mt-4 mb-0">
                    {/* <Label className="d-flex justify-content-start align-items-center cursor-pointer w-11-r" >
                      <div className="m-r-10 cursor-pointer">
                        <input id="inline-form-1" className='cursor-pointer' type="checkbox" />
                      </div>
                      {RememberPassword}
                    </Label> */}
                    {/* <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a> */}
                    <div className="d-flex justify-content-center align-items-center">
                      <Btn attrBtn={{ className: "d-flex justify-content-center align-items-center w-100 mt-2 log-butt", onClick: (e) => loginAuth(e) }}>{SignIn}</Btn>
                    </div>
                  </div>
                  {/* <OtherWay /> */}
                </Form>
              </div>
            </div>
          </Col>
          <Col lg="6" sm="12">
            <div className="login-page-left-image">
              <img src={logo} alt="" />
            </div>
          </Col>
        </Row>
      </Container >
      <ToastContainer />
    </Fragment >
  );
};

export default Signin;
