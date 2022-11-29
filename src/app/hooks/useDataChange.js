import { useSelector, useDispatch } from 'react-redux'; 

import { setAllWordsInDictionary, activePageStatus, setCategoryWordsInDictionary } from '../reducerSlice/mainSlice';
export function useDataChange() {
    const {allDataWords, loadingAll} = useSelector(state => state.main);
    const dispatch = useDispatch(); 
    function setAllWords() {
        dispatch(setAllWordsInDictionary())
        dispatch(activePageStatus('dictionaryActive'))
    }
    function setCategoryOfWords(category) {
       const filtered = allDataWords.filter(item => {
        return item.category == category; 
       });
       console.log(filtered)
       dispatch(setCategoryWordsInDictionary(filtered));
       dispatch(activePageStatus('dictionaryActive'));

    }

    

    return {
        setAllWords,
        setCategoryOfWords
    }
}