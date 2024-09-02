import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import SocialWidget from '../../Common/CommonWidgets/SocialWidget';
import Widgets1 from '../../Common/CommonWidgets/Widgets1';
import SmallWidgets from '../../Common/CommonWidgets/SmallWidgets';
import { getAdminDashboard, getDashboard, getLatatestAgent, getLatatestUser } from '../../../store/dashboardSlice';
import TodoContain from '../../Todo';
import SuperAdminTranscation from '../../../Pages/SuperAdminTranscation';
// import { useNavigate } from "react-router-dom";

const Social = () => {
  const storeVar = useSelector(state => state.dashboard)
  const dispatch = useDispatch();
  const [roles, setRoles] = useState('')

  useEffect(() => {
    let role = localStorage.getItem('roles')
    setRoles(role)
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    // const formattedOneMonthAgo = `/${oneMonthAgo.getFullYear()}-${(oneMonthAgo.getMonth() + 1).toString().padStart(2, '0')}-${oneMonthAgo.getDate().toString().padStart(2, '0')}`;
    // const formattedToday = `/${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}/`;
    // dispatch(dashboardsData(formattedOneMonthAgo + formattedToday));
    // dispatch(dashboardsData());
    // dispatch(dashboardpie());
    if (role === 'SuperAdmin') {
      dispatch(getDashboard())
    } else if (role === 'Admin') {
      dispatch(getAdminDashboard())
      dispatch(getLatatestUser())
      dispatch(getLatatestAgent())
    } else if (role === 'Agent') {
      dispatch(getLatatestUser())
    }
  }, [])

  return (
    <Fragment>
      <Breadcrumbs mainTitle='Dashboard' parent='Dashboard' title='' />
      {
        roles === 'SuperAdmin' &&
        <Container fluid={true}>
          <Row>
            <Col xxl='12' xl='12' >
              <Row>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.totalUser || 0} icon='user' color={"#9186ff"} increment={storeVar.totalUser || 0} title={'Total User'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.totalAdmin || 0} icon='admin' color={"#2fff1b"} increment={storeVar.totalAdmin || 0} title={'Total Admin'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.totalAgent || 0} icon='agent' color={"#60dcff"} increment={storeVar.totalAgent || 0} title={'Total Agent'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.totaljanta || 0} icon='return' color={"#FFA941"} increment={10} title={'Total Janta'} />
                </Col>
              </Row>
              <Row>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Game Pay" total={storeVar.totalGamePay || 0} color="secondary" icon="cart" gros="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Total Profit" total={storeVar.totalProfit || 0} color="warning" icon="return-box" gros="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Total Deposit" total={storeVar.totalDeposit || 0} color="primary" icon="tag" gros="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Total Rummy" total={storeVar.totalrummy || 0} color="success" icon="rate" gros="" />
                </Col>
              </Row>
              <Row>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <SmallWidgets mainClass='mb-sm-0' title="Total Ludo" total={storeVar.totalludo || 0} color="primary" icon="new-order" gros="" prefix="" suffix="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <SmallWidgets mainClass='mb-sm-0' title="Total Teenpatti" total={storeVar.totalteenpatti || 0} color="warning" icon="customers" gros="" prefix="" suffix="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <SmallWidgets mainClass='mb-sm-0' title="Total Ludo" total={storeVar.totalludo || 0} color="secondary" icon="sale" gros="" prefix="" suffix="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <SmallWidgets mainClass='' title="Total Roulette" total={storeVar.totalRoulette || 0} color="success" icon="profit" gros="" prefix="" suffix="" />
                </Col>
              </Row>
              <Row>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Today Deposit" total={storeVar.todayDeposit || 0} color="secondary" icon="cart" gros="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Total Profit" total={storeVar.todayProfit || 0} color="warning" icon="return-box" gros="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Total Withdraw" total={storeVar.todayWithdraw || 0} color="primary" icon="tag" gros="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <Widgets1 title="Percentage" total={storeVar.totalPercentage !== "NaN" ? storeVar.totalPercentage : 0} color="success" icon="rate" gros="" />
                </Col>
              </Row>
              <Row>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <SmallWidgets mainClass='mb-sm-0' title="Today GamePay" total={storeVar.toDayGamePay || 0} color="primary" icon="new-order" gros="" prefix="" suffix="" />
                </Col>
                <Col sm='6' xl='3' lg='6' className='box-col-6'>
                  <SmallWidgets mainClass='' title="Config Day Wise Winloss" total={storeVar.ConfigdaywiseWinloss !== "NaN" ? storeVar.ConfigdaywiseWinloss : 0} color="warning" icon="customers" gros="" prefix="" suffix="" />
                </Col>
                {/* <Col sm='6' xl='3' lg='6' className='box-col-6'>
                <SmallWidgets mainClass='mb-sm-0' title="Total Ludo" total={storeVar.totalludo || 0} color="secondary" icon="sale" gros="" prefix="" suffix="" />
              </Col>
              <Col sm='6' xl='3' lg='6' className='box-col-6'>
                <SmallWidgets mainClass='mb-sm-0' title="Total Ludo" total={storeVar.totalludo || 0} color="success" icon="profit" gros="" prefix="" suffix="" />
              </Col> */}
              </Row>
              {/* <div className='p-3 mb-2 bg-body rounded bg-white shadow-sm d-flex align-items-center'>
              <H6>Staff Leads Count</H6>
            </div> */}
            </Col>
            {/* <Col xl='6'>
            <TodoContain />
          </Col> */}
          </Row>
           
           <SuperAdminTranscation/>
        </Container>
      }
      {
        roles === 'Admin' &&
        <Container fluid={true}>
          <Row>
            <Col xxl='12' xl='12' >
              <Row>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.adminDashData?.totalUser || 0} icon='user' color={"#9186ff"} increment={storeVar.totalUser || 0} title={'Total User'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.adminDashData?.totalAgent || 0} icon='agent' color={"#2fff1b"} increment={storeVar.totalAdmin || 0} title={'Total Agent'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.adminDashData?.totalAdminChips || 0} icon='admin' color={"#60dcff"} increment={storeVar.totalAgent || 0} title={'Total Admin Chips'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.adminDashData?.totalAgentChips || 0} icon='return' color={"#FFA941"} increment={0} title={'Total Agent Chips'} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' sm='12'>
            <TodoContain title='Latest User' data={storeVar.latestUser}/>
            </Col>
            <Col md='6' sm='12'>
            <TodoContain title='Latest Agent' data={storeVar.latestAgent}/>
            </Col>
          </Row>
        </Container>
      }
            {
        roles === 'Agent' &&
        <Container fluid={true}>
          <Row>
            <Col xxl='12' xl='12' >
              <Row>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.adminDashData?.totalUser || 0} icon='user' color={"#9186ff"} increment={storeVar.totalUser || 0} title={'Total User'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={storeVar.adminDashData?.totalAgentChips || 0} icon='return' color={"#FFA941"} increment={10} title={'Total Chips'} />
                </Col>
                <Col md='6' sm='6' >
                <TodoContain title='Latest User' data={storeVar.latestUser}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      }
    </Fragment>
  );
};

export default Social;
