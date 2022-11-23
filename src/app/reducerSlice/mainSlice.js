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
    },
    addWord: (state, actions) => {
      state.allDataWords.push(actions.payload);
    },
    deleteWord: (state, actions) => {
      state.allDataWords = state.allDataWords.filter(item => {
        console.log(item.id)
        if(item.id !== actions.payload.id) {
          return item; 
        }
      })
    }
  },
});

export const { setAllDataWords, setLoading, addWord, deleteWord } = mainSlice.actions;

export default mainSlice.reducer;
