import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from './loader';
import { errorHandler } from '../shared/_helper/responseHelper';
import { service } from '../shared/_services/api_service';

const initialState = {
  rolletteHistoryData: [],
  totalRolletteHistory: 0,
  gameTracksData: []
}

export const rolleteSlice = createSlice({
  name: "rollete",
  initialState,
  reducers: {
    setRolleteHistory(state, { payload }) {
      state.rolletteHistoryData = payload.result
      state.totalRolletteHistory = payload.total
      if (payload.result.length > 0) {
        payload.result[0]?.gameTracks.forEach(element => {
          element.gamePlayType = payload.result[0]?.gamePlayType
          element.date = payload.result[0]?.date
          element.tableId = payload.result[0]?.tableId
          element.gameId = payload.result[0]?.gameId
          if (element.gCard.pure?.length > 0) {

          } else if (element.gCard.impure?.length > 0) {

          }else if (element.gCard.set?.length > 0) {

          }else if (element.gCard.dwd?.length > 0) {
              element.sowCard=element.gCard.dwd.flat()
          }
        });
        state.gameTracksData = payload.result[0]?.gameTracks
      } else {
        state.gameTracksData = []
      }
    },
  }
})

export const { setRolleteHistory } = rolleteSlice.actions;

export default rolleteSlice.reducer;

/*LOGIN GET OTP*/
export function getRolleteHistory(limit, offset, keyword, fromDate, toDate) {
  return async function getRolleteHistoryThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getRolleteHistory(limit, offset, keyword, fromDate, toDate).then(
        (response) => {
          
          dispatch(setRolleteHistory(response.data))
          dispatch(setLoading(false))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}



