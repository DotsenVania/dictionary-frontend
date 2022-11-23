import './body.scss'; 
import {useSelector, useDispatch} from "react-redux"; 
import {useState, useEffect} from 'react'; 
import {addWord, deleteWord} from '../../reducerSlice/mainSlice'; 
import reactStringReplace  from  'react-string-replace';
function WordBody(props) {
    const { category, example_eng1, example_eng2, example_eng3,
        example_ukr1, example_ukr2, example_ukr3, id, name_eng, url_img} = props.item;

    function highlightMainWord (str) {
        console.log(str)
        const regex = new RegExp(name_eng,'gmi');
       return reactStringReplace(str, regex, (match, i) => (
       <>
       <span>{name_eng}</span>
       {match}
       </>
       ))
    }

    return(
        <>
        <div className={`descr ${props.active ? 'active': ''}`}>
                        <div className="descr__category">{category}</div>
                        
                        <div className="descr__sections sections">
                            <div className="section__left left">
                                <div className="left__eng">{highlightMainWord(example_eng1)}</div>
                                <div className="left__ukr">{example_ukr1}</div>
                                <div className="left__eng">{highlightMainWord(example_eng2)}</div>
                                <div className="left__ukr">{example_ukr2}</div>
                                <div className="left__eng">{highlightMainWord(example_eng3)}</div>
                                <div className="left__ukr">{example_ukr3}</div>
                            </div>
                            <div className="section__right right">
                                <img src={url_img} alt="" />
                            </div>
                        </div>
                        
                    </div>
        </>
    )
}

export default WordBody; 