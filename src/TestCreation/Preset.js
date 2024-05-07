import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TestActions } from './TestReducer'
import './AddNew.css'

const Preset = () => {

    const test = useSelector(state => state.test);
    const { numOfQuestions , testDuration } = test;
    const dispatch = useDispatch()

    const [preset, setPreset] = useState({
        subject: '',
        numQuestions: 1,
        testDuration: 30
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPreset(prevPreset => ({
            ...prevPreset,
            [name]: name === 'numQuestions' ? parseInt(value) : value
        }));
    };


    const setDetailsList = (event) => {
        event.preventDefault();
        dispatch(TestActions.DurationAndNum({'duration': preset.testDuration, 
        'num': preset.numQuestions, 'sub': preset.subject}))
        if (numOfQuestions > 0 && testDuration > 0) {
            dispatch(TestActions.showForm(true));
        }
    };
  return (
    <div>
        <form onSubmit={setDetailsList}>
            <h2>Set Questions</h2>
            {/* Display input fields to set number of questions and test duration */}
            <label className="label">Number of Questions</label>
            <input
                className="new-input"
                type="number"
                name="numQuestions"
                value={preset.numQuestions}
                onChange={handleInputChange}
            />
            <label className="label">Enter subject Name</label>
            <input
                className="new-input"
                type="text"
                name="subject"
                value={preset.subject}
                onChange={handleInputChange}
            />
            <label className="label">Test Duration</label>
            <select
                className="new-input"
                name="testDuration"
                value={preset.testDuration}
                onChange={handleInputChange}
            >
                <option value="30">30 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
                <option value="120">120 min</option>
            </select>
            <button type="submit" className="submit-details-btn">Set Questions</button>
        </form>
    </div>
  )
}

export default Preset