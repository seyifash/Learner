import React from 'react';
import PropTypes from 'prop-types';

const QuestionList = ({ currentQuestions, currentPage, itemsPerPage }) => {
    
    return (
        <div>
            {currentQuestions.map((items, index) => {
                const questionNumber = (currentPage - 1) * itemsPerPage + index + 1;
                return (
                    <div className="recent" key={items.id}>
                        {/* Render question details */}
                        <span className="quest-num">Question {questionNumber}</span>
                        <span style={{textTransform: 'capitalize'}}><strong>Subject: </strong><span style={{textTransform: 'capitalize'}}>{items.subject}</span></span>
                        <span><strong>Header: </strong><span style={{textTransform: 'capitalize'}}>{items.header}</span></span>
                        {items.image && <img src={`https://Osei.pythonanywhere.com/api/learners/v1/${items.image}`} alt={`img-${items.id}`} />}
                        <p>{items.body}</p>
                        {items.options.map((option, spanIndex) => (
                            <span
                                key={spanIndex}
                                className="checks"
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

QuestionList.propTypes = {
    currentQuestions: PropTypes.array.isRequired,
}

export default QuestionList;
