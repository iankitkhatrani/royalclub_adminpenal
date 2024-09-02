import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import SweetAlert from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Pagination from '../../Components/Pagination/Pagination';
// import { useNavigate } from "react-router-dom";
import moment from 'moment'
import Empty from '../../Components/Empty/Index';
import { getAdmin,ModalToggle, isOpenModal, addAdmin, updateAdmin, deleteAdmin } from '../../store/adminSlice';

const AdminTable = () => {
  const storeVar = useSelector(state => state.admin)
  const dispatch = useDispatch();
  // const history = useNavigate();
  // const { layoutURL } = useContext(CustomizerContext);
  const toggle = () => dispatch(ModalToggle());
  // const statusModalToggle = () => dispatch(statusToggle());
  // const [stateStatus, setStateStatus] = useState('ACTIVE');
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
    adminId: null,

    password: '',
    name: '',
    agentStatus: 'ACTIVE',
    commission: '',
    partnerpercentagejanata: '',
    partnerpercentageroulette: '',
  });

  useEffect(() => {
    dispatch(getAdmin(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);
  const itemsLimitChange=(limit)=>{
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      limit: limit
    }))
    dispatch(getAdmin(limit, formVar.offset, formVar.status, formVar.keyword))
    
  }
  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getAdmin(formVar.limit, offset, formVar.status, formVar.keyword))
  };

  const searchWithDelay = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(getAdmin(formVar.limit, formVar.offset, formVar.status, e.target.value))
    }, typingDelay);
    setTypingTimer(timer);
  };

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getAdmin(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      adminId: data._id,
      password: data.password,
      name: data.name,
      agentStatus: data.status === true ? 'ACTIVE' : 'DEACTIVE',
      commission: data.commission,
      partnerpercentagejanata: data.partnerpercentagejanata,
      partnerpercentageroulette: data.partnerpercentageroulette,
      modalTitle: 'Edit Staff'
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      password: '',
      name: '',
      status: 'ACTIVE',
      commission: '',
      partnerpercentagejanata: '',
      partnerpercentageroulette: '',
      modalTitle: 'Add Agent',
    }))
  }
  // const onValueChange = (event) => {
  //   setStateStatus(event.target.value)
  // }
  // const statusToggleModal = (data) => {
  //   dispatch(isOpenStatusModal(true))
  //   setStateStatus(data.status)
  //   setFormVar((prevFormVar) => ({
  //     ...prevFormVar,
  //     adminId: data.id,
  //   }))
  // }

  const submitAdmin = () => {
    if (
      nameValid() ||
      commissionValid() ||
      passwordValid() ||
      partnerpercentagejanataValid() ||
      partnerpercentagerouletteValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateAdmin({
        adminId:formVar.adminId,
        password: formVar.password,
        name: formVar.name,
        status: formVar.agentStatus === 'ACTIVE' ? true : false,
        commission: formVar.commission,
        partnerpercentagejanata: formVar.partnerpercentagejanata,
        partnerpercentageroulette: formVar.partnerpercentageroulette,
      }))
    } else {
      dispatch(addAdmin({
        password: formVar.password,
        name: formVar.name,
        status: formVar.agentStatus === 'ACTIVE' ? true : false,
        commission: formVar.commission,
        partnerpercentagejanata: formVar.partnerpercentagejanata,
        partnerpercentageroulette: formVar.partnerpercentageroulette,
      }))
    }
  }
  // const submitStatus = () => {
  //   dispatch(statusUpdateStaff({ id: formVar.adminId, status: stateStatus==='ACTIVE'?true:false }))
  // }
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
  const commissionValid = () => {
    if (!formVar.commission) {
      return "Commission is required";
    }
  }
  const partnerpercentagejanataValid = () => {
    if (!formVar.partnerpercentagejanata) {
      return "Commission is required";
    }
  }
  const partnerpercentagerouletteValid = () => {
    if (!formVar.partnerpercentageroulette) {
      return "Commission is required";
    }
  }
  const agentDelete = (data)=>{
    SweetAlert.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    })
      .then((result) => {
        if (result.value) {
          dispatch(deleteAdmin({ id: data._id }))
        }
      });
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
                <Input className="form-control f-light" placeholder='Serch..' type="text" id="yourInputId"
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
                    Add Admin
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
                  <th scope='col'>Chips</th>
                  <th scope='col'>Commission</th>
                  <th scope='col'>Total Agent</th>
                  <th scope='col'>Total User</th>
                  <th scope='col'>Created At</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.adminData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.chips}</td>
                    <td>{item.commission}%</td>
                    <td>{item.numberOfagent}</td>
                    <td>{item.numberOfuser}</td>
                    <td>{getDate(item.createdAt)}</td>
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
                      {/* {
                        item.status === 'PENDING' && <>
                          <span className={`font-warning rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'PENDING' && (
                              <i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                            )}
                            &nbsp; <span>{item.status}</span>
                          </span>
                        </>
                      } */}
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
                        <div className='cursor-pointer bg-light-danger font-danger action-icon'>
                          <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={(e) => agentDelete(item)}></i>
                          <div className="tooltipCustom">Delete</div>
                        </div>
                        {/* <div className='cursor-pointer action-icon'>
                          <i className="fa fa-toggle-on fa-lg" onClick={(e) => statusToggleModal(item)}></i>
                          <div className="tooltipCustom">Status Update</div>
                        </div> */} 
                        {/* <div className='cursor-pointer bg-light-info font-info action-icon'>
                          <i className="fa fa-lock fa-lg" aria-hidden="true" onClick={(e) => navigate(item.id)}></i>
                          <div className="tooltipCustom">Permission</div>
                        </div> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {
            storeVar.adminData?.length <= 0 && (
              <Empty />
            )
          }
        </Card>
        {
          storeVar.adminData.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalAdmin} limitSelect={true}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} onItemsLimitChange={itemsLimitChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <div className="login-main login-tab">
          <Form>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label className="col-form-label" for="recipient-name">Name</Label>
                  <Input className="form-control" type="text" placeholder='Enter Name'
                    onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, name: e.target.value }))} value={formVar.name} />
                  {submit && nameValid() ? <span className='d-block font-danger'>{nameValid()}</span> : ""}
                </FormGroup>
              </Col>
              <Col md="6">
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

              <Col md="6">
                <FormGroup>
                  <Label className="col-form-label" for="recipient-name">Commission</Label>
                  <Input className="form-control" type="text" placeholder='Enter' onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 3)}
                    onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, commission: e.target.value }))} value={formVar.commission ? formVar.commission : ''} />
                  {submit && commissionValid() ? <span className='d-block font-danger'>{commissionValid()}</span> : ""}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="col-form-label" for="recipient-name">Partner Percentage Janata</Label>
                  <Input className="form-control" type="text" placeholder='Enter'
                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 3)}
                    onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, partnerpercentagejanata: e.target.value }))} value={formVar.partnerpercentagejanata ? formVar.partnerpercentagejanata : ''} />
                  {submit && partnerpercentagejanataValid() ? <span className='d-block font-danger'>{partnerpercentagejanataValid()}</span> : ""}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="col-form-label" for="recipient-name">Partner Percentage Roulette</Label>
                  <Input className="form-control" type="text" placeholder='Enter'
                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 3)}
                    onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, partnerpercentageroulette: e.target.value }))} value={formVar.partnerpercentageroulette ? formVar.partnerpercentageroulette : ''} />
                  {submit && partnerpercentagerouletteValid() ? <span className='d-block font-danger'>{partnerpercentagerouletteValid()}</span> : ""}
                </FormGroup>
              </Col>
              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">Status</Label>
                <div className='d-flex m-10 '>
                  <div className='radio radio-primary'>
                    <Input id='radioinline1' type='radio' className="radio_animated" name='radio1' checked={formVar.agentStatus === 'ACTIVE'}
                      onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, agentStatus: e.target.value }))} value='ACTIVE' />
                    <Label className='mb-0' for='radioinline1'>
                      <span className='digits'>ACTIVE</span>
                    </Label>
                  </div>
                  <div className='radio radio-primary'>
                    <Input id='radioinline2' type='radio' className="radio_animated" name='radio2' checked={formVar.agentStatus === 'DEACTIVE'}
                      onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, agentStatus: e.target.value }))} value='DEACTIVE' />
                    <Label className='mb-0' for='radioinline2'>
                      <span className='digits'>DEACTIVE</span>
                    </Label>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitAdmin }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      {/* <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
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
            <div className='radio radio-primary'>
              <Input id='radioinline3' type='radio' className="radio_animated" name='radio3' checked={stateStatus === 'PENDING'} onChange={onValueChange} value='PENDING' />
              <Label className='mb-0' for='radioinline3'>
                <span className='digits'>PENDING</span>
              </Label>
            </div>
          </div>
        </Col>
        <ModalFooter className='justify-content-center'>
          <Btn attrBtn={{ color: 'secondary', onClick: statusModalToggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitStatus }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal> */}
    </Fragment>
  );
};

export default AdminTable;
