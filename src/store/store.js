import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import loadingReducer from './loader';
import bannerReducer from './bannerSlice';
import dashboardReducer from './dashboardSlice';
import userReducer from './userSlice';
import agentReducer from './agentSlice';
import adminReducer from './adminSlice';
import noticeReducer from './noticeSlice';
import rolleteReducer from './rolletteSlice';
import rummyReducer from './rummySlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader:loadingReducer,
    banner:bannerReducer,
    dashboard:dashboardReducer,
    user:userReducer,
    agent:agentReducer,
    admin:adminReducer,
    notice:noticeReducer,
    rollette:rolleteReducer,
    rummy:rummyReducer,
  },
})

export default store;