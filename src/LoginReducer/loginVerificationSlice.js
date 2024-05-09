import { createSlice } from '@reduxjs/toolkit';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialState = {
    validFirstName: false,
    firstNameFocus: false,
    validLastName: false,
    lastNameFocus: false,
    validEmail: false,
    emailFocus: false,
    validPwd: false,
    pwdFocus: false,
    validMatch: false,
    matchFocus: false,
    instFocus: false,
  };
const loginSlice = createSlice({
    name: 'loginVerification',
    initialState,
    reducers: {
            setFirstNameValid(state, action) {
            const result = USER_REGEX.test(action.payload)
            state.validFirstName = result
          },
          setLastNameValid(state, action) {
            const result = USER_REGEX.test(action.payload)
            state.validLastName = result
        },
          setValidEmail(state, action) {
                const result = EMAIL_REGEX.test(action.payload)
                state.validEmail = result;
        },
        setValidPwd(state, action){
                const result = PWD_REGEX.test(action.payload.pwd)
                state.validPwd = result
                const match = action.payload.pwd ===  action.payload.matchPwd
                state.validMatch = match;
        },
        onFirstFocus(state, action) {
            state.firstNameFocus = action.payload
        },
        onLastFocus(state, action){
            state.lastNameFocus = action.payload
        },
        onEmailFocus(state, action){
            state.emailFocus = action.payload
        },
        onPwdFocus(state, action) {
            state.pwdFocus = action.payload
        },
        onMatchFocus(state, action) {
            state.matchFocus = action.payload
        },
        onInstFocus(state, action) {
            state.instFocus = action.payload
        },
    }
})

export const loginActions = loginSlice.actions;
export default loginSlice; 