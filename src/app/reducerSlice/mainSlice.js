import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allDataWords: [],
  loadingAll: true,
  status: 'idle',
};


export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setAllDataWords: (state, actions) => {
      state.allDataWords = actions.payload; 
    },
    setLoading: (state, actions) => {
          state.loadingAll = actions.payload;
    }
  },
});

export const { setAllDataWords, setLoading } = mainSlice.actions;

export default mainSlice.reducer;
