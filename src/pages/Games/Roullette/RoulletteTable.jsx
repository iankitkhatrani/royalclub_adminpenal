import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Input, Row } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import Empty from '../../../Components/Empty/Index'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../Components/Pagination/Pagination';
import moment from 'moment';
import { getRolleteHistory } from '../../../store/rolletteSlice';
import cardImages from '../../../assets/images/cardImage';
import { cardsList } from '../../../_helper/constent';

function RoulletteTable() {
  const storeVar = useSelector(state => state.rollette)
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
  function serchImage(img) {
    let cards=cardsList.map(element => {
      return{
        type:element,
        imagePath:cardImages[element]
      }
    });
    const objIndex = cards.findIndex((obj) => obj.type === img);
    if(objIndex>=0){
      return cards[objIndex].imagePath
    }

  }

  useEffect(() => {
    dispatch(getRolleteHistory(formVar.limit, formVar.offset, formVar.keyword, formVar.fromDate, formVar.toDate))

  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getRolleteHistory(formVar.limit, offset, formVar.keyword, formVar.fromDate, formVar.toDate))

  };

  const searchWithDelay = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(getRolleteHistory(formVar.limit, formVar.offset, e.target.value, formVar.fromDate, formVar.toDate))

    }, typingDelay);
    setTypingTimer(timer);
  };
  const dateFilterChangeFronDate = () => {
    dispatch(getRolleteHistory(formVar.limit, formVar.offset, formVar.keyword, formVar.fromDate, formVar.toDate))

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
              <Col md="3" sm='gap-1 py-1'>
                <Input className="form-control form-control-inverse btn-square" name="select" type="date" value={formVar.fromDate}
                  onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, fromDate: e.target.value }))} />
              </Col>
              <Col md="3" sm='gap-1 py-1'>
                <Input className="form-control form-control-inverse btn-square" name="select" type="date" value={formVar.toDate}
                  min={formVar.fromDate} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, toDate: e.target.value }))} />
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center gap-2'>
                <div className="text-end border-2 w-100">
                  <Btn attrBtn={{ color: 'info-gradien', className: 'w-100', size: 'sm', onClick: dateFilterChangeFronDate }}>
                    Submit
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
                  <th scope='col'>Game Play Type</th>
                  <th scope='col'>Date and Time</th>
                  <th scope='col'>Table Id</th>
                  <th scope='col'>Room Id</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Player Status</th>
                  <th scope='col'>Game Bet</th>
                  <th scope='col'>Game</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.gameTracksData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.gamePlayType}</td>
                    <td>{getDateTime(item.date)}</td>
                    <td><span className='text-break'>{item.tableId} </span></td>
                    <td>{item.gameId}</td>
                    <td>{item.username}</td>
                    <td>{item.playerStatus}</td>
                    <td>{item.gameBet}</td>
                    <td>
                          <div id="image-container-rummy" >
                      {
                        item.sowCard?.map((card, cdIndex) => (
                            <img key={cdIndex} src={serchImage(card)} alt="" />
                          ))
                        }
                          </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {
            storeVar.rolletteHistoryData?.length <= 0 && (
              <Empty />
            )
          }
        </Card>
        {
          storeVar.rolletteHistoryData.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalRolletteHistory}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
    </Fragment>
  )
}

export default RoulletteTable