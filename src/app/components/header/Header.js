import './header.scss'; 
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, activePageStatus } from '../../../app/reducerSlice/mainSlice';
function Header () {
    const {loadingAll} = useSelector(state => state.main)
    const dispatch = useDispatch();
    const clazz = !loadingAll ? 'active' : ''
    return (
        <>
            <header className={`header ${clazz}`}>
            <button className='back' onClick={() => dispatch(activePageStatus('categoriesActive'))}>Back</button>
                <div className="header__logo">
                    <span className="header__logo_gold">
                   gold
                    </span>
                    &nbsp;
                    <span className="header__logo_words">words</span>
                </div>
                <div className="header__logo_title">
                <span>3000 англійських слів</span> 
                </div>
                {loadingAll ? <h2 style={{fontSize: '30px'}}>loading</h2> : null}
                <button className='user' onClick={() => dispatch(activePageStatus('adminAcitve'))}>Admin</button>
            </header>
        </>
    )
}

export default Header; 