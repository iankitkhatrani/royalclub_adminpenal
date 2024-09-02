import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Pagination from '../../Components/Pagination/Pagination';
// import { useNavigate } from "react-router-dom";
import moment from 'moment'
// import CustomizerContext from '../../_helper/Customizer';
import Empty from '../../Components/Empty/Index';
import { getUser, statusToggle, ModalToggle, isOpenModal, isOpenStatusModal, statusUpdateUser, addUser, moneyToggle, isOpenMoneyModal, addMoney } from '../../store/userSlice';

const UserTable = () => {
  const storeVar = useSelector(state => state.user)
  const dispatch = useDispatch();
  // const history = useNavigate();
  // const { layoutURL } = useContext(CustomizerContext);
  const toggle = () => dispatch(ModalToggle());
  const moneyModalToggle = () => dispatch(moneyToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [togglePassword, setTogglePassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [typingTimer, setTypingTimer] = useState(null);
  const typingDelay = 800;
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: true,
    modalTitle: null,
    editState: false,
    userId: null,

    money: '',
    password: '',
    name: '',
    authorisedid: '',
    authorisedname: '',
    authorisedtype: '',
  });

  useEffect(() => {
    dispatch(getUser(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);
  const itemsLimitChange=(limit)=>{
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      limit: limit
    }))
    dispatch(getUser(limit, formVar.offset, formVar.status, formVar.keyword))
    
  }
  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getUser(formVar.limit, offset, formVar.status, formVar.keyword))
  };

  const searchWithDelay = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(getUser(formVar.limit, formVar.offset, formVar.status, e.target.value))
    }, typingDelay);
    setTypingTimer(timer);
  };

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getUser(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      userId: data.id,
      name: data?.organization[0]?.name,
      modalTitle: 'Edit User'
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      password: '',
      name: '',
      modalTitle: 'Add User',
    }))
  }
  const onValueChange = (event) => {
    setStateStatus(event.target.value)
  }
  const moneyToggleModal = (data) => {
    dispatch(isOpenMoneyModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      userId: data._id,
      authorisedid: data.authorisedid,
      authorisedname: data.authorisedname,
      authorisedtype: data.authorisedtype,
    }))
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status ? 'ACTIVE' : 'DEACTIVE')
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      userId: data._id,
    }))
  }

  const submitDegree = () => {
    // if (formVar.editState) {
    //   if (
    //     nameValid()) {
    //     setSubmit(true)
    //     return null
    //   }
    //   setSubmit(false)
    //   dispatch(updateStaff({
    //     id: formVar.userId,
    //     name: formVar.name
    //   }))
    // } else {
    if (
      nameValid() ||
      passwordValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addUser({
      password: formVar.password,
      name: formVar.name,
    }))
    // }
  }
  const submitStatus = () => {
    dispatch(statusUpdateUser({ id: formVar.userId, status: stateStatus === 'ACTIVE' ? true : false }))
  }
  const addAmount = () => {
    if (
      moneyValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addMoney({
      id: formVar.userId, 
      money: formVar.money,
      authorisedid: formVar.authorisedid,
      authorisedname: formVar.authorisedname,
      authorisedtype: formVar.authorisedtype,
    }))
  }
  const nameValid = () => {
    if (!formVar.name) {
      return "Name is required";
    }
  }
  const passwordValid = () => {
    if (!formVar.password) {
      return "Password is required";
    }
  }
  const moneyValid = () => {
    if (!formVar.money) {
      return "Amount is required";
    }
  }
  // const emailValid = () => {
  //   let emailValid = /^([a-z0-9.-]+)@([a-z]{4,12}).([a-z.]{2,20})$/
  //   if (!formVar.emailId) {
  //     return "Email is required";
  //   } else if (!emailValid.test(formVar.emailId)) {
  //     return "Please enter valid email!";
  //   }
  // }
  // const navigate = (id) => {
  //   history(`/staff/permission/` + layoutURL + '?id=' + id)
  // }
  const getDate = (date) => {
    if (date) {
      return moment(date).format('MMM Do YYYY')
    }
  }
  const getDateTime = (date) => {
    if (date) {
      return moment(date).format('MMM Do YYYY hh:mm A')
    }
  }
  //   let curr = new Date();
  //   curr.setDate(curr.getDate());
  //   let date = curr.toISOString().substring(0, 10);
  // console.log({date,moment:moment().format("YYYY-MM-DD")});
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchWithDelay(e)}
                />
              </Col>
              <Col md="4">
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value={true}>ACTIVE</option>
                  <option value={false}>DEACTIVE</option>
                </Input>
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2 w-100">
                  <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: AddToggleModal }}>
                    Add User
                  </Btn>
                </div>
              </Col>
            </Row>
          </CardHeader>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Authorised By</th>
                  <th scope='col'>Total Match</th>
                  <th scope='col'>Total Chips</th>
                  <th scope='col'>Created At</th>
                  <th scope='col'>Last Login</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.userData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.authorisedname ? item.authorisedname + ' (' + item.authorisedtype + ')' : '-'}</td>
                    <td>{item.counters?.totalMatch}</td>
                    <td>{item.chips}</td>
                    <td>{getDate(item.createdAt)}</td>
                    <td>{getDateTime(item.lastLoginDate)}</td>
                    <td>
                      {
                        item.status === true && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === true && (
                              <i className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i>
                            )}
                            &nbsp; <span>ACTIVE</span>
                          </span>
                        </>
                      }
                      {
                        item.status === false && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === false && (
                              <i className="fa fa-times-circle-o fa-lg" aria-hidden="true"></i>
                            )}
                            &nbsp; <span>DEACTIVE</span>
                          </span>
                        </>
                      }
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <i className="fa fa-edit fa-lg" onClick={(e) => EditToggleModal(item)}></i>
                          <div className="tooltipCustom">Edit</div>
                        </div>
                        <div className='cursor-pointer bg-light-info font-info action-icon'>
                          <i className="fa fa-toggle-on fa-lg" onClick={(e) => statusToggleModal(item)}></i>
                          <div className="tooltipCustom">Status Update</div>
                        </div>
                        <div className='cursor-pointer bg-light-warning font-warning action-icon'>
                          <i className="fa fa-credit-card-alt" aria-hidden="true" onClick={(e) => moneyToggleModal(item)}></i>
                          <div className="tooltipCustom">Add Money</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {
            storeVar.userData?.length <= 0 && (
              <Empty />
            )
          }
        </Card>
        {
          storeVar.userData.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalUser} limitSelect={true}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} onItemsLimitChange={itemsLimitChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <div className="login-main login-tab">
          <Form>
            <Row>
              {
                !formVar.editState && (
                  <>
                    <Col md="12">
                      <FormGroup>
                        <Label className="col-form-label" for="recipient-name">Name</Label>
                        <Input className="form-control" type="text" placeholder='Enter Name'
                          onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, name: e.target.value }))} value={formVar.name} />
                        {submit && nameValid() ? <span className='d-block font-danger'>{nameValid()}</span> : ""}
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup className="position-relative">
                        <Label className="col-form-label">Password</Label>
                        <div className="position-relative">
                          <Input className="form-control" type={togglePassword ? "text" : "password"} placeholder="Enter password"
                            onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, password: e.target.value }))} value={formVar.password} />
                          <div className="show-hide-staff" onClick={() => setTogglePassword(!togglePassword)}>
                            <span className={togglePassword ? "" : "show"}></span>
                          </div>
                        </div>
                        {submit && passwordValid() ? <span className='d-block font-danger'>{passwordValid()}</span> : ""}
                      </FormGroup>
                    </Col>
                  </>
                )
              }
            </Row>
          </Form>
        </div>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitDegree }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' className="radio_animated" name='radio1' checked={stateStatus === 'ACTIVE'} onChange={onValueChange} value='ACTIVE' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>ACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' className="radio_animated" name='radio2' checked={stateStatus === 'DEACTIVE'} onChange={onValueChange} value='DEACTIVE' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>DEACTIVE</span>
              </Label>
            </div>
          </div>
        </Col>
        <ModalFooter className='justify-content-center'>
          <Btn attrBtn={{ color: 'secondary', onClick: statusModalToggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitStatus }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>

      <CommonModal isOpen={storeVar.isMoneyOpenModal} title={'Add Money'} toggler={moneyModalToggle} >
        <div className="login-main login-tab">
          <Form>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label className="col-form-label" for="recipient-name">Money</Label>
                  <Input className="form-control" type="text" placeholder='Enter Amount'
                    onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, money: e.target.value }))} value={formVar.money} />
                  {submit && moneyValid() ? <span className='d-block font-danger'>{moneyValid()}</span> : ""}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: moneyModalToggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: addAmount }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
    </Fragment>
  );
};

export default UserTable;
