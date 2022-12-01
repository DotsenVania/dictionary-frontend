import './App.scss'; 
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Main from './app/components/main/Main';
import { setAllDataWords, setLoading } from './app/reducerSlice/mainSlice';
import { useDataChange } from './app/hooks/useDataChange';

function App() {
  const {loadingAll} = useSelector(state => state.main)
  const dispatch = useDispatch();
  const { postRequestAllWords } = useDataChange(); 


  useEffect(() => {
    postRequestAllWords()
    .then(res => {
      dispatch(setAllDataWords(res)); 
      dispatch(setLoading(false)); 
    })
  }, [])

  return (
    <div className="App">
      <div className="container">
        <Main/>
      </div>
    </div>
  );
}

export default App;
