import React from 'react';
import { useDispatch } from 'react-redux';
import { TestActions } from '../TestCreation/TestReducer'
import PropTypes from 'prop-types';
import './toDo.css'

const ToDo = ({ questions}) => {
    const dispatch = useDispatch();

    return (
        <div className="To-Do">
            <div className="add-new" onClick={() => dispatch(TestActions.handleCreateNew())}>
                <span className="new">Create New Quiz</span>
                <span className="icon-new"><i className='bx bx-plus'></i></span>
            </div>
            <div className="add-existing" onClick={() => dispatch(TestActions.handleCreateExisting(questions))}>
                <span className="new">Add From existing question</span>
                <span className="icon-new"><i className='bx bx-edit-alt'></i></span>
            </div>
        </div>
    );
}

ToDo.propTypes = {
    questions: PropTypes.array.isRequired
};
export default ToDo;
