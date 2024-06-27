import ProtoTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import offerContext from '../../context/offerContext';
import React, { useState, useContext, useEffect } from 'react';
import PlayerImg from "../../assets/images/icon/player.png";

import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";
                    
function PlayerInfo({ UserId, UserName,chips, createdAt, lastLoginDate, status, uniqueId, password,commission,partnerpercentagejanata,partnerpercentageroulette }) {

  const navigate = useNavigate();
  const navigateToContacts = (UserId, UserName,chips, createdAt, lastLoginDate, status, uniqueId, password,commission,partnerpercentagejanata,partnerpercentageroulette) => {
    navigate('/adminedit', { state: { UserId, UserName,chips, createdAt, lastLoginDate, status, uniqueId, password,commission,partnerpercentagejanata,partnerpercentageroulette } });
  }


  const context = useContext(offerContext)
  const { AdminDelete } = context

  const NavigateDelete = async (UserId) => {
    await AdminDelete(UserId)

    navigate('/adminmanagement');
  }

  const NavigateTotalPlayer = async (UserId) => {
    navigate('/transaction', { state: { UserId } });
  }

  function formatDateTo12hr(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const formattedDate = dateTime.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Set to true for 12-hour format
    });
    return formattedDate;
  }

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {UserName}
          </p>
        </div>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {chips}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
      <p className="text-base font-medium text-bgray-900 dark:text-white">
        {commission}
      </p>
    </td>
    <td className="px-6 py-5 xl:px-0">
      <p className="text-base font-medium text-bgray-900 dark:text-white">
        {partnerpercentagejanata}
      </p>
    </td>
    <td className="px-6 py-5 xl:px-0">
      <p className="text-base font-medium text-bgray-900 dark:text-white">
        {partnerpercentageroulette}
      </p>
    </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {formatDateTo12hr(createdAt)}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {formatDateTo12hr(lastLoginDate)}
        </p>
      </td>

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {status == true?"Active":"DeActive"}
        </p>
      </td>

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <div className="flex justify-center">
          <button styles={{
            "margin": "1px",
            "background-color": "white",
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "cursor": "pointer",
            "border-radius": "4px"
          }} onClick={() => navigateToContacts(UserId, UserName,chips, createdAt, lastLoginDate, status, uniqueId, password,commission,partnerpercentagejanata,partnerpercentageroulette)} >
            <img style={{ "width": "30px", "height": "30px", "margin": "30px" }} src={edit} />
          </button>

          <button styles={{
            "margin": "1px",
            "background-color": "white",
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "cursor": "pointer",
            "border-radius": "4px"
          }} onClick={() => NavigateDelete(UserId)} >
            <img style={{ "width": "30px", "height": "30px", "margin": "30px" }} src={trash} />

          </button>

        

        </div>
      </td>
    </tr>
  );
}

// PlayerInfo.propTypes = {
//   UserId:ProtoTypes.string,
//   UserName:ProtoTypes.string,
//   MobileNo:ProtoTypes.string,
//   GamePlay:ProtoTypes.Number,
//   MainWallet:ProtoTypes.Number,
//   RegistrationDate:ProtoTypes.string,
//   LastLogin:ProtoTypes.string,
//   status:ProtoTypes.string,
//   Status:ProtoTypes.string
// };

export default PlayerInfo;
