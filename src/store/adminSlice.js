import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';


const initialState = {
  adminData: [],
  totalAdmin: 0,
  adminTranscationData: [],
  totalAdminTranscation:0,
  staffDetails: null,
  isOpenModal: false,
  isStatusOpenModal: false,
}

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminData(state, { payload }) {
      state.adminData = payload.result
      state.totalAdmin = payload.total
    },
    updateStateData(state, { payload }) {
      const objIndex = state.adminData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.adminData[objIndex].status = payload.status
      }
    },
    pushData(state, { payload }) {
      if (payload.status) {
        payload.numberOfuser = 0
        payload.numberOfagent = 0
        state.adminData.unshift(payload)
        state.totalAdmin = state.totalAdmin + 1
      }
    },
    updateAdminDetails(state, { payload }) {
      const objIndex = state.adminData.findIndex((obj) => obj._id === payload._id);
      if (objIndex >= 0) {
        payload.numberOfuser = state.adminData[objIndex].numberOfuser
        state.adminData[objIndex] = payload
      }
    },
    adminDataDelete(state, { payload }) {
      const objIndex = state.adminData.findIndex((obj) => obj._id === payload._id);
      if (objIndex >= 0) {
        state.adminData.splice(objIndex, 1)
        state.totalAdmin = state.totalAdmin - 1
      }
    },
    setAdminTranscationData(state, { payload }) {
      state.adminTranscationData = payload.result
      state.totalAdminTranscation = payload.total
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
    }
  }
})

export const { setAdminData, isOpenModal,
  ModalToggle, adminDataDelete,
  isOpenStatusModal, pushData,setAdminTranscationData,
  statusToggle, updateStateData, updateAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;

/*LOGIN GET OTP*/
export function getAdmin(limit, offset, status, keyword) {
  return async function getAdminThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getAdmin(limit, offset, status, keyword).then(
        (response) => {
          
          if (response.data) {
            dispatch(setAdminData(response.data));
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
export function addAdmin(body) {
  return async function addAdminThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addAdmin(body).then(
        (response) => {
          
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(isOpenModal(false))
            dispatch(pushData(response.data))
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
export function updateAdmin(body) {
  return async function updateAdminThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.updateAdmin(body).then(
        (response) => {
          

          if (response.data) {
            dispatch(setLoading(false))
            dispatch(updateAdminDetails(response.data))
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
export function deleteAdmin(payload) {
  return async function deleteAdminThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteAdmin(payload.id).then(
        (response) => {
          

          dispatch(adminDataDelete(response.data))
          dispatch(setLoading(false))
          dispatch(statusToggle())
          successHandler('Deleted Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function getAdminTranscationData(limit, offset, keyword,fromDate,toDate) {
  return async function getAdminTranscationDataThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getAdminTranscationData(limit, offset, keyword,fromDate,toDate).then(
        (response) => {
          
          if (response.data) {
            dispatch(setAdminTranscationData(response.data));
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
