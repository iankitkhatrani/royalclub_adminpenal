import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';


const initialState = {
  agentData: [],
  totalAgent: 0,
  agentTranscationData: [],
  totalAgentTranscation:0,
  staffDetails:null,
}

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setAgentData(state, { payload }) {
      state.agentData = payload.result
      state.totalAgent = payload.total
    },
    updateStateData(state, { payload }) {
      const objIndex = state.agentData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.agentData[objIndex].status=payload.status
      }
    },
    pushData(state, { payload }) {
      if(payload.status){
        payload.numberOfuser=0
        state.agentData.unshift(payload)
        state.totalAgent = state.totalAgent+1
      }
    },
    updateAgentDetails(state, { payload }) {
      const objIndex = state.agentData.findIndex((obj) => obj._id === payload._id);
      if(objIndex>=0){
        payload.numberOfuser=state.agentData[objIndex].numberOfuser
        state.agentData[objIndex]=payload
      }
    },
    agentDataDelete(state,{payload}){
      const objIndex = state.agentData.findIndex((obj) => obj._id === payload._id);
      if(objIndex>=0){
        state.agentData.splice(objIndex,1)
        state.totalAgent = state.totalAgent-1
      }
    },
    setAgentTranscationData(state, { payload }) {
      state.agentTranscationData = payload.result
      state.totalAgentTranscation = payload.total
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

export const { setAgentData,isOpenModal,
  ModalToggle,agentDataDelete,
  isOpenStatusModal,pushData,setAgentTranscationData,
  statusToggle,updateStateData,updateAgentDetails,setStaffIdData } = agentSlice.actions;

export default agentSlice.reducer;

/*LOGIN GET OTP*/
export function getAgent(limit, offset, status, keyword) {
  return async function getAgentThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getAgent(limit, offset, status, keyword).then(
        (response) => {
          
          if (response.data) {
            dispatch(setAgentData(response.data));
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
export function getStaffById(id) {
  return async function getStaffByIdThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getStaffById(id).then(
        (response) => {
          if (response.data) {
            dispatch(setStaffIdData(response.data));
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
export function addAgent(body) {
  return async function addAgentThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addAgent(body).then(
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
export function updateAgent(body) {
  return async function updateAgentThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.updateAgent(body).then(
        (response) => {
          
          
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(updateAgentDetails(response.data))
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
export function deleteAgent(payload) {
  return async function deleteAgentThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteAgent(payload.id).then(
        (response) => {
          
          
          dispatch(agentDataDelete(response.data))
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
export function getAgentTranscationData(limit, offset, keyword,fromDate,toDate) {
  return async function getAgentTranscationDataThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getAgentTranscationData(limit, offset, keyword,fromDate,toDate).then(
        (response) => {
          
          if (response.data) {
            dispatch(setAgentTranscationData(response.data));
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