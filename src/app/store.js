import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './reducerSlice/mainSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
});
