import React, { useState, useContext, useEffect } from 'react';
import ProtoTypes from "prop-types";
import CustomerInfo from "./PlayerInfo";
import users from "../../data/user";
import offerContext from '../../context/offerContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function PlayerTab({  }) {
  //-------------------------------------------------------------------------------------------------------
  const [active, setActive] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const Dropdown = (item) => {
    setPageSize(item)
    setActive(!active)
  }
  //------------------------------------------------------------------------------------------------------------


  let [userData, setUserData] = useState([]);


  const context = useContext(offerContext)
  const { SuperAdminTranscationData } = context

  const location = useLocation();
  //console.log("location ", location.state)
  const adminInfo = location.state;

  console.log("adminInfo ::::::::::::::::::::::::::::::::",adminInfo)

  useEffect(() => {
    const submitdata = async () => {
      
        setUserData(await SuperAdminTranscationData(undefined,cookies.get('logintype')))
      
      
    }
    submitdata()
  }, []);

  //--------------------------- Paggeation and No Of Pages ------------------------------------
  // Filter the user data based on date range and search term
  const filteredUsers = userData.filter((user) => {
    console.log("dddd")
    const registrationDate = new Date(user.DateandTime);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (
      (!from || registrationDate >= from) &&
      (!to || registrationDate <= to) &&
      (searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the user data for the current page
  const usersOnCurrentPage = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetDate = () => {
    setFromDate("")
    setToDate("")
  }


  
  const [backgroundColor, setBackgroundColor] = useState('');

  const generatePDF = async () => {
    //style={{"background-color": "lightgray"}}
    await setBackgroundColor("#1D1E24"); // Change to the desired color

    const input = document.getElementById("tableId");

    console.log("input ::::::::::::::: ", input)
    html2canvas(input)
      .then(async (canvas) => {
        console.log("canvas ", canvas)
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.setFillColor(204, 204, 204, 0);

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${new Date() + 'UserPage'}.pdf`);

        await setBackgroundColor('');
      })
      .catch((error) => console.log(error));


  };


  //-----------------------------------------------------------------------------------------------


  return (
    <>
      <div className="flex h-[56px] w-full space-x-4">
        <div className="hidden h-full rounded-lg border border-transparent bg-bgray-100 px-[18px] focus-within:border-success-300 dark:bg-darkblack-500 sm:block sm:w-70 lg:w-88">
          <div className="flex h-full w-full items-center space-x-[15px]">
            <span>
              <svg
                className="stroke-bgray-900 dark:stroke-white"
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9.80204"
                  cy="10.6761"
                  r="8.98856"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.0537 17.3945L19.5777 20.9094"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <label htmlFor="listSearch" className="w-full">
              <input
                type="text"
                id="listSearch"
                placeholder="Search by name, email, or others..."
                className="search-input w-full border-none bg-bgray-100 px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-medium placeholder:text-bgray-500 focus:outline-none focus:ring-0 dark:bg-darkblack-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="filter-content w-full">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          <input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ marginLeft: "1rem" }}
          />
          <button aria-label="none"
            className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm" onClick={resetDate}>Reset</button>


            <button aria-label="none"
                className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="tableId"
                  filename={new Date() + 'UserPage'}
                  sheet="tablexls"
                  buttonText="Download as XLS" />
              </button>

              <button aria-label="none"
                className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm" onClick={generatePDF}>

                Download as PDF
              </button> 
        </div>
      </div>
      <div className="table-content w-full overflow-x-auto">
        <table style={{ "backgroundColor": backgroundColor }} id="tableId" className="w-full">
          <tbody>
            <tr className="border-b border-bgray-300 dark:border-darkblack-400">

              
              <td className="w-[165px] px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                   Date and Time 
                  </span>
                </div>
              </td>

              <td className="w-[165px] px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Amount
                  </span>
                </div>
              </td>

             
              <td className="w-[195px] px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Txn Type
                  </span>
                </div>
              </td>
             
             
              <td className="w-[165px] px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    From | To 
                    Name
                  </span>
                </div>
              </td>
             
            </tr>
            {filteredUsers?.map((user, index) =>
              pageSize
                ? index + 1 <= pageSize && (
                  <CustomerInfo
                    key={user._id}
                    UserId={user._id}
                    DateandTime={user.createdAt}
                    trnxAmount={user.trnxAmount}
                  
                    trnxTypeTxt={user.trnxTypeTxt}
                  
                    id = {user.id}
                    type = {user.type}
                    trackname = {user.name}
                    userid={user.adminId}
                     />
                )
                : index < 3 && (
                  <CustomerInfo
                    key={user._id}
                   
                    UserId={user._id}
                    DateandTime={user.createdAt}
                    trnxAmount={user.trnxAmount}
                    
                    trnxTypeTxt={user.trnxTypeTxt}
                    
                    id = {user.id}
                    type = {user.type}
                    trackname = {user.name}
                    userid={user.adminId}
                  />
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-content w-full">
        <div className="flex w-full items-center justify-center lg:justify-between">
          <div className="hidden items-center space-x-4 lg:flex">
            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
              Show result:
            </span>
            <div className="relative">
              <button
                aria-label="none"
                onClick={() => setActive(!active)}
                type="button"
                className="flex items-center space-x-6 rounded-lg border border-bgray-300 px-2.5 py-[14px] dark:border-darkblack-400"
              >
                <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">
                {pageSize}
                </span>
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                      stroke="#A0AEC0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id="result-filter"
                style={{ display: active ? "block" : "none" }}
                className="absolute right-0 top-14 z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <ul>
                  {[5, 10, 20, 25, 50].map((item) => (
                    <li
                      key={item}
                      onClick={() => Dropdown(item)}
                      className="text-bgray-90 cursor-pointer px-5 py-2 text-sm font-medium hover:bg-bgray-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5 sm:space-x-[35px]">
            <button aria-label="none" type="button" onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-sm font-semibold text-bgray-600 dark:text-bgray-50"
            >
              Previous
              <span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
                    stroke="#A0AEC0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <button aria-label="none" type="button" onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-sm font-semibold text-bgray-600 dark:text-bgray-50"
            >
              Next
              <span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
                    stroke="#A0AEC0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

PlayerTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default PlayerTab;
