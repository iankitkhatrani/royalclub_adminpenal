import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from './loader';
import { errorHandler } from '../shared/_helper/responseHelper';
import { service } from '../shared/_services/api_service';

const initialState = {
  rummyHistoryData: [],
  totalRummyHistory: 0,
  gameTracksData: []
}

export const rummySlice = createSlice({
  name: "rummy",
  initialState,
  reducers: {
    setRummyHistory(state, { payload }) {
      state.rummyHistoryData = payload.result
      state.totalRummyHistory = payload.total
      if (payload.result.length > 0) {
        payload.result[0]?.gameTracks.forEach(element => {
          element.gamePlayType = payload.result[0]?.gamePlayType
          element.date = payload.result[0]?.date
          element.tableId = payload.result[0]?.tableId
          element.gameId = payload.result[0]?.gameId
          if (element.gCard.pure?.length > 0) {
            element.sowCard = element.gCard.pure.flat()
          } else if (element.gCard.impure?.length > 0) {
            element.sowCard = element.gCard.impure.flat()
          } else if (element.gCard.set?.length > 0) {
            element.sowCard = element.gCard.set.flat()
          } else if (element.gCard.dwd?.length > 0) {
            element.sowCard = element.gCard.dwd.flat()
          }
        });
        state.gameTracksData = payload.result[0]?.gameTracks
      } else {
        state.gameTracksData = []
      }
    },
  }
})

export const { setRummyHistory } = rummySlice.actions;

export default rummySlice.reducer;

/*LOGIN GET OTP*/
export function getRummyHistory(limit, offset, keyword, fromDate, toDate) {
  return async function getRummyHistoryThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getRummyHistory(limit, offset, keyword, fromDate, toDate).then(
        (response) => {
          
          dispatch(setRummyHistory(response.data))
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



