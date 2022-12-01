import './header.scss'; 
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, activePageStatus } from '../../../app/reducerSlice/mainSlice';
function Header () {
    const {loadingAll, activePage} = useSelector(state => state.main)
    const dispatch = useDispatch()
    const clazz = !loadingAll ? 'active' : ''; 
    let styleIconBack;
    let classActivPage; 
    if (activePage.admin || activePage.user) {
        styleIconBack = {transform: 'rotate(0deg)'};
        classActivPage = 'activeAdminUser' 
    }else if(activePage.categories) {
        styleIconBack = {transform: 'rotate(-90deg)'};
        classActivPage = ''
    }else if (activePage.dictionary) {
        styleIconBack = {transform: 'rotate(-180deg)'};
        classActivPage = 'activeDictionary'
    }

   const spiner = (
    <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
   )
    return (
        <>
            <header className={`header ${clazz}`}>
                <div className={`back `} onClick={() => dispatch(activePageStatus('categoriesActive'))}><span style={styleIconBack} class="material-symbols-outlined">arrow_back_ios_new</span></div>
                
                <div className="header__wrapper">
                    <div onClick={() => dispatch(activePageStatus('categoriesActive'))} className="header__logo">
                        <span className="header__logo_gold">
                            gold
                        </span>
                        &nbsp;
                        <span className="header__logo_words">words</span>
                        {loadingAll ? <span className='header__loading'>{spiner}</span> : null}
                    </div>
                    <div className={`header__logo_title`}>
                        <div className={`wrapper ${classActivPage}`}>
                            <span className='admin'>Admin Panel</span> 
                            <span>3000 англійських слів</span> 
                            <span className='dictionary'>Dictionary</span> 
                        </div>
                    </div>
                    
                </div>
                
                <div className='user' onClick={() => dispatch(activePageStatus('adminAcitve'))}><span class="material-symbols-outlined">person</span></div>
            </header>
        </>
    )
}

export default Header; 