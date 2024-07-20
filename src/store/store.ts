import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import msgReducer from './msgSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    msg: msgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;