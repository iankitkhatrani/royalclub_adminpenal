import axios from "axios";
import { authHeader } from "../_helper/auth-header";



// const rootUrl = 'http://192.168.199.247:5959/admin/'
const rootUrl = 'http://royalsclub.in:5959/admin/'

const dashboardURL = rootUrl + 'dashboard'
const bannerURL = rootUrl + 'banner'
const userURL = rootUrl + 'user'
const agentURL = rootUrl + 'agent'
const adminURL = rootUrl + 'admin'
const noticeUrl = rootUrl + 'noticetext';
const notificationUrl = rootUrl + 'notification';
const usertransctionURL = rootUrl + 'usertransction';
const userhistoryURL = rootUrl + 'userhistory';

/*********** Auth ***********/
async function login(loginData) {
  return await axios.post(rootUrl + '/login', loginData);
}
/********* End Auth *********/
/******** DASHBOARD *********/
async function getDashboardData() {
  return await axios.get(dashboardURL, {
    headers: await authHeader(),
  });
}
async function getLatatestUserData() {
  return await axios.get(dashboardURL + '/latatestUser', {
    headers: await authHeader(),
  });
}
async function getLatatestAgentData() {
  return await axios.get(dashboardURL + '/latatestAgent', {
    headers: await authHeader(),
  });
}
async function getAdminDashboardData() {
  return await axios.get(adminURL + '/dashboardDataAdmin', {
    headers: await authHeader(),
  });
}
/******** END DASHBOARD *********/
/******** BANNER ********/
async function getBanner(limit, offset, status, keyword) {
  return await axios.get(bannerURL + '/bannerList?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addBanner(data) {
  return await axios.post(bannerURL + '/BannerUpload', data, {
    headers: await authHeader("FormData"),
  });
}
async function deleteBanner(id) {
  return await axios.delete(bannerURL + '/bannerdelete/' + id, {
    headers: await authHeader(),
  });
}
async function statusUpdateBanner(id, status, title) {
  return await axios.put(bannerURL + '/bannerStatus/' + id, { status, title }, {
    headers: await authHeader(),
  });
}
/******** END BANNER ********/
/******** USER ********/
async function getUsers(limit, offset, status, keyword) {
  return await axios.get(userURL + '/userList?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addUsers(data) {
  return axios.post(userURL + '/addUser/', data, {
    headers: await authHeader(),
  });
}
async function addMoney(id, data) {
  delete data.id
  return axios.put(userURL + '/addMoney/' + id, data, {
    headers: await authHeader(),
  });
}
async function statusUpdateUsers(id, status) {
  return axios.put(userURL + '/userStatus/' + id, { status }, {
    headers: await authHeader(),
  });
}
/******** END USER ********/
/******** AGENT *********/
async function getAgent(limit, offset, status, keyword) {
  return axios.get(agentURL + '/agentList?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function updateAgent(data) {
  return axios.put(agentURL + '/agentUpdate', data, {
    headers: await authHeader(),
  });
}
async function deleteAgent(id) {
  return axios.delete(agentURL + '/deleteAgent/' + id, {
    headers: await authHeader(),
  });
}
async function addAgent(data) {
  return axios.post(agentURL + '/addAgent', data, {
    headers: await authHeader(),
  });
}
/******** END AGENT *********/
/******** ADMIN *********/
async function getAdmin(limit, offset, status, keyword) {
  return axios.get(adminURL + '/adminList?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addAdmin(data) {
  return axios.post(adminURL + '/addAdmin', data, {
    headers: await authHeader(),
  });
}
async function updateAdmin(data) {
  return axios.put(adminURL + '/adminUpdate', data, {
    headers: await authHeader(),
  });
}
async function deleteAdmin(id) {
  return axios.delete(adminURL + '/deleteAdmin/' + id, {
    headers: await authHeader(),
  });
}
/******** END ADMIN *********/

/******** NOTICE *********/
async function getNotice(limit, offset, status, keyword) {
  return await axios.get(noticeUrl + '/noticeTextList?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addNotice(payload) {
  return await axios.post(noticeUrl + '/addNoticeText', payload, {
    headers: await authHeader(),
  });
}
async function updateNotice(payload) {
  return await axios.put(noticeUrl + '/updateNoticeText', payload, {
    headers: await authHeader(),
  });
}
async function statusUpdateNotice(id, status) {
  return axios.put(noticeUrl + '/status/' + id, { status }, {
    headers: await authHeader(),
  });
}
async function deleteNotice(id) {
  return axios.delete(noticeUrl + '/noticedelete/' + id, {
    headers: await authHeader(),
  });
}
/******** END NOTICE *********/
/******** NOTIFICATION ********/
async function sendNotification(payload) {
  return await axios.post(notificationUrl + '/sendNotification', payload, {
    headers: await authHeader(),
  });
}
/******** END NOTIFICATION ********/


/******** ADMIN TRANSCATION ********/
async function getAdminTranscationData(limit, offset, keyword, fromDate, toDate) {
  return await axios.get(usertransctionURL + '/adminTranscationData?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword
    + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader(),
  });
}
/******** END ADMIN TRANSCATION ********/
/******** AGENT TRANSCATION ********/
async function getAgentTranscationData(limit, offset, keyword, fromDate, toDate) {
  return await axios.get(usertransctionURL + '/agentTranscationData?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword
    + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader(),
  });
}
/******** END AGENT TRANSCATION ********/
/******** USER TRANSCATION ********/
async function getSuperAdminTranscationData(limit, offset, keyword, fromDate, toDate) {
  return await axios.get(usertransctionURL + '/superAdminTranscationData?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword
    + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader(),
  });
}
/******** END USER TRANSCATION ********/
/******** USER TRANSCATION ********/
async function getUserTranscationData(limit, offset, keyword, fromDate, toDate) {
  return await axios.get(userhistoryURL + '/userTransactionData?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword
    + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader(),
  });
}
/******** END USER TRANSCATION ********/
/******** RUMMY HISTORY ********/
async function getRummyHistory(limit, offset, keyword, fromDate, toDate) {
  return await axios.get(usertransctionURL + '/table-history?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword
    + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader(),
  });
}
/******** END RUMMY HISTORY ********/
/******** ROLLETTE HISTORY ********/
async function getRolleteHistory(limit, offset, keyword, fromDate, toDate) {
  return await axios.get(usertransctionURL + '/table-history?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword
    + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader(),
  });
}
/******** END ROLLETTE HISTORY ********/
export const service = {
  login,
  getDashboardData,
  getAdminDashboardData,
  getLatatestUserData,
  getLatatestAgentData,

  //User
  getUsers,
  addUsers,
  addMoney,
  statusUpdateUsers,

  //agent
  getAgent,
  addAgent,
  updateAgent,
  deleteAgent,

  //Admin
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,

  //Blogs
  getNotice,
  addNotice,
  updateNotice,
  statusUpdateNotice,
  deleteNotice,

  // notification
  sendNotification,

  getAdminTranscationData,
  getAgentTranscationData,
  getSuperAdminTranscationData,
  getUserTranscationData,

  getRolleteHistory,
  getRummyHistory,

  //Banner
  getBanner,
  addBanner,
  deleteBanner,
  statusUpdateBanner,
}
