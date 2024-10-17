import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import './NavBar.css';
import { useNavigate } from "react-router-dom";
import { authActions } from  "../AuthReducer/AuthSlice";
import { toggleActions } from './dashBoardToggleRducer';
import { dashBoardNavItems } from './navbarItems';
import DashboardItem from './DashBoardItem';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios'
import useAxiosPrivate from '../Api/useAxiosPrivate';

const NavBar = () => { 
    const toggles = useSelector(state => state.toggle) 
    const { toggle, mode, activeItem } = toggles;
    const dispatch =  useDispatch()
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate()

    const [screenSize] = useState({
        isMobile: window.matchMedia("(max-width: 477px)").matches,
        isSmallTablet: window.matchMedia("(max-width: 799px)").matches,
        isLargeTablet: window.matchMedia("(max-width: 1040px)").matches,
      });
    
      const handleLinkClick = () => {
        if (screenSize.isMobile || screenSize.isSmallTablet || screenSize.isLargeTablet) {
            dispatch(toggleActions.toggleBar());
        }
    };


    useEffect(() => {
        const handleLogoutEvent = async (event) => {
            if (event.key === 'logoutEvent') {
                const logResponse = await axiosPrivate.post('https://Osei.pythonanywhere.com/api/learners/v1/logout/',{}, {withCredentials: true});
                if(logResponse.status === 200){
                dispatch(authActions.logOut());
                console.log('I logged out')
                }
                navigate("/sign-in");
            }
        };

        window.addEventListener('storage', handleLogoutEvent);

        return () => {
            window.removeEventListener('storage', handleLogoutEvent);
        };
    }, [dispatch, navigate]);
    

    const handleMouseOver = (itemId) => {
        dispatch(toggleActions.toggleActiveItem(itemId))
    };

    const handleMode = async () => {
        if(mode === 'light') {
            dispatch(toggleActions.toggleMode('dark'))
        } else{
            dispatch(toggleActions.toggleMode('light'))
        }
        const modeResponse = await axios.post('https://Osei.pythonanywhere.com/api/learners/v1/change-theme/',
            {theme: mode },
            {withCredentials: true}
        );
       
        document.body.classList.toggle('dark');
    }

    const handleLogout = async() => {
        const logResponse = await axios.post('https://Osei.pythonanywhere.com/api/learners/v1/logout/',{},
            {withCredentials: true}
        );
        console.log(logResponse )
        if(logResponse.status === 200){
        dispatch(authActions.logOut());
        console.log('I logged out')
        navigate("/sign-in");
        }
    };


    return (
        <div className={`navigation ${toggle ? 'active' : ''}`}>
            <ul>
            {dashBoardNavItems.map(item => (
                <DashboardItem key={item.id} id={item.id} icon={item.icon} name={item.name} link={item.link} handleLogout={handleLogout} activeItem={activeItem} handleMouseOver={handleMouseOver}
                handleLinkClick={handleLinkClick} 
            />
                ))}
                <li className="mode">
                    <div className="mode-inner">
                        <div className="moon-sun">
                            <i class='bx bx-moon icon moon'></i>
                            <i class='bx bx-sun icon sun'></i>
                        </div>
                        <span className="mode-text text">{mode === 'light' ? "Light Mode" : "Dark Mode"}</span>
                        <div className="toggle-switch" onClick={handleMode}>
                            <span className="switch"></span>
                        </div>
                    </div>
                </li>
            </ul>
            <span className="x" onClick={() => dispatch(toggleActions.toggleBar())}><i class='bx bx-x'></i></span>
        </div>
  )
}

export default NavBar