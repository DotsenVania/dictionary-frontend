import './categories.scss'; 
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'; 
import { setLoading, activePageStatus } from '../../../app/reducerSlice/mainSlice';

function Categories () {
    const {allDataWords, loadingAll, admin} = useSelector(state => state.main);

    const [allCategories, setAllCategories] = useState([]);
    const [arrCatgories, setArrCatgories] = useState([]);

    const dispatch = useDispatch();

    
    useEffect(() => {
        allDataWords.map(item => {
            setAllCategories(state => {
                return [...state, item.category]
            })
        })
    }, [loadingAll])

    useEffect(() => {
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
   
   
   
   
    const categories = arrCatgories.map(item => {
       
        return (
            <div onClick={() => dispatch(activePageStatus('dictionaryActive'))} className='categories__item'>
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
                { categories}
            </div>
        </div>
    )
}
export default Categories; 