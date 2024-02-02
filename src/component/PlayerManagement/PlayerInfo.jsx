import ProtoTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

function PlayerInfo({ UserId, UserName, MobileNo, aviatorGamePlay, blackandwhiteGamePlay, MainWallet, WinWallet, BonusWallet, RegistrationDate, LastLogin,  status, profileUrl,email,uniqueId }) {

  const navigate = useNavigate();
  const navigateToContacts = (UserId, UserName, MobileNo, aviatorGamePlay, blackandwhiteGamePlay, MainWallet, WinWallet, BonusWallet, RegistrationDate, LastLogin, status, profileUrl,email,uniqueId) => {
    navigate('/playeredit', { state:{ UserId, UserName, MobileNo, aviatorGamePlay, blackandwhiteGamePlay, MainWallet, WinWallet, BonusWallet, RegistrationDate, LastLogin, status, profileUrl,email,uniqueId } });
  }

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {UserName}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {MobileNo}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {aviatorGamePlay}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {blackandwhiteGamePlay}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
        ₹{MainWallet}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
        ₹{WinWallet}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
        ₹{BonusWallet}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {RegistrationDate}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {LastLogin}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {status}
        </p>
      </td>

      <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-center">
          <button styles={{
            "margin": "1px",
            "background-color": "white",
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "cursor": "pointer",
            "border-radius": "4px"
          }} onClick={() => navigateToContacts( UserId, UserName, MobileNo, aviatorGamePlay, blackandwhiteGamePlay, MainWallet, WinWallet, BonusWallet, RegistrationDate, LastLogin, status, profileUrl ,email,uniqueId)} >
            <img style={{ "width": "15px", "height": "15px", "margin": "10px" }} src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" />
          </button>

          <button styles={{
            "margin": "1px",
            "background-color": "white",
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "cursor": "pointer",
            "border-radius": "4px"
          }} onClick={() => DeleteUser(UserId)} >
            <img style={{ "width": "15px", "height": "15px", "margin": "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSewqWoGi9-fXmd6_SKqNkg6-kmo7VctpXAhgBiKaliSA&s" />

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
