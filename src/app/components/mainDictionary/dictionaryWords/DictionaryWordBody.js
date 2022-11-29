import './dictionaryWordBody.scss'; 
import reactStringReplace  from  'react-string-replace';
function DictionaryWordBody(props) {
    const { category, example_eng1, example_eng2, example_eng3,
        example_ukr1, example_ukr2, example_ukr3, id, name_eng, url_img} = props.word;


    function highlightMainWord (str) {
        const regex = new RegExp(name_eng,'gmi');
        return reactStringReplace(str, regex, (match, i) => (
        <div style={{display: 'inline'}} key={id}>
            <span>{name_eng}</span>
            {match}
        </div>
        ))
    }
    
    return (
        <div key={id} className={`descr ${props.active ? 'active': ''}`}>
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
    )
}

export default DictionaryWordBody; 