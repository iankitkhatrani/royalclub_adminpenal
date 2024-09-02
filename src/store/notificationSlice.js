import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';
import { service } from '../shared/_services/api_service';

const initialState = {
  success: false,
}

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateSuccess(state, { payload }) {
      state.success=payload
    },
  }
})

export const { updateSuccess } = notificationSlice.actions;

export default notificationSlice.reducer;

/*LOGIN GET OTP*/
export function sendNotification(payload) {
  return async function sendNotificationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.sendNotification(payload).then(
        (response) => {
          
          
          dispatch(setLoading(false))
          successHandler('Send Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}



