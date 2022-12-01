import "./adminPanel.scss"; 
import {useSelector, useDispatch} from "react-redux"; 
import {useState, useEffect, useRef} from 'react'; 
import {addWord, deleteWord} from '../../reducerSlice/mainSlice'; 
import { useDataChange } from "../../hooks/useDataChange";
import { setAllDataWords, setLoading } from "../../reducerSlice/mainSlice";
import Word from "./word";
function AdminPanel () {
    const { postRequestAllWords } = useDataChange(); 
    const inputEl = useRef(null);
    const {allDataWords, loadingAll} = useSelector(state => state.main); 
    const [postData, setPostData] = useState({
        category: 'Людина', 
        example_eng1: '', 
        example_eng2: '', 
        example_eng3: '',
        example_ukr1: '', 
        example_ukr2: '', 
        example_ukr3: '', 
        name_eng: '', 
        transcription: '',
        translate: '', 
        url_img: ''
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
        result.then(res => {
            addWordLocalData({...data, id: +(allDataWords[allDataWords.length - 1].id) + 1 });
            fileFormRequest(+(allDataWords[allDataWords.length - 1].id) + 1);
            postRequestAllWords() 
            .then(res => {
                dispatch(setAllDataWords(res)); 
                dispatch(setLoading(false));  
                // dispatch(setAllDataWords(word)); 
              });
        })
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
        result.then(res => {
            deleteWordLocalData(data);
            postRequestAllWords() 
            .then(res => {
                dispatch(setAllDataWords(res)); 
                dispatch(setLoading(false));  
                // dispatch(setAllDataWords(word)); 
              });
        })
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
        result.then(res => {
            fileFormRequest(data.id);
            postRequestAllWords() 
            .then(res => {
                dispatch(setAllDataWords(res)); 
                dispatch(setLoading(false));  
                // dispatch(setAllDataWords(word)); 
              });
        })
        return result;
     }

     //****************************************************************************

 // TEST POST REQUEST =============================
    async function reqAudioWord (data) { // Видалення слова
        let res =  await fetch('http://php.dotsenvania.com/post.php', {
        method: 'POST',
        // headers: {
        //     'Content-type': 'multipart/form-data'
        // },
        body: data
        })

        const result = res.text();
        return result;
    }

    function fileFormRequest(id) {
        // e.preventDefault()
        const formData = new FormData(inputEl.current); 
        formData.append("action", 'file');
        formData.append("id", id);
        reqAudioWord(formData)
        .then(data => console.log(data)) 
     }

//=================================================




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
        return  <Word key={i} idUpdate={idUpdate} postRequestDeleteWord={postRequestDeleteWord} item={item} editWord={editWord}/>
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
                        <option value="Рух">Рух</option>
                        <option value="Думки і почуття">Думки і почуття</option>
                        <option value="Місця і числа">Місця і числа</option>
                        <option value="Час">Час</option>
                        <option value="Кількість">Кількість</option>
                        <option value="Більше-менше">Більше-менше</option>
                        <option value="Дім і речі">Дім і речі</option>
                        <option value="Освіта">Освіта</option>
                        <option value="Робота">Робота</option>
                        <option value="Природа">Природа</option>
                        <option value="Колір, форма і розмір">Колір, форма і розмір</option>
                        <option value="Суспільство"> Суспільство</option>
                        <option value="Відпочинок і спорт">Відпочинок і спорт</option>
                        <option value="Подорожі">Подорожі</option>
                        <option value="Технології">Технології</option>
                        <option value="Їжа і напої">Їжа і напої</option>
                        <option value="IT слова">IT слова</option>
                    </select>
                </div>
                <div className="form__input">
                    <div className="form__input_title">url картинки</div>
                    <input value={postData.url_img} name="url_img" type="text"  onChange={(e) => onChangeValue(e)}/>
                </div>
                <div className="file">
                    <form ref={inputEl}>
                        <input name="fileName" type="file"/>
                        <input name="action" type="text"/>
                    </form>
                    
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