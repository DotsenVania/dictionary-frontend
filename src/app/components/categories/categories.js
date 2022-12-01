import './categories.scss'; 
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'; 
import { setLoading, activePageStatus } from '../../../app/reducerSlice/mainSlice';
import { useDataChange } from '../../hooks/useDataChange';
function Categories () {
    const {allDataWords, loadingAll, admin} = useSelector(state => state.main);

    const [allCategories, setAllCategories] = useState([]);// Масив категрій
    const [arrCatgories, setArrCatgories] = useState([]);// Підсумковий масив з усіма категоріями і кількісттю слів цієї категорії...
    const dispatch = useDispatch();
    const { setAllWords, setCategoryOfWords } = useDataChange(); 
  
    
    useEffect(() => {
            setAllCategories([])
            allDataWords.map(item => {
            setAllCategories(state => {
                return [...state, item.category]
            })
        })
    }, [loadingAll])

    useEffect(() => {
        setArrCatgories([])
       allCategories.filter(function(item, pos) {
            return allCategories.indexOf(item) == pos;
        }).map(item => calc(item))

    }, [allCategories])

   
   function calc(category) {
        let num = allDataWords.filter(item => {
            return item.category == category; 
        }).length; 
        setArrCatgories(state => [...state, {category, num}])
   }
   
   
   
   
    const categories = arrCatgories.map((item, i) => {
        let icon; 
        switch (item.category) {
            case 'Людина':
                icon = 'emoji_people';
                break;
            case 'Рух':
                icon = 'blur_medium';
                break;
            case 'Думки і почуття':
                icon = 'psychology';
                break;
            case 'Місця і числа':
                icon = 'where_to_vote';
                break;
            case 'Час':
                icon = 'schedule';
                break;
            case 'Кількість':
                icon = 'money';
                break;
            case 'Більше-менше':
                icon = 'unfold_more_double';
                break;
            case 'Дім і речі':
                icon = 'cottage';
                break;
            case 'Освіта':
                icon = 'school';
                break;
            case 'Робота':
                icon = 'engineering';
                break;
            case 'Природа':
                icon = 'forest';
                break;
            case 'Колір, форма і розмір':
                icon = 'palette';
                break;
            case 'Суспільство':
                icon = 'diversity_3';
                break;
            case 'Відпочинок і спорт':
                icon = 'skateboarding';
                break;
            case 'Подорожі':
                icon = 'nordic_walking';
                break;
            case 'Технології':
                icon = 'live_tv';
                break;
            case 'Їжа і напої':
                icon = 'restaurant_menu';
                break;
            case 'IT слова':
                icon = 'code';
                break;
            default:
                icon = 'code';
                break;
        }
       
        return (
            <div key={i} onClick={() => setCategoryOfWords(item.category)} className='categories__item'>
                <span class="material-symbols-outlined">{icon}</span>
                {item.category}
                <div className='categories__item_num'>Кількісьть слів - {item.num}</div>
            </div>
        )
    })

    return (
        <div className={`wrapper__categories ${admin ? 'active': ''}`}>
            <div className="title">
                Категорії
            </div>
            <div className="categories">
                <div onClick={() => setAllWords()} className='categories__item'>
                    Всі слова
                    <div className='categories__item_num'>Кількісьть слів - {allDataWords.length}</div>
                </div>
                {categories}
            </div>
        </div>
    )
}
export default Categories; 