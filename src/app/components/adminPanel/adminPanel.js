import "./adminPanel.scss"; 
import {useSelector, useDispatch} from "react-redux"; 
import {useState, useEffect} from 'react'; 
import {addWord, deleteWord} from '../../reducerSlice/mainSlice'; 
import Word from "./word";
function AdminPanel () {
    const {allDataWords, loadingAll, admin} = useSelector(state => state.main); 
    const [postData, setPostData] = useState({
        category: 'Людина', 
        example_eng1: null, 
        example_eng2: null, 
        example_eng3: null,
        example_ukr1: null, 
        example_ukr2: null, 
        example_ukr3: null, 
        name_eng: null, 
        transcription: null,
        translate: null, 
        url_audio: null, 
        url_img: null
    }); // Об'єкт форми для добавлення і редагування слова 
    const [editingStatus, setEditingStatus] = useState(false); 
    const [idUpdate, setIdUpdate] = useState(0); 
    

    useEffect(() => {
        console.log(allDataWords)
    }, [loadingAll]);

    const dispatch = useDispatch();

    function addWordLocalData(data) {
        dispatch(addWord(data))
    }
    function deleteWordLocalData (id)  {
        dispatch(deleteWord(id))
    }

    //Post запроси **********************************************************

    async function postRequestAddWord (data) { // Добавлення слова
        let res =  await fetch('http://php.dotsenvania.com/', {
           method: 'POST',
           header: {
             'Content-type': 'application/x-www-from-urlencoded'
           },
           body: JSON.stringify({...data, action: 'add-word'})
         })

        const result = res.text();
        result.then(res => addWordLocalData(data))
        return result;
     }

     async function postRequestDeleteWord (data) { // Видалення слова
        let res =  await fetch('http://php.dotsenvania.com/', {
           method: 'POST',
           header: {
             'Content-type': 'application/x-www-from-urlencoded'
           },
           body: JSON.stringify({...data, action: 'delete'})
         })

        const result = res.text();
        result.then(res => deleteWordLocalData(data))
        return result;
     }

     async function postRequestUpdateWord (data) { // Видалення слова
        let res =  await fetch('http://php.dotsenvania.com/', {
           method: 'POST',
           header: {
             'Content-type': 'application/x-www-from-urlencoded'
           },
           body: JSON.stringify({...data, action: 'update'})
         })

        const result = res.text();
        result.then(res => console.log(res))
        return result;
     }

     //****************************************************************************

     // Опрацювання форми додавання і редагування *********************************
    function onChangeValue (e) {
        let name = e.target.getAttribute('name')
        setPostData(state => {
            return {
                ...state,
                [name]: addBackSlash(e.target.value)
            }
        })
    }
    function addBackSlash(str) {
        const regex = /'/ig; 
        return str.replace(regex, "`")
    }

    function editWord (id) {

        allDataWords.filter(item => {
            if (item.id == id) {
                setPostData({
                    category: addBackSlash(item.category), 
                    example_eng1: addBackSlash(item.example_eng1), 
                    example_eng2: addBackSlash(item.example_eng2), 
                    example_eng3: addBackSlash(item.example_eng3),
                    example_ukr1: addBackSlash(item.example_ukr1), 
                    example_ukr2: addBackSlash(item.example_ukr2), 
                    example_ukr3: addBackSlash(item.example_ukr3), 
                    name_eng: addBackSlash(item.name_eng), 
                    transcription: addBackSlash(item.transcription),
                    translate: addBackSlash(item.translate), 
                    url_audio: addBackSlash(item.url_audio), 
                    url_img: addBackSlash(item.url_img),
                    id
                });
                setEditingStatus(true)
            }
            setIdUpdate(id)
        })
    }
    function cancelEditWord () {
        setEditingStatus(false)
        setPostData({
                    category: '', example_eng1: '', example_eng2: '', 
                    example_eng3: '',example_ukr1: '', example_ukr2: '', 
                    example_ukr3: '', name_eng: '', transcription: '',
                    translate: '', url_audio: '', url_img: ''
                })
        setIdUpdate(0)
    }

    //****************************************************************************
    const wordsRender = allDataWords.map( (item, i) => {
        return  <Word idUpdate={idUpdate} postRequestDeleteWord={postRequestDeleteWord} item={item} editWord={editWord}/>
    }) 
    const formTitleAdd = (
        <h2>Додати слово</h2>
    )
    const formTitleEdit = (
        <>
            <h2>Редагувати слово</h2>
            <div className="form__id">id - {postData.id}</div>
            <button onClick={() => cancelEditWord()}>Відмінити редагування</button>
        </>
    )

    return (
        <div className={`body`}>
        <div className="body__left">
            <div className="body__form form">
                <div className="form__title">
                    {editingStatus ? formTitleEdit : formTitleAdd}
                </div>

                <div className="form__wrapper">
                    <div className="form__input">
                        <div className="form__input_title">Англійське слово</div>
                        <input value={postData.name_eng} name="name_eng" type="text"  onChange={(e) => onChangeValue(e)}/>
                    </div>
                    <div className="form__input">
                        <div className="form__input_title">Транскрипція</div>
                        <input value={postData.transcription} name="transcription" type="text"  onChange={(e) => onChangeValue(e)}/>
                    </div>
                    <div className="form__input">
                        <div className="form__input_title">Переклад</div>
                        <input value={postData.translate} name="translate" type="text"  onChange={(e) => onChangeValue(e)}/>
                    </div>
                    
                </div>

                <hr/>
                
                        <div className="form__input">
                            <div className="form__input_title">Англійське речення 1</div>
                            <textarea value={postData.example_eng1} name="example_eng1"   onChange={(e) => onChangeValue(e)}/>
                        </div>
                        <div className="form__input">
                            <div className="form__input_title">Переклад першого речення</div>
                            <textarea value={postData.example_ukr1} name="example_ukr1"   onChange={(e) => onChangeValue(e)}/>
                        </div>

                        <hr/>

                        <div className="form__input">
                            <div className="form__input_title">Англійське речення 2</div>
                            <textarea value={postData.example_eng2} name="example_eng2"   onChange={(e) => onChangeValue(e)}/>
                        </div>
                        <div className="form__input">
                            <div className="form__input_title">Переклад другого речення</div>
                            <textarea value={postData.example_ukr2} name="example_ukr2"   onChange={(e) => onChangeValue(e)}/>
                        </div>

                        <hr/>

                        <div className="form__input">
                            <div className="form__input_title">Англійське речення 3</div>
                            <textarea value={postData.example_eng3} name="example_eng3"   onChange={(e) => onChangeValue(e)}/>
                        </div>
                        <div className="form__input">
                            <div className="form__input_title">Переклад третього речення</div>
                            <textarea value={postData.example_ukr3} name="example_ukr3"   onChange={(e) => onChangeValue(e)}/>
                        </div>

                        <hr/>

                <div className="form__input">
                    <div className="form__input_title">Категорія</div>
                    <select value={postData.category} name="category" onChange={(e) => onChangeValue(e)}>
                        <option value="Людина">Людина</option>
                        <option value="Робота">Робота</option>
                        <option value="Їжа">Їжа</option>
                        <option value="Відпочинок">Відпочинок</option>
                        <option value="Речі">Речі</option>
                        <option value="IT слово">IT слово</option>
                    </select>
                </div>
                <div className="form__input">
                    <div className="form__input_title">url картинки</div>
                    <input value={postData.url_img} name="url_img" type="text"  onChange={(e) => onChangeValue(e)}/>
                </div>
                <div className="form__input">
                    <div className="form__input_title">url audio</div>
                    <input value={postData.url_audio} name="url_audio" type="text"  onChange={(e) => onChangeValue(e)}/>
                </div>
                <div className="form__button">
                   { editingStatus ? null : <button onClick={() => postRequestAddWord(postData)}>Відправити</button>}
                   { editingStatus ? <button onClick={() => postRequestUpdateWord(postData)}>Редагувати</button> : null}
                </div>
            </div>
        </div>
        <div className="body__right">
            {wordsRender}
           
        </div>
        </div>
    )
}


export default AdminPanel; 