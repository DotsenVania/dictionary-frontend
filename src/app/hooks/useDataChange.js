import { useSelector, useDispatch } from 'react-redux'; 

import { setAllWordsInDictionary, activePageStatus, setCategoryWordsInDictionary, setLoading } from '../reducerSlice/mainSlice';
export function useDataChange() {
    const {allDataWords, loadingAll} = useSelector(state => state.main);
    const dispatch = useDispatch(); 


    const data = JSON.stringify({action: 'setData'})
    async function postRequestAllWords () {
        dispatch(setLoading(true))
        const request = await fetch('http://php.dotsenvania.com/',
            {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: data
            }
        )
        return request.json(); 
      }



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
        setCategoryOfWords,
        postRequestAllWords
    }
}