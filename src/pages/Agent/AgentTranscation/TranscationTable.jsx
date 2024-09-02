import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Input, Row } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import Empty from '../../../Components/Empty/Index'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../Components/Pagination/Pagination';
import moment from 'moment';
import { getAgentTranscationData } from '../../../store/agentSlice';
import exportFromJSON from 'export-from-json'

function TranscationTable() {
  const storeVar = useSelector(state => state.agent)
  const dispatch = useDispatch();
  const [typingTimer, setTypingTimer] = useState(null);
  const typingDelay = 800;
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    modalTitle: null,
    editState: false,
    adminId: null,
  });

  useEffect(() => {
    dispatch(getAgentTranscationData(formVar.limit, formVar.offset, formVar.keyword, formVar.fromDate, formVar.toDate))
  }, []);
  const itemsLimitChange=(limit)=>{
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      limit: limit
    }))
    dispatch(getAgentTranscationData(limit, formVar.offset, formVar.keyword, formVar.fromDate, formVar.toDate))
    
  }
  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getAgentTranscationData(formVar.limit, offset, formVar.keyword, formVar.fromDate, formVar.toDate))
  };

  const searchWithDelay = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(getAgentTranscationData(formVar.limit, formVar.offset, e.target.value, formVar.fromDate, formVar.toDate))
    }, typingDelay);
    setTypingTimer(timer);
  };
  const dateFilterChangeFronDate = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, fromDate: e.target.value }))
    dispatch(getAgentTranscationData(formVar.limit, formVar.offset, formVar.keyword, e.target.value, formVar.toDate))

  }
  const dateFilterChangeToDate = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, toDate: e.target.value }))
    dispatch(getAgentTranscationData(formVar.limit, formVar.offset, formVar.keyword, formVar.fromDate, e.target.value))
  }
  function downloadExcel(data) {
    const fileName = formVar.fromDate + " to " + formVar.toDate + " Report (Excel)";
    const exportType = exportFromJSON.types.xls;
    if (data) exportFromJSON({ data, fileName, exportType });
  }
  const getDateTime = (date) => {
    if (date) {
      return moment(date).format('MMM Do YYYY hh:mm A')
    }
  }
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
                <Input className="form-control form-control-inverse btn-square" name="select" type="date" value={formVar.fromDate}
                  onChange={(e) => dateFilterChangeFronDate(e)} />
              </Col>
              <Col md="2" sm='gap-1 py-1'>
                <Input className="form-control form-control-inverse btn-square" name="select" type="date" value={formVar.toDate}
                  min={formVar.fromDate} onChange={(e) => dateFilterChangeToDate(e)} />
              </Col>
              <Col md="4" className='d-flex justify-content-end align-items-center gap-2'>
                <Col md="6">
                  <div className="text-end border-2 w-100">
                    <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: () => downloadExcel(storeVar.agentTranscationData) }}>
                      Download as XLS
                    </Btn>
                  </div>
                </Col>
                <Col md="6">
                  <div className="text-end border-2 w-100">
                    <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: null }}>
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
                {storeVar.agentTranscationData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{getDateTime(item.createdAt)}</td>
                    <td>{item.chips}</td>
                    <td>{item.trnxAmount}</td>
                    <td>{item.trnxTypeTxt}</td>
                    <td>{item.authorisedname} / {item.authorisedtype}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {
            storeVar.agentTranscationData?.length <= 0 && (
              <Empty />
            )
          }
        </Card>
        {
          storeVar.agentTranscationData.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalAgentTranscation} limitSelect={true}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} onItemsLimitChange={itemsLimitChange}/>
        }
      </Col>
    </Fragment>
  )
}

export default TranscationTable