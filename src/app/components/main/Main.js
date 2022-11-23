import './main.scss'; 
import Header from '../header/Header';
import AdminPanel from '../body/adminPanel';
import { useSelector, useDispatch } from 'react-redux'; 

function Main () {

    return (
        <>
            <Header/>
            <AdminPanel/>
        </>
    )
}

export default Main; 