import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';


const initialState = {
  noticeData: [],
  isOpenModal: false,
  isStatusOpenModal: false,
  totalNotice: 0,
}

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNoticeData(state, { payload }) {
      state.noticeData = payload.result
      state.totalNotice = payload.total
    },
    updateNoticeData(state, { payload }) {
      const objIndex = state.noticeData.findIndex((obj) => obj._id === payload._id);
      if (objIndex >= 0) {
        state.noticeData[objIndex] = payload
      }
    },
    pushNoticeData(state, { payload }) {
      state.noticeData.push(payload)
    },
    removeNoticeData(state, { payload }) {
      const objIndex = state.noticeData.findIndex((obj) => obj._id === payload._id);
      if (objIndex >= 0) {
        state.noticeData.splice(objIndex,1)
      }
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

export const { setNoticeData, updateNoticeData, pushNoticeData,removeNoticeData, isOpenModal, ModalToggle,isOpenStatusModal,
  statusToggle } = noticeSlice.actions;

export default noticeSlice.reducer;

export function getNotice(limit, offset, status, keyword) {
  return async function getNoticeThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getNotice(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setNoticeData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addNotice(payload) {
  return async function addNoticeThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addNotice(payload).then(
        (response) => {
          
          
          dispatch(setLoading(false))
          dispatch(pushNoticeData(response.data))
          dispatch(isOpenModal(false))
          successHandler('Added Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function updateNotice(payload) {
  return async function updateNoticeThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateNotice(payload).then(
        (response) => {
          
          
          dispatch(updateNoticeData(response.data))
          dispatch(setLoading(false))
          dispatch(ModalToggle())
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
export function statusUpdateNotice(payload) {
  return async function statusUpdateNoticeThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateNotice(payload.id, payload.status).then(
        (response) => {
          
          dispatch(updateNoticeData(response.data))
          dispatch(isOpenStatusModal(false))
          dispatch(setLoading(false))
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
export function deleteNotice(payload) {
  return async function deleteNoticeThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteNotice(payload.id).then(
        (response) => {
          
          
          dispatch(removeNoticeData(response.data))
          dispatch(setLoading(false))
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
