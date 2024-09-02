import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Input, Row } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import Empty from '../../../Components/Empty/Index'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../Components/Pagination/Pagination';
import { getAdmin } from '../../../store/adminSlice';

function JantaVoldyTable() {
  const storeVar = useSelector(state => state.admin)
  const dispatch = useDispatch();
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

  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row className='sm:gap-1'>
              <Col md="4" sm='gap-1 py-1'>
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchWithDelay(e)}
                />
              </Col>
              <Col md="2" sm='gap-1 py-1'>
                <Input className="form-control form-control-inverse btn-square" name="select" type="date" />
              </Col>
              <Col md="2" sm='gap-1 py-1'>
                <Input className="form-control form-control-inverse btn-square" name="select" type="date" />
              </Col>
              <Col md="4" className='d-flex justify-content-end align-items-center gap-2'>
                <Col md="6">
                  <div className="text-end border-2 w-100">
                    <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: '' }}>
                      Download as XLS
                    </Btn>
                  </div>
                </Col>
                <Col md="6">
                  <div className="text-end border-2 w-100">
                    <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: '' }}>
                      Download as PDF
                    </Btn>
                  </div>
                </Col>
              </Col>
            </Row>
          </CardHeader>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Date and Time</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Chips</th>
                  <th scope='col'>Txn Type</th>
                  <th scope='col'>From/To Name</th>
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
                    <td>{item.createdAt}</td>
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
    </Fragment>
  )
}

export default JantaVoldyTable