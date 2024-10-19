import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const POST_URI = 'https://Osei.pythonanywhere.com/api/learners/v1/sign-up';
const GET_USER_URI = 'https://Osei.pythonanywhere.com/api/learners/v1/login';

const storedUserId = localStorage.getItem('userId');
const storedTeacherImage = localStorage.getItem('teacherImage');
const storedCsrfToken = sessionStorage.getItem('csrf_token')
const storedMode = localStorage.getItem('mode')

const initialState = {
    loading: false,
    userId: storedUserId ? storedUserId : null,
    error: '',
    isLoggedIn: !!storedUserId, 
    success: false, 
    teacherImage: storedTeacherImage ? storedTeacherImage : null,
    csrfToken: storedCsrfToken ? storedCsrfToken : null,
    mode: storedMode ? storedMode : 'light'
}

export const createUser = createAsyncThunk('userId/createUser', async (formData) => {
    try{
        const response = await axios.post(POST_URI, JSON.stringify(formData), {
            headers:  {"Content-Type": 'application/json' }
        });
        const { teacherId, isValid, theme, csrf_access_token  } = response.data;
        if (isValid) {
            localStorage.setItem('userId', teacherId)
            sessionStorage.setItem('csrf_token', csrf_access_token )
            localStorage.setItem('mode', theme)
            return { teacherId, csrf_access_token } 
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
            headers: {"Content-Type" : 'application/json'},
            withCredentials: true
            });
        const { teacherId, isValid, teacherImage,theme, csrf_access_token } = response.data;
        
        if (isValid) {
           localStorage.setItem('userId', teacherId)
            localStorage.setItem('teacherImage', teacherImage);
            sessionStorage.setItem('csrf_token', csrf_access_token );
            localStorage.setItem('mode', theme)
            console.log(teacherImage)
            return { teacherId, teacherImage, csrf_access_token , theme};
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
                localStorage.removeItem('teacherImage')
                sessionStorage.removeItem('csrf_token')
                localStorage.setItem('logoutEvent', Date.now());
                state.isLoggedIn =  false
                state.userId = null
                state.teacherImage = null;
                state.csrfToken = null;
        },
        setErrorMsg(state, action) {
            state.error = action.payload
        },
        updateImage(state, action) {
            state.teacherImage = action.payload
            localStorage.setItem('teacherImage', action.payload);
        },
        updateAccessToken(state, action){
            state.csrfToken = action.payload
            localStorage.setItem('csrf_token', action.payload)
        }

    },
    extraReducers(builder){
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            if(action.payload) {
                state.isLoggedIn = true;
            }
            const {teacherId , csrf_access_token , theme} = action.payload
            state.userId = teacherId
            state.csrfToken = csrf_access_token 
            state.mode = theme
            state.success = true
            state.error = ''
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.userId = null
            state.csrfToken = null
            state.isLoggedIn =  false
            state.success = false
            state.error = action.payload
            state.theme = 'light'
        })
        .addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            const {teacherId , teacherImage, csrf_access_token , theme} = action.payload
            state.loading = false;
            state.userId = teacherId;
            state.csrfToken = csrf_access_token 
            state.mode = theme
            if(teacherId){
                state.isLoggedIn = true
            }
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