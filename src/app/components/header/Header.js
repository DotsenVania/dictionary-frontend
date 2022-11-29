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
                    </div>
                    <div className={`header__logo_title`}>
                        <div className={`wrapper ${classActivPage}`}>
                            <span className='admin'>Admin</span> 
                            <span>3000 англійських слів</span> 
                            <span className='dictionary'>Dictionary</span> 
                        </div>
                    </div>
                    {loadingAll ? <h2 style={{fontSize: '30px'}}>loading</h2> : null}
                </div>
                
                <div className='user' onClick={() => dispatch(activePageStatus('adminAcitve'))}><span class="material-symbols-outlined">person</span></div>
            </header>
        </>
    )
}

export default Header; 