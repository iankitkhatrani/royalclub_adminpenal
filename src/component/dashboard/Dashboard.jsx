import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";

import offerContext from '../../context/offerContext'
import React,{useContext,useEffect,useState,useRef} from 'react';
import TotalWidgetCard from "./TotalWidgetCard";

function Dashboard() {

  const context = useContext(offerContext)
  const { dashboardData } = context
  let apiData = {}

  let [totalUser, settotalUser] = useState('');
  let [totalDeposit, settotalDeposit] = useState('');
  let [totalWithdraw, settotalWithdraw] = useState('');
  let [todayDeposit, settodayDeposit] = useState('');
  let [todayWithdraw, setTodaywithdraw] = useState('');
  let [todayKYC, setTodaykYC] = useState('');
  let [totalGamePay, setTotalgamePay] = useState('');

  useEffect( () => {
    const submitdata = async () => {
      apiData = await dashboardData()
      
      if(apiData.totalUser != undefined)
      settotalUser(apiData.totalUser)

      if(apiData.totalDeposit != undefined)
      settotalDeposit(apiData.totalDeposit)

      if(apiData.totalWithdraw != undefined)
      settotalWithdraw(apiData.totalWithdraw)

      if(apiData.todayDeposit != undefined)
      settodayDeposit(apiData.todayDeposit)

      if(apiData.todayWithdraw != undefined)
      setTodaywithdraw(apiData.todayWithdraw)

      if(apiData.todayKYC != undefined)
      setTodaykYC(apiData.todayKYC)

      if(apiData.totalGamePay != undefined)
      setTotalgamePay(apiData.totalGamePay)


  }

  submitdata()
  },[]);
  
  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Users"
          amount={totalUser}
          groth="+ 3.5%"
          id="totalEarn"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Deposit"
          amount={totalDeposit}
          groth="+ 3.5%"
          id="totalSpending"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Withdraw"
          amount={totalWithdraw}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Deposit"
          amount={todayDeposit}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Withdraw"
          amount={todayWithdraw}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today KYC"
          amount={todayKYC}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Games Played"
          amount={totalGamePay}
          groth="+ 3.5%"
          id="totalGoal"
        />
      </div>
    </div>
  );
}

export default Dashboard;
