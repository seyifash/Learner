import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import {fetchTestQuestion } from '../TestCreation/TestReducer'
import NavBar from '../Dashboard/NavBar';
import TopBar from '../component/TopBar';
import "../Dashboard/dashboard.css";
import ToDo from '../component/TodoBox';
import AddNew from './AddNew';
import AddExisting from './AddExisting';


const TestCreation = () => {
  const toggles = useSelector(state => state.toggle);
  const { toggle } = toggles;
  const questions = useSelector(state => state.test.questionsDb)
  const test = useSelector(state => state.test);
    const { createNew } = test;

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchTestQuestion())
  }, [dispatch])
  

  return (
    <div className="test">
      <NavBar />
        <div className={`main ${toggle ? 'active' : ''}`}>
            <TopBar opt={false} />
            <ToDo questions={questions}/>
            {createNew !== null && (
                    <>
                        {createNew ? 
                            (<AddNew />) :
                            (<AddExisting />)
                        }
                    </>
                )}
        </div>
        </div>
  )
}

export default TestCreation;