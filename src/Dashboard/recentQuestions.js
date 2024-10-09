import React from 'react';
import { useSelector } from 'react-redux';

const RecentQuestions = () => {
   
    const toggles = useSelector(state => state.toggle);
    const { questions } = toggles;

    return (
        <>
            {Array.isArray(questions) && questions.length > 0 && questions.slice(0, 5).map((items, questionIndex) => (
                <div className="recent" key={items.id}>
                    <span className="quest-num">Question {questionIndex + 1}</span>
                    <span style={{textTransform: 'capitalize'}}><strong>Subject: </strong><span style={{textTransform: 'capitalize'}}>{items.subject}</span></span>
                    <span><strong>Header: </strong><span style={{textTransform: 'capitalize'}}>{items.header}</span></span>
                    <p>{items.body}</p>
                </div>
            ))}
        </>
    );
}

export default RecentQuestions;