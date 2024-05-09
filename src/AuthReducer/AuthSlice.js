import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const POST_URI = 'http://127.0.0.1:5000/api/learners/v1/sign-up';
const GET_USER_URI = 'http://127.0.0.1:5000/api/learners/v1/login';

const storedUserId = localStorage.getItem('userId');

const initialState = {
    loading: false,
    userId: storedUserId ? storedUserId : null,
    error: '',
    isLoggedIn: !!storedUserId, 
    success: false, 
    teacherImage: null
}

export const createUser = createAsyncThunk('userId/createUser', async (formData) => {
    try{
        const response = await axios.post(POST_URI, JSON.stringify(formData), {
            headers:  {"Content-Type": 'application/json' }
        });
        const { teacherId, isValid } = response.data;
        if (isValid) {
            localStorage.setItem('userId', teacherId)
            return teacherId;
        } else {
            throw new Error("User registration failed");
        }
    }catch(err){
        return err.message;
    }
})

export const getUser = createAsyncThunk('userId/getUser', async (formData) => {
    try{
        const response = await axios.post(GET_USER_URI, JSON.stringify(formData), {
            headers: {"Content-Type" : 'application/json'}
            });

        const { teacherId, isValid, teacherImage } = response.data;
        if (isValid) {
            localStorage.setItem('userId', teacherId)
            return { teacherId, teacherImage};
        } else {
            throw new Error("User does not exist");
        }

    } catch(err){
        return err.message;
    }
})

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        loginUser(state, action){
            state.isLoggedIn = action.payload;
        }
        ,
        logOut(state) {
                localStorage.removeItem('userId')
                state.isLoggedIn =  false
                state.userId = null
        },
        setErrorMsg(state, action) {
            state.error = action.payload
        },
        updateImage(state, action) {
            state.teacherImage = action.payload
        }

    },
    extraReducers(builder){
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.userId = action.payload
            state.success = true
            state.error = ''
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.userId = null
            state.isLoggedIn =  false
            state.success = false
            state.error = action.payload
        })
        .addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            const {teacherId , teacherImage} = action.payload
            state.loading = false;
            state.userId = teacherId;
            state.teacherImage = teacherImage
            state.success = true
            state.error = ''
        })
        .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const authActions = AuthSlice.actions;
export default AuthSlice;