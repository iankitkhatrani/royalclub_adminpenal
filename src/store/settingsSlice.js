import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';
import { service } from '../shared/_services/api_service';

const initialState = {
  success: false,
}

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateSuccess(state, { payload }) {
      state.success=payload
    },
  }
})

export const { updateSuccess } = settingSlice.actions;

export default settingSlice.reducer;

/*LOGIN GET OTP*/
export function changePassword(payload) {
  return async function changePasswordThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.changePassword(payload).then(
        (response) => {
          
          
          dispatch(setLoading(false))
          successHandler('Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}



