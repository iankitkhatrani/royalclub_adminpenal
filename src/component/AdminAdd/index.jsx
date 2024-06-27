import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function adminAdd() {

  const location = useLocation();
  //console.log("location ", location.state)
  const Botinfo = location.state;

  const context = useContext(offerContext)
  const { AddAdmin, host } = context

  console.log("Botinfo :::::::::::::::::",Botinfo)

  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/adminmanagement');
  };

  let [userInfo, SetuserInfo] = useState({
    name: "",
    password: "",
    commission: 0,
    partnerpercentagejanata: 0,
    partnerpercentageroulette: 0,
    status:true
  })



  const OnChange = (event) => {
    let { name, value } = event.target;

    console.log("OnChange :::::::::::",name, value)

    SetuserInfo({
      ...userInfo,
      [name]: value == "inactive"?false:true,
    });


    console.log("handleChange ::::::::::::::::::::::", userInfo)

  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("NAME :::::::::::::::::", value)
    SetuserInfo({
      ...userInfo,
      [name]: value,
    });

    console.log("handleChange ::::::::::::::::::::::", userInfo)

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can handle the form submission here
    // This example just logs the data to the console

    console.log("userInfo ", userInfo)

    if(!/^[a-zA-Z\s]+$/.test(userInfo.name)  ){
      alert("Invalid Admin Name. Admin Name should only contain alphabetic characters and spaces.")
      return false
    }


    if(userInfo.password.length < 4){
      alert("Invalid passwordValue leangth Must be 4 characters.")
      return false
    }

    let res = await AddAdmin(userInfo)

    console.log("REsponce ::::::::::::::::::::::", res)

    if (res.status == "ok") {
      navigateToContacts()
    } else if(res.msg != undefined) {
      alert(res.msg)
    } else {
      alert("Error Please enter")
    }
    console.log(userInfo);
  };


  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
        Admin Registration
        </h3>
        <div className="mt-8">
          <form action="">
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Admin Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder={userInfo.name}
                  name="name"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Password
                </label>
                <input
                  type="text"
                  id="password"
                  placeholder={userInfo.password}
                  name="password"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Commission
                </label>
                <input
                  type="text"
                  id="commission"
                  placeholder={userInfo.commission}
                  name="commission"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Partner Percentage Janta
                </label>
                <input
                  type="text"
                  id="partnerpercentagejanata"
                  placeholder={userInfo.partnerpercentagejanata}
                  name="partnerpercentagejanata"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />

              </div>


              <div className="flex flex-col gap-2">
                <label
                  htmlFor="robotname"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                Partner Percentage Roulette
                </label>
                <input
                  type="text"
                  id="partnerpercentageroulette"
                  placeholder={userInfo.partnerpercentageroulette}
                  name="partnerpercentageroulette"
                  className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2">

                <label
                  htmlFor="Status"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                >
                  Status
                </label>

                <label htmlFor="Active"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium">
                  <input
                    type="radio"
                    value="active"
                    name="status"
                    checked={userInfo.status === true}
                    onChange={OnChange}
                  />
                  Active
                </label>
                <label htmlFor="Inactive"
                  className="text-base text-bgray-600 dark:text-bgray-50  font-medium">
                  <input
                    type="radio"
                    value="inactive"
                    name="status"
                    checked={userInfo.status === false || userInfo.status === ""}
                    onChange={OnChange}
                  />
                  Inactive
                </label>
              </div>


            </div>

            <div className="flex justify-end">
              <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                onClick={handleSubmit}
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default adminAdd;