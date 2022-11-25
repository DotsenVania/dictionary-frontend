import './main.scss'; 
import Header from '../header/Header';
import AdminPanel from '../adminPanel/adminPanel';
import Categories from '../categories/categories';
import { useSelector, useDispatch } from 'react-redux'; 

function Main () {
    const {admin} = useSelector(state => state.main)
    return (
        <>
            <Header/>
            <div className="main__wrapper">
                <Categories/> 
                <AdminPanel/>
            </div>
        </>
    )
}

export default Main; 