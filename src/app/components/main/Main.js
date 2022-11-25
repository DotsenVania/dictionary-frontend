import './main.scss'; 
import Header from '../header/Header';
import AdminPanel from '../adminPanel/adminPanel';
import Categories from '../categories/categories';
import MainDictionary from '../mainDictionary/MainDictionary';
import { useSelector, useDispatch } from 'react-redux'; 

function Main () {
    const {activePage} = useSelector(state => state.main)
    let classActive;
    if (activePage.admin || activePage.user) {
        classActive ='active__admin';
    }else if (activePage.categories) {
        classActive = '';
    }else if (activePage.dictionary) {
        classActive = 'active__dictionary';
    }
    return (
        <>
            <Header/>
            <div className="main__wrapper">
                <div className={`main__wrapper_sliding-block ${classActive}`}>
                    <MainDictionary/>
                    <Categories/> 
                    <AdminPanel/>
                </div>
                
            </div>
        </>
    )
}

export default Main; 