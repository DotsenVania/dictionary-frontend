import './mainDictionary.scss'; 
import DictionaryWord from './dictionaryWords/DictionaryWord';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {addWord, deleteWord} from '../../reducerSlice/mainSlice'; 
function MainDictionary (props) {
    const {allDataWords, loadingAll, mainDictionary} = useSelector(state => state.main);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('main')
    },[mainDictionary])
    function renderWords () {
        const words = mainDictionary.map((item, i) => {

            return <DictionaryWord key={i} numbering={i} word={item}/>
        })
        return words; 
    }
    return (
        <div className='container'>
            <div className="dictionary_word__wrapper pt">
                <div className={`word-dictionary__first`}>
                    <div className={`word-dictionary__more btn-control`}><span className="material-symbols-outlined">expand_content</span></div>
                    <div className="word-dictionary__numbering"><span className="material-symbols-outlined">pin</span></div>
                    <div className="word-dictionary__name ">Слово</div>
                    <div className="word-dictionary__tr">Транскрипція</div>
                    <div className="word-dictionary__name_ukr"> Переклад </div>
                    <div className="word-dictionary__audio">
                        <span className="material-symbols-outlined">volume_up</span>
                    </div>
                </div>
            </div>
            <div className='main_dictionary'>
            
                {renderWords ()}
            </div>
        
        </div>
        
    )
}; 

export default MainDictionary; 