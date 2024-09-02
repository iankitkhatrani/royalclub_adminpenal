import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';


const initialState = {
  userData: [],
  totalUser: 0,
  userTranscationData: [],
  totalUserTranscation: 0,
  isMoneyOpenModal: false,
  isOpenModal: false,
  isStatusOpenModal: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      state.userData = payload.result
      state.totalUser = payload.total
    },
    updateStateData(state, { payload }) {
      const objIndex = state.userData.findIndex((obj) => obj._id === payload._id);
      if (objIndex >= 0) {
        state.userData[objIndex].status = payload.status
      }
    },
    pushData(state, { payload }) {
      state.userData.unshift(payload)
    },
    updateStaffDetails(state, { payload }) {
      const objIndex = state.userData.findIndex((obj) => obj.id === payload.accountId);
      if (objIndex >= 0) {
        state.userData[objIndex].organization[0] = payload
      }
    },
    creditedAmount(state, { payload }) {
      const objIndex = state.userData.findIndex((obj) => obj._id === payload.id);
      if (objIndex >= 0) {
        state.userData[objIndex].chips = state.userData[objIndex].chips + Number(payload.money)
      }
    },
    setUserTranscationData(state, { payload }) {
      state.userTranscationData = payload.result
      state.totalUserTranscation = payload.total
    },
    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    ModalToggle(state, { payload }) {
      state.isOpenModal = !state.isOpenModal
    },
    isOpenStatusModal(state, { payload }) {
      state.isStatusOpenModal = payload
    },
    statusToggle(state, { payload }) {
      state.isStatusOpenModal = !state.isStatusOpenModal
    },
    isOpenMoneyModal(state, { payload }) {
      state.isMoneyOpenModal = payload
    },
    moneyToggle(state, { payload }) {
      state.isMoneyOpenModal = !state.isMoneyOpenModal
    }
  }
})

export const { setUserData, isOpenModal,
  ModalToggle, creditedAmount, setUserTranscationData,
  isOpenStatusModal, pushData, isOpenMoneyModal, moneyToggle,
  statusToggle, updateStateData, updateStaffDetails } = userSlice.actions;

export default userSlice.reducer;

/*LOGIN GET OTP*/
export function getUser(limit, offset, status, keyword) {
  return async function getUserThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getUsers(limit, offset, status, keyword).then(
        (response) => {
          
          if (response.data) {
            dispatch(setUserData(response.data));
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
export function addUser(body) {
  return async function addUserThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addUsers(body).then(
        (response) => {
          

          if (response.data) {
            dispatch(setLoading(false))
            dispatch(isOpenModal(false))
            dispatch(pushData(response.data.result))
            successHandler('Added Successfully')
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
export function updateStaff(body) {
  return async function updateStaffThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.updateStaff(body.id, body).then(
        (response) => {
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(updateStaffDetails(response.data))
            dispatch(isOpenModal(false))
            successHandler('Update Successfully')
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
export function statusUpdateUser(payload) {
  return async function statusUpdateUserThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateUsers(payload.id, payload.status).then(
        (response) => {
          
          response.data.status = payload.status
          dispatch(updateStateData(response.data))
          dispatch(setLoading(false))
          dispatch(statusToggle())
          successHandler('updateed Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function addMoney(payload) {
  return async function addMoneyThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.addMoney(payload.id, payload).then(
        (response) => {
          
          payload.id = response.data.id
          dispatch(creditedAmount(payload))
          dispatch(setLoading(false))
          dispatch(isOpenMoneyModal(false))
          successHandler('Successfully Credited')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function getUserTranscationData(limit, offset, keyword, fromDate, toDate) {
  return async function getUserTranscationDataThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getUserTranscationData(limit, offset, keyword, fromDate, toDate).then(
        (response) => {
          
          if (response.data) {
            dispatch(setUserTranscationData(response.data));
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