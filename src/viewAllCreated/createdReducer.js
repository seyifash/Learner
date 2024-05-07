import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const DETAILS_URI = 'http://127.0.0.1:5000/api/learners/v1/quiz-details/';
const QUIZ_URI = 'http://127.0.0.1:5000/api/learners/v1/teacher-quiz/';


const initialState = {
    views: null,
    quizIds: [], 
    quiz: [],
    filename: '',
    score: '',
    quizView: {},
    coursesList: [],
    error: ''
}

export const fetchTeacherQuiz =  createAsyncThunk('get/fetchTeacherQuiz', async (userId) => {
    try{
        const response = await axios.get(QUIZ_URI + userId)
        return response.data;
    }catch(error) {
        return error.message
    }
})

export const fetchTeacherDetails =  createAsyncThunk('get/fetchTeacherDetails', async (id) => {
    try{
        const response = await axios.get(DETAILS_URI + id)
        const data = response.data
        return { 'data':data, 'id': id };
    }catch(error) {
        return error.message
    }
})

const createdSlice = createSlice({
    name: 'created',
    initialState,
    reducers: {
        handleAllQuiz(state){
            state.views = true
        },
        handleView(state, action) {
            state.views = action.payload;
        },
        handleQuizView(state, action) {
            const { key } = action.payload; 
            console.log(key);
            state.quizView[key] = !state.quizView[key];
        },
        handleQuizBack(state, action){
            console.log('i am here');
            const { key } = action.payload; 
            state.quizView[key] = false
        },
        Courses(state, action){
            state.coursesList = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchTeacherQuiz.fulfilled, (state, action) => {
            state.quizIds = action.payload
        })
        .addCase(fetchTeacherQuiz.rejected, (state, action) => {
            state.error = action.payload
        })
        .addCase(fetchTeacherDetails.fulfilled, (state, action) => {
            const payloadData = action.payload && action.payload.data;
            if (payloadData) {
                const { questions, docFile, excelScoreFile } = payloadData;
                const key = action.payload.id;
                state.quiz = questions;
                state.filename = docFile;
                if (excelScoreFile) {
                    state.score = excelScoreFile;
                }
                state.quizView[key] = false;
            }
        })
        .addCase(fetchTeacherDetails.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
})


export const createdActions = createdSlice.actions
export default createdSlice;