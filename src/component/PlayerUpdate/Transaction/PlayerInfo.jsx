import ProtoTypes from "prop-types";

function PlayerInfo({ name,createdAt,trnxAmount,oppChips,totalBucket,trnxTypeTxt,trnxType,gameType,authorisedname,authorisedtype}) {
  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {name}
          </p>
        </div>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {createdAt}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {trnxAmount}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {oppChips}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{totalBucket}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {trnxTypeTxt}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {trnxType}
        </p>
      </td>

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {gameType}
        </p>
      </td>

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {authorisedname}/{ authorisedtype}
        </p>
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
//   Block:ProtoTypes.string,
//   Status:ProtoTypes.string
// };

export default PlayerInfo;
