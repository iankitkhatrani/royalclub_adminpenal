import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import SweetAlert from 'sweetalert2';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

const initialState = {
  loadingStatus: STATUS.IDLE,
  bannerData: [],
  totalBanner:0,
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const BannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBannerData(state, { payload }) {
      state.bannerData = payload.result
      state.totalBanner = payload.total
    },
    updatebannerData(state, { payload }) {
      const objIndex = state.bannerData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.bannerData[objIndex].status=payload.result.status
        state.bannerData[objIndex].title=payload.result.title
      }
    },
    sliceBanner(state,{payload}){ 
      const objIndex = state.bannerData.findIndex((obj) => obj._id === payload._id);
      if(objIndex>=0){
        state.bannerData.splice(objIndex,1)
      }
      SweetAlert.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    },
    pushBanner (state,{payload}){
      state.bannerData.push(payload)
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

export const { setBannerData, updatebannerData,pushBanner, isOpenModal, 
  ModalToggle,setFaqsSpecializationData,isOpenStatusModal,statusToggle,sliceBanner } = BannerSlice.actions;

export default BannerSlice.reducer;

export function getBanner(limit, offset, status, keyword) {
  return async function getBannerThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getBanner(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setBannerData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addBanner(payload) {
  return async function addBannerThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addBanner(payload).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(ModalToggle())
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
export function deleteBanner(payload) {
  return async function deleteBannerThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteBanner(payload.id).then(
        (response) => {
          dispatch(sliceBanner(response.data))
          dispatch(setLoading(false))
          successHandler('Delete Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function statusUpdateBanner(payload) {
  return async function statusUpdateBannerThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateBanner(payload.id,payload.status,payload.title).then(
        (response) => {
          response.data.result=payload
          dispatch(updatebannerData(response.data))
          dispatch(statusToggle())
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

