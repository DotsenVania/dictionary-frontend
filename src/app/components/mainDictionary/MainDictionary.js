import './mainDictionary.scss'; 
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {addWord, deleteWord} from '../../reducerSlice/mainSlice'; 
function MainDictionary () {
    const {allDataWords, loadingAll, admin} = useSelector(state => state.main);
    const dispatch = useDispatch();

    return (
        <div className='main_dictionary'>
            <h2>hello2</h2>
        </div>
    )
}; 

export default MainDictionary; 