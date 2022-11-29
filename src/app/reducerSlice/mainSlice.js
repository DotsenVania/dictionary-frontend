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
    //loading data =====================================
    setAllDataWords: (state, actions) => {
      state.allDataWords = actions.payload; 
    },
    setLoading: (state, actions) => {
          state.loadingAll = actions.payload;
    },
    // Admin action ====================================
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
    //Page navigation ==================================
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
    },
    //Dictionary =======================================
    setAllWordsInDictionary: (state, actions) => {
      state.mainDictionary = state.allDataWords; 
    },
    setCategoryWordsInDictionary: (state, actions) => {
      state.mainDictionary = actions.payload;  
    }
  },
});
export const { setAllDataWords, setLoading, addWord, deleteWord, activePageStatus, setAllWordsInDictionary, setCategoryWordsInDictionary } = mainSlice.actions;

export default mainSlice.reducer;
