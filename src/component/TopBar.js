import React from 'react';
import 'boxicons/css/boxicons.min.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleActions } from '../Dashboard/dashBoardToggleRducer';
import './TopBar.css'

const TopBar = ({opt}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { teacherImage } = auth;

    return (
        opt === true ? (
        <div className="topbar">
            <div className="toggle" onClick={() => dispatch(toggleActions.toggleBar())}><i className='bx bx-menu'></i></div>
            <div className="search">
                <label>
                    <input type="text" placeholder="Search here" />
                    <i className='bx bx-search-alt-2'></i>
                </label>
            </div>
            <div className="user">
                {teacherImage !== null && teacherImage ? 
                    (
                    <img src={`http://localhost:5000/api/learners/v1/${teacherImage}`} alt="profile-pics" />) 
                    :
                    (
                    console.log('i am in heere'), <i className='bx bxs-user-circle'></i>)
                }
            </div>
        </div>
        ) : (
            <div className="topbar">
                < div className="toggle" onClick={() => dispatch(toggleActions.toggleBar())}><i className='bx bx-menu'></i></div>
                <div className="user">
                    {teacherImage !== null && teacherImage ? 
                        (
                        <img src={`http://localhost:5000/api/learners/v1/${teacherImage}`} alt="profile-pics" />) 
                        :
                        (<i className='bx bxs-user-circle'></i>)
                    }
                    </div>
            </div>
        )
    )
}

TopBar.propTypes = {
    opt: PropTypes.bool
};

export default TopBar