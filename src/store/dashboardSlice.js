import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler } from '../shared/_helper/responseHelper';
import moment from 'moment';
// import { errorHandler, successHandler } from '../shared/_helper/responseHelper';


const initialState = {
  error: "",
  pageOneData: {},
  pageDesc: '',
  pageTitle: '',
  dashboardData: [],
  latestUser: [],
  latestAgent: [],
  transcationData: [],
  excelData: [],
  totatTranscation: 0,
  ConfigdaywiseWinloss: 0,
  toDayGamePay: 0,
  todayDeposit: 0,
  todayProfit: 0,
  todayWithdraw: 0,
  totalAdmin: 0,
  totalAgent: 0,
  totalDeposit: 0,
  totalGamePay: 0,
  totalPercentage: 0,
  totalProfit: 0,
  totalRoulette: 0,
  totalUser: 0,
  totalWithdraw: 0,
  totaljanta: 0,
  totalludo: 0,
  totalrummy: 0,
  totalteenpatti: 0,
  adminDashData: {}
}

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData(state, { payload }) {
      // state.dashboardData = payload
      state.ConfigdaywiseWinloss = payload.ConfigdaywiseWinloss || 0
      state.toDayGamePay = payload.toDayGamePay || 0
      state.todayDeposit = payload.todayDeposit || 0
      state.todayProfit = payload.todayProfit || 0
      state.todayWithdraw = payload.todayWithdraw || 0
      state.totalAdmin = payload.totalAdmin || 0
      state.totalAgent = payload.totalAgent || 0
      state.totalDeposit = payload.totalDeposit || 0
      state.totalGamePay = payload.totalGamePay || 0
      state.totalPercentage = payload.totalPercentage || 0
      state.totalProfit = payload.totalProfit || 0
      state.totalRoulette = payload.totalRoulette || 0
      state.totalUser = payload.totalUser || 0
      state.totalWithdraw = payload.totalWithdraw || 0
      state.totaljanta = payload.totaljanta || 0
      state.totalludo = payload.totalludo || 0
      state.totalrummy = payload.totalrummy || 0
      state.totalteenpatti = payload.totalteenpatti || 0
    },
    setTranscationData(state, { payload }) {
      state.transcationData = payload.result
      state.totatTranscation = payload.total
      payload.result.forEach(element => {
        let data = {
          'Name': element.name,
          'Date and Time': moment(element.createdAt).format('YYYY-MM-DD hh:mm A'),
          'Amount': element.trnxAmount,
          'Txn Type': element.trnxTypeTxt,
          'A/c Type': element.type,
        }
        state.excelData.push(data)
      });
    },
    setAdminDashboardData(state, { payload }) {
      state.adminDashData = payload
    },
    setLatatestUserData(state, { payload }) {
      state.latestUser = payload.result
    },
    setLatatestAgentData(state, { payload }) {
      state.latestAgent = payload.result
    },
  }
})


export const { setDashboardData, setAdminDashboardData, setLatatestUserData, setLatatestAgentData, setTranscationData } = dashboardSlice.actions;
export default dashboardSlice.reducer;


export function getDashboard() {
  return async function getDashboardThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.getDashboardData().then(
        (response) => {
          

          if (response.data) {
            dispatch(setLoading(false))
            dispatch(setDashboardData(response.data))
          }
        }, (error) => {
          dispatch(setLoading(false))
        }
      );
    } catch (err) {

    }
  }
}
export function getAdminDashboard() {
  return async function getAdminDashboardThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.getAdminDashboardData().then(
        (response) => {
          

          if (response.data) {
            dispatch(setLoading(false))
            dispatch(setAdminDashboardData(response.data))
          }
        }, (error) => {
          dispatch(setLoading(false))
        }
      );
    } catch (err) {

    }
  }
}
export function getLatatestUser() {
  return async function getLatatestUserThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.getLatatestUserData().then(
        (response) => {
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(setLatatestUserData(response.data))
          }
        }, (error) => {
          dispatch(setLoading(false))
        }
      );
    } catch (err) {

    }
  }
}
export function getLatatestAgent() {
  return async function getLatatestAgentThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.getLatatestAgentData().then(
        (response) => {
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(setLatatestAgentData(response.data))
          }
        }, (error) => {
          dispatch(setLoading(false))
        }
      );
    } catch (err) {

    }
  }
}
export function getSuperAdminTranscationData(limit, offset, keyword, fromDate, toDate) {
  return async function getSuperAdminTranscationDataThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getSuperAdminTranscationData(limit, offset, keyword, fromDate, toDate).then(
        (response) => {
          if (response.data) {
            dispatch(setTranscationData(response.data));
            dispatch(setLoading(false))
          }
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}