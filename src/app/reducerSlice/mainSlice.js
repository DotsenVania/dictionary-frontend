import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allDataWords: [],
  loadingAll: true,
  admin: false,
  mainDictionary : []
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
    },
    adminStatus: (state, actions) => {
      state.admin = !state.admin
    }
  },
});

export const { setAllDataWords, setLoading, addWord, deleteWord, adminStatus } = mainSlice.actions;

export default mainSlice.reducer;
