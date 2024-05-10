import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const QUESTION_URI = 'http://127.0.0.1:5000/api/learners/v1/all-questions';
const CREATE_NEW_URI = 'http://127.0.0.1:5000/api/learners/v1/create-new/';
const CREATE_EXISTING_URI = 'http://127.0.0.1:5000/api/learners/v1/create-existing/';


const initialState = {
    questionsDb: [],
    testQuestions: [],
    createNew: null,
    quizId: '',
    code: '',
    showForm: false,
    showQuestion: true,
    testDuration: 30,
    subject: '',
    Question: [],
    error: '',
    filename: null,
    numOfQuestions: 1,
}

export const createNewQuiz = createAsyncThunk('quiz/createNewQuiz', 
    async ({ userId, questions, testDuration, subject } ) => {
        try {
            const formData = new FormData();
            formData.append('questions', JSON.stringify(questions));
            formData.append('duration', testDuration);
            formData.append('Subject', subject)

            questions.forEach((question, index) => {
                if (question.image instanceof File) {
                    formData.append(`image${index}`, question.image);
                }
            });

            const response = await axios.post(CREATE_NEW_URI + userId,  formData);
            if (response.status !== 200) {
                throw new Error("Creating question failed");
            }
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);

export const fetchTestQuestion =  createAsyncThunk('get/fetchTestQuestion', async () => {
    try{
        const response = await axios.get(QUESTION_URI)
        return response.data;
    }catch(error) {
        return error.message
    }
})

export const submitQuestion = createAsyncThunk('quiz/submitQuestion', 
    async ({ userId, questionIds, testDuration, subject }) => {
    try {
        const response = await axios.post(`${CREATE_EXISTING_URI}${userId}`, {
            ids: questionIds,
            duration: testDuration,
            Subject: subject
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error("Error posting Id");
        }

        return response.data;
    } catch (error) {
        return error.message;
    }
});

const TestSlice = createSlice({
    name: 'create',
    initialState,
    reducers: {
        handleCreateNew (state){
            state.createNew = true
            state.testQuestions = []
            state.quizId = ''
            state.code = ''
            state.showForm = false
            state.quizId = ''
        },
        handleCreateExisting(state, action){
            state.showQuestion = true;
            state.testDuration = 30;
            state.Question = action.payload
            state.createNew = false;
            state.quizId = ''
        },
        DurationAndNum(state, action) {
            state.testDuration = action.payload.duration;
            state.numOfQuestions = action.payload.num;
            state.subject = action.payload.sub;
        },
        showForm(state, action) {
            state.showForm = action.payload
        },
        NewQuestion(state, action) {
            state.testQuestions = action.payload;
        },
        showQuestion(state, action) {
            state.showQuestion = action.payload
        }

        },
    extraReducers(builder) {
        builder
        .addCase(fetchTestQuestion.fulfilled, (state, action) => {
            state.questionsDb = action.payload
        })
        .addCase(fetchTestQuestion.rejected, (state, action) => {
            state.error = action.payload
        })
        .addCase(createNewQuiz.fulfilled, (state, action) => {
            const { quiz_id, code, docFile } = action.payload;
            state.quizId = quiz_id;
            state.code = code;
            state.numOfQuestions = 1;
            state.testQuestions = [];
            state.showForm = false;
            state.filename = docFile;
        })
        .addCase(createNewQuiz.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(submitQuestion.fulfilled, (state, action) => {
            const { quiz_id, code, docFile } = action.payload;
            state.quizId = quiz_id;
            state.code = code;
            state.filename = docFile;
        })
        .addCase(submitQuestion.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
})

export const TestActions = TestSlice.actions;
export default TestSlice;