import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import SweetAlert from 'sweetalert2';
import Pagination from '../../Components/Pagination/Pagination';
import { getNotice, ModalToggle, isOpenModal, addNotice, updateNotice, statusUpdateNotice, statusToggle, isOpenStatusModal, deleteNotice } from '../../store/noticeSlice';
import Empty from '../../Components/Empty/Index';
import moment from 'moment';

const NoticeTable = () => {
  const storeVar = useSelector(state => state.notice)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
    const statusModalToggle = () => dispatch(statusToggle());
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  const [typingTimer, setTypingTimer] = useState(null);
  const typingDelay = 800;
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    noticeId: null,
    title: '',
    content: '',
  });

  useEffect(() => {
    dispatch(getNotice(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);

  const searchWithDelay = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(getNotice(formVar.limit, formVar.offset, formVar.status, e.target.value))
    }, typingDelay);
    setTypingTimer(timer);

  };
  const itemsLimitChange=(limit)=>{
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      limit: limit
    }))
    dispatch(getNotice(limit, formVar.offset, formVar.status, formVar.keyword))
    
  }
  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getNotice(formVar.limit, offset, formVar.status, formVar.keyword))
  };
  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getNotice(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      noticeId: data._id,
      title: data.title,
      content: data.content,
      modalTitle: 'Edit Notice'
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      title: '',
      content: '',
      modalTitle: 'Add Notice',
    }))
  }
    const onValueChange = (event) => {
    setStateStatus(event.target.value)
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      noticeId: data._id,
    }))
  }
  const noticeDelete = (data) => {
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
          dispatch(deleteNotice({ id: data._id }))
        }
      });
  }
  const submitAddNotice = () => {
    if (titleValid() || contentValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateNotice({ id: formVar.noticeId, title: formVar.title, content: formVar.content }))
    } else {
      dispatch(addNotice({ title: formVar.title, content: formVar.content }))
    }
  }

  const submitStatus = () => {
    dispatch(statusUpdateNotice({ id: formVar.noticeId, status: stateStatus }))
  }
  const titleValid = () => {
    if (!formVar.title) {
      return "Title is required";
    }
  }
  const contentValid = () => {
    if (!formVar.content) {
      return "Description is required";
    }
  }

  const getDate = (date) => {
    if (date) {
      return moment(date).format('MMM Do YYYY')
    }
  }
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
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='DEACTIVE'>DEACTIVE</option>
                </Input>
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2 w-100">
                  <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: AddToggleModal }}>
                    Add Notice
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
                  <th scope='col'>Title</th>
                  <th scope='col'>Content</th>
                  <th scope='col'>Posted Date</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.noticeData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.title} </td>
                    <td>{item.content}</td>
                    <td>{getDate(item.createdAt)}</td>
                    <td>
                      {
                        item.status === 'ACTIVE' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'ACTIVE' && (
                              <i className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i>
                            )}
                            &nbsp; <span>ACTIVE</span>
                          </span>
                        </>
                      }
                      {
                        item.status === 'DEACTIVE' && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'DEACTIVE' && (
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
                        <div className='cursor-pointer bg-light-danger font-danger action-icon'>
                          <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={(e) => noticeDelete(item)}></i>
                          <div className="tooltipCustom">Delete</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {
            storeVar.noticeData?.length <= 0 && (
              <Empty />
            )
          }
        </Card>
        {
          storeVar.noticeData.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalNotice} limitSelect={true}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} onItemsLimitChange={itemsLimitChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Title</Label>
            <Input className="form-control" type="text" placeholder='Enter Question' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, title: e.target.value }))} value={formVar.title} />
            {submit && titleValid() ? <span className='d-block font-danger'>{titleValid()}</span> : ""}

            <Label className="col-form-label" for="recipient-name">Description</Label>
            <textarea className='form-control' name='description' rows='3' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, content: e.target.value }))} value={formVar.content} />
            {submit && titleValid() ? <span className='d-block font-danger'>{titleValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitAddNotice }}>Save Changes</Btn>
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
    </Fragment>
  );
};

export default NoticeTable;
