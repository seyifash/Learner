import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TestActions, createNewQuiz } from './TestReducer';
import './AddNew.css';
import QuestionForm from './QuestionForm';
import { Link } from 'react-router-dom';
import Preset from './Preset'
import './AddNew.css';

const AddNew = () => {
    const userId = useSelector(state => state.auth.userId);
    const test = useSelector(state => state.test);
    const {numOfQuestions, subject , testDuration, showForm, quizId, code, filename, testQuestions} = test;
    const dispatch = useDispatch()

    const handleQuestionChange = (questionDetails, questionNumber) => {
        const updatedQuestions = [...testQuestions];
        updatedQuestions[questionNumber - 1] = { ...questionDetails };
        dispatch(TestActions.NewQuestion(updatedQuestions));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createNewQuiz({ userId, questions: testQuestions, testDuration, subject }))
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Link copied"))
            .catch((error) => console.error("Failed to copy link: ", error));
    };

    return (
        <div className="choosen">
            {quizId ? (
                <div className="quiz-id-section">
                    <h2>Copy Test Link For Students</h2>
                    <div className="link">
                        <span>api/learners/v1/take-quiz/{quizId}</span>
                        <span><i class='bx bx-copy' onClick={() => copyToClipboard(`api/learners/v1/take-quiz/${quizId}`)}></i></span>
                    </div>
                    <span className="pass">PassCode: {code} <i class='bx bx-copy' onClick={() => copyToClipboard(`${code}`)}></i></span>
                    <Link to={`http://127.0.0.1:5000/api/learners/v1/${filename}`} className="passes">Download Questions docx</Link>
                </div>
            ) : (
                <div>
                    <h2 className="my-h2">Create New Quiz</h2>
                    {showForm ? (
                        <div>
                            <h2 className="h2">Note that all fields with an asterisk are compulsory</h2>
                            <form onSubmit={handleSubmit}>
                                {Array.from({ length: numOfQuestions }).map((_, index) => (
                                    <QuestionForm key={index + 1} questionNumber={index + 1} onChange={handleQuestionChange} />
                                ))}
                                <button type="submit" className="submit-details-btn">Submit</button>
                            </form>
                        </div>
                    ) : (
                    <div className="duration">
                        <Preset />
                    </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddNew;