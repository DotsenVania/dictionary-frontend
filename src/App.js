import './App.scss'; 
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Main from './app/components/main/Main';
import { setAllDataWords, setLoading } from './app/reducerSlice/mainSlice';

function App() {
  const {loadingAll} = useSelector(state => state.main)
  const dispatch = useDispatch(); 
  
  const data = JSON.stringify({action: 'setData'})
  async function postRequest () {
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


  useEffect(() => {
    postRequest()
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
