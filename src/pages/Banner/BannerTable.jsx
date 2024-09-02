import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import SweetAlert from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';
import { addBanner, deleteBanner, getBanner, isOpenStatusModal, statusToggle, statusUpdateBanner, ModalToggle, isOpenModal } from '../../store/bannerSlice';
import Empty from '../../Components/Empty/Index';

const BannerTable = () => {
  const storeVar = useSelector(state => state.banner)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [submit, setSubmit] = useState(false);
  const [typingTimer, setTypingTimer] = useState(null);
  const typingDelay = 800;
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'ACTIVE',
    title:"",
    modalTitle: null,
    editState: false,
    bannerId: null,
    bannerStatus: 'ACTIVE',
    bannerFile: null,
    bannerImage: null,
    bannerImageURL: null,
  });

  useEffect(() => {
    dispatch(getBanner(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);


  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    searchWithDelay(e.target.value)
    // dispatch(getBanner(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }
  const searchWithDelay = (keyword) => {
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(getBanner(formVar.limit, formVar.offset, formVar.status, keyword))
    }, typingDelay);
    setTypingTimer(timer);
  };
  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getBanner(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };


  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      bannerId: data._id,
      bannerStatus: data.status,
      title:data.title,
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      bannerImage: null,
      modalTitle: 'Add Banner',
    }))
  }

  const submitBanner = () => {
    if (filesValid() || titleValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addBanner({ title: formVar.title, image: formVar.bannerFile }))
  }
  const BannerDelete = (data) => {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'cancel',
      reverseButtons: true
    })
      .then((result) => {
        if (result.value) {
          dispatch(deleteBanner({ id: data._id }))
        }
      });
  }
  const onValueChange = (event) => {
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      bannerStatus: event.target.value,
    }))
  }
  const submitStatus = () => {
    dispatch(statusUpdateBanner({ id: formVar.bannerId, status: formVar.bannerStatus,title:formVar.title }))
  }
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormVar((prevFormVar) => ({
          ...prevFormVar,
          bannerImageURL: e.target.result,
        }))
      };
      reader.readAsDataURL(file);
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        bannerFile: file,
      }))
    } else if (status === "removed") {
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        bannerFile: null,
        bannerImageURL: null,
      }))
    }
  };

  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }
  const titleValid = () => {
    if (!formVar.title) {
      return "Title is required";
    }
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="4">
                <Row>
                  <Col md="12">
                    <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                      value={formVar.status} onChange={handleInputChange}>
                      <option value='ACTIVE'>ACTIVE</option>
                      <option value='DEACTIVE'>DEACTIVE</option>
                      <option value='PENDING'>PENDING</option>
                    </Input>
                  </Col>
                </Row>
              </Col>
              <Col md="2" className='d-flex gap-1 justify-content-end align-items-center'>
                <div className="text-end border-2 w-100">
                  <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: AddToggleModal }}>
                    Add Banner
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
                  <th scope='col'>Image</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Status</th> 
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.bannerData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td className='w-25'>
                      {/* <div className="w-25"> */}
                      <img className='w-100 h-5-r' src={item.imageUrl} alt="" />
                      {/* </div> */}
                    </td>
                    <th scope='row'>{item.title}</th>
                    <td>
                      {
                        item.status === 'ACTIVE' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'ACTIVE' && (
                              <i className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i>
                            )}
                            &nbsp; <span>{item.status}</span>
                          </span>
                        </>
                      }
                      {
                        item.status === 'PENDING' && <>
                          <span className={`font-warning rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'PENDING' && (
                              <i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                            )}
                            &nbsp; <span>{item.status}</span>
                          </span>
                        </>
                      }
                      {
                        item.status === 'DEACTIVE' && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'DEACTIVE' && (
                              <i className="fa fa-times-circle-o fa-lg" aria-hidden="true"></i>
                            )}
                            &nbsp; <span>{item.status}</span>
                          </span>
                        </>
                      }
                    </td>
                    <td>
                      <div className='d-flex gap-2 align-items-center'>
                        <div className='cursor-pointer bg-light-info font-info action-icon'>
                          <i className="fa fa-toggle-on fa-lg" onClick={(e) => statusToggleModal(item)}></i>
                          <div className="tooltipCustom">Status Update</div>
                        </div>
                        <div className='cursor-pointer bg-light-danger font-danger action-icon'>
                          <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={(e) => BannerDelete(item)}></i>
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
            storeVar.bannerData?.length <= 0 && (
              <Empty />
            )
          }
        </Card>
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          {
            formVar.bannerImageURL && <>
              <div className='d-flex justify-content-center h-10-r'>
                <img className=' h-100' src={formVar.bannerImageURL} alt="" />
              </div>
            </>
          }

          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Title</Label>
            <Input className="form-control form-control-inverse btn-square" placeholder="Enter Title" name="title" type="text"
              value={formVar.title} onChange={(e) => setFormVar((prevFormVar) => ({
                ...prevFormVar, title: e.target.value
              }))} />
              {submit && titleValid() ? <span className='d-block font-danger'>{titleValid()}</span> : ""}
            <Label className="col-form-label" for="recipient-name">Image</Label>
            <Dropzone
              className='dropzone dz-clickable'
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}
              // canCancel={false}
              accept="image/*"
              inputContent='Drop A File'
              styles={{
                dropzone: { width: '100%', height: 150 },
                dropzoneActive: { borderColor: 'green' },
              }}
            />
            {submit && filesValid() ? <span className='d-block font-danger'>{filesValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitBanner }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
        <Label className="col-form-label" for="recipient-name">Title</Label>
            <Input className="form-control form-control-inverse btn-square" placeholder="Enter Title" name="title" type="text"
              value={formVar.title} onChange={(e) => setFormVar((prevFormVar) => ({
                ...prevFormVar, title: e.target.value
              }))} />
              {submit && titleValid() ? <span className='d-block font-danger'>{titleValid()}</span> : ""}
        </Col>
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' name='radio1' checked={formVar.bannerStatus === 'ACTIVE'} onChange={onValueChange} value='ACTIVE' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>ACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' name='radio2' checked={formVar.bannerStatus === 'DEACTIVE'} onChange={onValueChange} value='DEACTIVE' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>DEACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline3' type='radio' name='radio3' checked={formVar.bannerStatus === 'PENDING'} onChange={onValueChange} value='PENDING' />
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
      </CommonModal>
    </Fragment>
  );
};

export default BannerTable;
