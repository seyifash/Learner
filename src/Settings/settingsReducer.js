import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { refreshAccessToken }  from '../Api/useRefreshTokenHook';

const DATA_URI = 'api/learners/v1/teacher-details/';
const PWD_URI = 'api/learners/v1/update-password/';
const NAME_URI = 'api/learners/v1/update-name/';
const IMAGE_URI = 'api/learners/v1/save-teacherimage/';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9\s-_]{1,38}[a-zA-Z0-9]$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const initialState = {
    userRef: null,
    errRef: null,
    image: null,
    editImage: false,
    imageExist: null,
    saved: false,
    updatedImage: null,
    settingsClickable: null,
    email: '',
    imageSuccess: '',
    validName: false,
    validPwd: false,
    pwdFocus: false,
    errMsg: '',
    success: false,
    success2: false,
    errMsg2: '',
    matchFocus: false,
    validMatch: false,
    firstName: '',
    lastName:'',
    errorImage: '',
    showNamePop: false,
    showPwdPop: false,
    userFocus: false
  };

export const fetchData = createAsyncThunk(
      'setting/fetchData',
      async ({userId, axiosPrivate}, { rejectWithValue }) => {

        
        try {
          const response = await axiosPrivate.get(DATA_URI + userId);
          return response.data;
        } catch (error) {
          console.log('Error fetching data:', error.message);
          return rejectWithValue(error.message); 
        }
      }
  );
  
export const submitPwd = createAsyncThunk(
    'setting/submitPwd',
    async ({ userId, oldPwd, pwd, axiosPrivate }, {rejectWithValue}) => {
      let error = '';
      let success = '';
      

      try {
        const response = await axiosPrivate.put(PWD_URI + userId, {
          initialPassword: oldPwd,
          newPassword: pwd,
        });
  
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          success = data.status;
          return success
        } else {
          if (response.status === 400) {
            error = 'Password Empty';
            return error
          } else {
            error = 'Incorrect Password';
            return error
          }
        }
      } catch (err) {
       
        error = 'No Server Response';
        return error 
      }
    }
  );

  export const saveUpdateImage = createAsyncThunk(
    'setting/saveUpdateImage',
    async ({ userId, image, axiosPrivate }, { rejectWithValue }) => {
        let imagePath = null;
        let success = '';
        let errors = '';
        const formData = new FormData();
        formData.append('image', image);

        console.log('Request URL:', IMAGE_URI + userId);
        console.log('Image to upload:', image);

        try {
            const response = await axiosPrivate.put(IMAGE_URI + userId, formData);

            if (response.status === 200) {
                const data = response.data;
                imagePath = data.teacherImage;
                success = data.status_code;
                return { imagePath, success };
            } else {
                const errorData = response.data;
                errors = errorData.description || 'Server Error';
                return rejectWithValue(errors);
            }
        } catch (err) {
            console.error('Error:', err);
            return rejectWithValue(err.response?.data?.description || 'No Server Response');
        }
    }
);

 
  export const submitName = createAsyncThunk(
    'setting/submitName',
    async ({ userId, newName, axiosPrivate }, { rejectWithValue }) => {
      let first = '';
      let last = '';
      try {
        console.log("i am good")
        const response = await axiosPrivate.put(NAME_URI + userId, { newName });
  
        if (response.status === 200) {
          [last, first] = newName.split(' ');
          return { last, first };
        } else if (response.status === 404) {
          return rejectWithValue('UserName Taken');
        } else {
          return rejectWithValue('Failed to update name');
        }
      } catch (err) {
        console.error('Error:', err);
        return rejectWithValue('No Server Response'); 
      }
    }
  );
  
  
  
const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
          setImage(state, action) {
            state.image = action.payload
            state.saved = true
          },
          updateState(state) {
            state.imageExist = null;
            state.editImage = false;
            state.saveImage = false;
          },
          setValidPwd(state, action){
            const result = PWD_REGEX.test(action.payload.pwd)
            state.validPwd = result
            const match = action.payload.pwd ===  action.payload.matchPwd
            state.validMatch = match;
        },
        setValidName(state, action) {
            const result = USER_REGEX.test(action.payload)
            state.validName = result
        },
        toHandleEdit(state, action) {
            state.editImage = !state.editImage;
            state.settingsClickable = false;
        },
        setHandleDisableEdit(state, action){
            if(state.editImage){
            state.editImage = false; 
            }
            state.saveImage = false
        },
        Clickable(state, action) {
            state.settingsClickable = action.payload
        },
        showNamePop(state){
            state.showNamePop = !state.showNamePop
        },
        showPwdPop(state){
          state.showPwdPop = !state.showPwdPop
      },
        updateErrMsg(state, action){
            state.errMsg = action.payload
        },
        updateImageSucc(state, action){
            state.imageSuccess = ''
        },
        updateImageError(state){
            state.errorImage = ''
        },
        onUserFocus(state, action) {
            state.userFocus = action.payload
        },
        onPwdFocus(state, action) {
            state.pwdFocus = action.payload
        },
        onMatchFocus(state, action) {
            state.matchFocus = action.payload
        },
        timeOut1(state){
          state.success2 = false
          state.showPopUp = false
        },
        timeOut2(state){
          state.success = false
          state.showNamePop = false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
          const data = action.payload;
          if (data.teacher_image) {
            state.imageExist = data.teacher_image;
          }
          state.firstName = data.first_name;
          state.lastName = data.last_name;
          state.email = data.email;
        })
        .addCase(submitName.fulfilled, (state, action) => {
            const { first, last, error } = action.payload;
            if(first || last){ 
            state.firstName = first
            state.lastName = last
            state.success = true
            }
            state.errMsg = error    
        })
        .addCase(submitName.rejected, (state, action) => {
            state.errMsg = action.payload
        })
        .addCase(submitPwd.fulfilled, (state, action) => {
            console.log(action.payload)
            if(action.payload){
            state.success2 = true;
            }
        })
        .addCase(submitPwd.rejected, (state, action) => {
            state.errMsg = action.payload;
        }) 
        .addCase(saveUpdateImage.fulfilled, (state, action) => {
            const { imagePath, success, errors } = action.payload;
            state.updatedImage = imagePath;
            state.imageSuccess = success;
            state.errorImage = errors;
          });
      },
  });


export const settingActions = settingSlice.actions
export default settingSlice
