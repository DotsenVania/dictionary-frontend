import './dictionaryWord.scss';
import {useState, useEffect} from 'react'; 
import DictionaryWordBody from './DictionaryWordBody';

function DictionaryWord(props) {
    const [active, setActive] = useState(false)
    const { id, name_eng, transcription,
        translate, url_audio } = props.word;
    function desctiptionClassActive () {
        setActive(state => !state)
    }
    function onAudioPlay (url) {
        new Audio(url).play();
    }
    console.log( props.word)
    return (
        <div key={id} className="dictionary_word__wrapper">
            <div className={`word-dictionary`}>
                <div className={`word-dictionary__more btn-control ${active ? 'active': ''}`} onClick={(e) => {desctiptionClassActive(e)}}><span class="material-symbols-outlined">chevron_right</span></div>
                <div className="word-dictionary__numbering">{props.numbering + 1}</div>
                <div className="word-dictionary__name ">{name_eng}</div>
                <div className="word-dictionary__tr">{transcription}</div>
                <div className="word-dictionary__name_ukr"> {translate}</div>
                <div onClick={() => onAudioPlay(url_audio)} className="word-dictionary__audio">
                    <span class="material-symbols-outlined">volume_up</span>
                </div>
            </div>
        <DictionaryWordBody key={id} word={props.word} active={ active }/>
        </div>
        
    )
}

export default DictionaryWord;