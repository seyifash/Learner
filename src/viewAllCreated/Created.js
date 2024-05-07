import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { createdActions, fetchTeacherDetails, fetchTeacherQuiz} from './createdReducer'
import 'boxicons/css/boxicons.min.css';
import NavBar from '../Dashboard/NavBar';
import TopBar from '../component/TopBar';
import "../Dashboard/dashboard.css";
import getQuizByCourse from './helperFunc';
import copyToClipboard from '../component/copyToClipboard';
import { Link } from 'react-router-dom';
import './created.css';

const Created = () => {
    const userId = useSelector(state => state.auth.userId);
    const toggles = useSelector(state => state.toggle);
    const creates = useSelector(state => state.created);
    const { quiz, views, quizIds, filename, score, quizView, coursesList } = creates
    const dispatch = useDispatch();
    const { toggle } = toggles;
    const [selectedKey, setSelectedKey] = useState(null);
    const [showPopup, setShowPopup] = useState({});

    const handleKeyClick = (key) => {
        setSelectedKey(key);
        console.log(selectedKey);
        setShowPopup(prevState => ({
            ...Object.fromEntries(Object.entries(prevState).map(([k, v]) => [k, k === key])),
            [key]: !prevState[key]
        }));
        dispatch(fetchTeacherDetails(key));
    }
    useEffect(() => {
        dispatch(fetchTeacherQuiz(userId))
    }, [userId, dispatch]);

    const handleCourses = () => {
        dispatch(createdActions.handleView(false))
        const courses = getQuizByCourse(userId);
        dispatch(createdActions.Courses(courses));
    }

    const handleViews = (key) =>  {
        console.log('the quiz: ', quiz);
        console.log('the key: ', key);
        console.log(quizView)
        dispatch(createdActions.handleQuizView({key}));
        setShowPopup(prevState => ({
            ...prevState,
            [key]: false
        }));
    }

    const handleClickBack = (key) => {
        dispatch(createdActions.handleQuizBack({key}));
        setShowPopup(prevState => ({
            ...Object.fromEntries(Object.entries(prevState).map(([k, v]) => [k, k === key])),
            [key]: false
        }));
    }

  return (
    <div>
         <NavBar />
        <div className={`main ${toggle ? 'active' : ''}`}>
            <TopBar opt={false} />
            <div className="boxes">
                <div className="box1 box0" onClick={() => dispatch(createdActions.handleAllQuiz())}>
                    <span class="textspan">All Created Quiz</span>
                    <span className="icn-bx"><i class='bx bx-podcast'></i></span>    
                </div>
                <div className="box1 box3" onClick={handleCourses}>
                    <span class="textspan">Courses Taken</span>
                    <span className="icn-bx"><i class='bx bx-folder'></i></span> 
                </div>
            </div>
            <div className="created-quiz">
            {views !== null && (
                    <>
                        {views ? (
                            <div className="all-quiz">
                            {quizIds.map((key, index) => (
                                <div className="popup" onClick={quizView[key] ? null : () => handleKeyClick(key)} key={index}>
                                <span >Quiz {index + 1} </span>
                                    <div className={`popuptext ${showPopup[key] ? 'show' : ''}`}>
                                        <div className="pop">
                                            <Link className="link-Quiz" to={`http://127.0.0.1:5000/api/learners/v1/${filename}`}>
                                                <i class='bx bxs-file-doc'></i> Download Quiz
                                            </Link>
                                            <span className="link-Quiz"  onClick={(e) => { e.stopPropagation(); handleViews(key) }}>
                                                <i class='bx bxs-edit-alt'></i>View Quiz
                                            </span>
                                            <Link className="link-Quiz"  to={`http://127.0.0.1:5000/api/learners/v1/${score}`}>
                                                <i class='bx bxs-door-open'></i> View Score In Excel
                                            </Link>
                                            <span className="link-Quiz">
                                                <i className='bx bx-copy' onClick={() => copyToClipboard(`api/learners/v1/take-quiz/${selectedKey}`)}></i> Copy Link
                                            </span>
                                        </div>
                                    </div>
                                    {showPopup[key] === false && quizView[key] === true &&(
                                    <div className="questionaire">
                                        <span className="back" onClick={() => handleClickBack(key)}><i class='bx bx-left-arrow-alt'></i> Back</span>
                                        <p className="sub">{quiz[0].subject}</p>
                                        {quiz.map((items, index) => (
                                            <div className="real" key={index}>
                                                <span className="que">Question {index  + 1}</span>
                                                <span className="head-er"><strong>Header: </strong>{items.header}</span>
                                                {items.image && <img src={`http://localhost:5000/api/learners/v1/${items.image}`} alt={`img-${items.id}`} />}
                                                <p>{items.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                    )}
                                </div>
                            ))}
                            </div>
                        ) : (
                        <>
                        {coursesList.map((val, index) => (
                            <div className="all-courses" key={index}>
                                <h4>{val}</h4>
                            </div>
                        ))}
                         </>
                       )}
                    </>
                )
            }
        </div>
        </div>
    </div>
  )
}


export default Created;