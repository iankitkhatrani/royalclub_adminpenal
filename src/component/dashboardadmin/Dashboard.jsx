import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";

import offerContext from '../../context/offerContext'
import React, { useContext, useEffect, useState, useRef } from 'react';
import TotalWidgetCard from "./TotalWidgetCard";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Dashboard() {

  const context = useContext(offerContext)
  const { dashboardDataAdmin } = context
  let apiData = {}

  let [totalUser, settotalUser] = useState('');
  let [totalAgent, settotalAgent] = useState('');


  useEffect(() => {
    const submitdata = async () => {

      
        apiData = await dashboardDataAdmin(cookies.get('LoginUserId'),cookies.get('logintype'))
      

      if (apiData.totalUser != undefined)
        settotalUser(apiData.totalUser)

      if (apiData.totalAgent != undefined)
        settotalAgent(apiData.totalAgent)

    }

    submitdata()
  }, []);

  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Agent"
          amount={totalUser}
          groth="+ 3.5%"
          id="totalEarn"
          link="/agentmanagement"
        />

        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Users"
          amount={totalAgent}
          groth="+ 3.5%"
          id="totalEarn"
          link="/transaction"
        />

      </div>
    </div>
  );
}

export default Dashboard;
