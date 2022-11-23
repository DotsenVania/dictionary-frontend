import './word.scss';
import WordBody from "./wordBody";
import {useSelector} from "react-redux"; 
import {useState, useEffect} from 'react'; 
function Word (props) {
    const [active, setActive] = useState(false)
    
        const { id, name_eng, transcription,
                translate} = props.item;


            let classActiveUpdate ;
            if(id == props.idUpdate) {
                classActiveUpdate = 'active';
            }else {
                classActiveUpdate = '';
            }
            function desctiptionClassActive () {
                setActive(state => !state)
            }
        
            return (
                <div className="word__wrapper">
                    <div key={id} className={`word ${classActiveUpdate}`}>
                        <div className={`word__more btn-control ${active ? 'active': ''}`} onClick={(e) => {desctiptionClassActive(e)}}><span>&#10140;</span></div>
                        <div className="word__name padding">{name_eng}</div>
                        <div className="word__tr padding">{transcription}</div>
                        <div className="word__name_ukr padding"> {translate}</div>
                        <div className="word__delete btn-control" onClick={() => props.postRequestDeleteWord({id})}><span>&#10006;</span></div>
                        <div className="word__edit btn-control" onClick={(e) => props.editWord(id)}>&#9998;</div>
                    </div>
                <WordBody item={props.item} active={ active }/>
                </div>
                
            )
}


export default Word; 