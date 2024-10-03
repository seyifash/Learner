import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TestActions, submitQuestion } from './TestReducer';
import './AddExisting.css';
import { Link } from 'react-router-dom';
import getQuestionsBySubject from './utils';

const AddExisting = () => {
    const userId = useSelector(state => state.auth.userId);
    const test = useSelector(state => state.test);
    const { showQuestion, testDuration, quizId, code, filename, Question, subject } = test;
    const dispatch = useDispatch()
    const [checkedStates, setCheckedStates] = useState(Array(Question.length).fill(null));
    
    const [info, setInfo] = useState({
        subject: '',
        testDuration: 30
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };


    const setDetailsList = (event) => {
        event.preventDefault();
        dispatch(TestActions.DurationAndNum({'duration': info.testDuration, 
        'sub': info.subject}))
        dispatch(TestActions.showQuestion(false))
        console.log("Submitted");
        console.log(testDuration);
      }

    const Subject = getQuestionsBySubject(Question);

    const submitQuestions = async () => {
        const questionIds = checkedStates.filter(state => state !== null);
        dispatch(submitQuestion({userId, questionIds, testDuration, subject}));
        setCheckedStates(Array(Question.length).fill(null));
        console.log(questionIds);
    };

    const handleCheck = (questionIndex, questionId) => {
        setCheckedStates(prevStates => {
            const updatedStates = [...prevStates];
            if (updatedStates[questionIndex] === null || updatedStates[questionIndex] !== questionId) {
                updatedStates[questionIndex] = questionId;
            } else {
                updatedStates[questionIndex] = null;
            }
            return updatedStates;
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Link copied"))
            .catch((error) => console.error("Failed to copy link: ", error));
    };

    const Questions = getQuestionsBySubject(Question, subject);

    return (
        <div className="choosen2">
            {quizId ? (
                <div className="quiz-id-section">
                    <h2>Copy Test Link For Students</h2>
                    <div className="link">
                        <span>api/learners/v1/take-quiz/{quizId}</span>
                        <span><i class='bx bx-copy' onClick={() => copyToClipboard(`https://Osei.pythonanywhere.com/api/learners/v1/take-quiz/${quizId}`)}></i></span>
                    </div>
                    <span className="pass"><strong>Passcode: {code} </strong><i class='bx bx-copy' onClick={() => copyToClipboard(`${code}`)}></i></span>
                    <Link to={`https://Osei.pythonanywhere.com/api/learners/v1/${filename}`} className="passes">Click Here Download Questions docx</Link>
                </div>
            ) : (
                <div>
                     <h2 style={{ display: showQuestion ? 'block' : 'none' }}>Create Quiz from Existing Question</h2>
                    {testDuration !== null && !showQuestion ? (
                        <>
                            <h4>Select Question</h4>
                            {Questions.map((items, questionIndex) => (
                                <div key={items.id} className="Each-question">
                                    <span
                                        className={`Each-quest-num ${checkedStates[questionIndex] === items.id ? 'checked' : ''}`}
                                        onClick={() => handleCheck(questionIndex, items.id)}>
                                        Question {questionIndex + 1}
                                    </span>
                                    <div className="Each-question-details">
                                        <span className="subject"><strong>Subject: </strong>{items.subject}</span>
                                        <span className="header"><strong>Header: </strong>{items.header}</span>
                                        {items.image && <img src={`https://Osei.pythonanywhere.com/api/learners/v1/${items.image}`} alt={`img-${items.id}`} />}
                                        <p>{items.body}</p>
                                        <div className="options-div">
                                            <span ><strong>A: </strong> {items.options[0]}</span>
                                            <span><strong>B: </strong> {items.options[1]}</span>
                                            <span><strong>C: </strong> {items.options[2]}</span>
                                            <span><strong>D: </strong> {items.options[3]}</span>
                                            <span><strong>E: </strong> {items.options[4]}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="sub-btn" onClick={submitQuestions}>Create Quiz</button>
                        </>
                    ) : (
                        <div className="duration">
                            <form onSubmit={setDetailsList}>
                            <label className="label">Enter subject Name</label>
                                <select className="new-input" name="subject" id="Subject" value={info.subject} onChange={handleChange}>
                                    <option value="">None</option>
                                    {Subject.map((subject) => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                                <label className="label">Test Duration</label>
                                <select className="new-input" name="duration" id="duration" value={info.testDuration} onChange={handleChange}>
                                    <option value="30">30 min</option>
                                    <option value="60">60 min</option>
                                    <option value="90">90 min</option>
                                    <option value="120">120 min</option>
                                </select>
                                <button type="submit" className="submit-Btn">Set Duration</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
    
};

export default AddExisting;