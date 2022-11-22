import './main.scss'; 
import Header from '../header/Header';
import Body from '../body/body';
import { useSelector, useDispatch } from 'react-redux'; 

function Main () {

    return (
        <>
            <Header/>
            <Body/>
        </>
    )
}

export default Main; 