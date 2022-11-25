import './categories.scss'; 
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'; 
function Categories () {
    const {allDataWords, loadingAll, admin} = useSelector(state => state.main);

    const [allCategories, setAllCategories] = useState([]);
    const [arrCatgories, setArrCatgories] = useState([]);

    
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
            <div className='categories__item'>
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