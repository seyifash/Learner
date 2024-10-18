import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import './NavBar.css';
import { useNavigate } from "react-router-dom";
import { authActions } from  "../AuthReducer/AuthSlice";
import { toggleActions } from './dashBoardToggleRducer';
import { dashBoardNavItems } from './navbarItems';
import DashboardItem from './DashBoardItem';
import 'boxicons/css/boxicons.min.css';
import useAxiosPrivate from '../Api/useAxiosPrivate';

const NavBar = () => { 
    const toggles = useSelector(state => state.toggle) 
    const { toggle, mode, activeItem } = toggles;
    console.log(mode)
    const dispatch =  useDispatch()
    const navigate = useNavigate();
    const {userId }= useSelector(state => state.auth)
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
                const logResponse = await axiosPrivate.post('/api/learners/v1/logout/',{});
                console.log(logResponse)
                if(logResponse.status === 200 && logResponse.data.logout === true){
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
    }, [dispatch, navigate, axiosPrivate]);
    

    const handleMouseOver = (itemId) => {
        dispatch(toggleActions.toggleActiveItem(itemId))
    };

    useEffect(() => {
        if (mode === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [mode]);

    const handleMode = async () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        dispatch(toggleActions.toggleMode(newMode));

        try {
            const modeResponse = await axiosPrivate.put(`/api/learners/v1/change-theme/${userId}`, {
                theme: newMode
            });
            console.log(modeResponse);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleLogout = async() => {
        const logResponse = await axiosPrivate.post('/api/learners/v1/logout',{}
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