import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allDataWords: [],
  loadingAll: true,
  activePage: {
    admin: false,
    user: false,
    categories: true,
    dictionary: false
  },
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
    activePageStatus: (state, actions) => {
      switch (actions.payload) {
        case 'adminAcitve':
          state.activePage = {
            admin: true,
            user: true,
            categories: false,
            dictionary: false
          }
          break;
          case 'categoriesActive':
          state.activePage = {
            admin: false,
            user: false,
            categories: true,
            dictionary: false
          }
          break;
          case 'dictionaryActive':
          state.activePage = {
            admin: false,
            user: false,
            categories: false,
            dictionary: true
          }
          break;
      
        default:
          state.activePage = {
            admin: false,
            user: false,
            categories: true,
            dictionary: false
          }
          break;
      }
    }
  },
});

export const { setAllDataWords, setLoading, addWord, deleteWord, activePageStatus } = mainSlice.actions;

export default mainSlice.reducer;
