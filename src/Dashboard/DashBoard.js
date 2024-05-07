import React, {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { toggleActions, fetchQuestion , fetchStudentCount} from './dashBoardToggleRducer';
import { uniqueSubjects } from './dashBoardUtils';
import TopBar from '../component/TopBar';
import CardClick from './CardClick';
import './dashboard.css';
import QuestionList from './QuestionList';
import Pagination from './Pagination';
import RecentQuestions from './recentQuestions';



const DashBoard = () => {
  const toggles = useSelector(state => state.toggle);
  const { toggle, questions, currentPage, itemsPerPage,  viewAll, allCourses
   } = toggles;
  const dispatch = useDispatch()
  const subjectsList = uniqueSubjects(questions);

  useEffect(() => {
    dispatch(fetchQuestion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStudentCount());
  }, [dispatch]);

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = Array.isArray(questions) ? questions.slice(indexOfFirstItem, indexOfLastItem) : [];



  const handleCardClick = (id) => {
    switch (id) {
        case 1:
          dispatch(toggleActions.toggleAllCourses())
          break;
        case 2:
          dispatch(toggleActions.toggleAllQuestion())
          break;
        default:
          break;
    }
};


  return (
    <div>
      <NavBar />
      <div className={`main ${toggle ? 'active' : ''}`}>
        <TopBar opt={true} />
        <CardClick handleCardClick={handleCardClick} />
        {allCourses && (
                <div className="courses">
                    {subjectsList.map((course, index) => (
                        <span key={index} className="course">{course}</span>
                    ))}
                </div>
        )}
        <div className="Details">
          <div className="recentQuestions">
            <div className="cardHeader">
                <h2>Recent Questions</h2>
                <Link to="#" className="btnd" onClick={() => dispatch(toggleActions.toggleAllQuestion())}>{viewAll ? "View Less" : "View All"}</Link>
            </div>
            <div className="recent-container">
              {viewAll ? (
                <>
                <QuestionList currentQuestions={currentQuestions} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                <Pagination totalPages={totalPages} currentPage={currentPage} />
                </>
              ) : (
                <>
                <RecentQuestions />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard