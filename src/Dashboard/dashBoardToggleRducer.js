import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const STUDENT_COUNT_URI = '/api/learners/v1/get-students';


const  mode  = localStorage.getItem('mode');
console.log(mode)

const initialState = {
    toggle: false,
    mode: mode,
    activeItem: null,
    questions: [],
    error: '',
    studentCount: 0,
    studentError: '',
    viewAll: false,
    allCourses: false,
    itemsPerPage: 5,
    currentPage: 1,
}

export const fetchQuestion =  createAsyncThunk('get/fetchQuestion', async (axiosPrivate, { rejectWithValue }) => {
    try{
        const response = await axiosPrivate.get('/api/learners/v1/all-questions')
        return response.data;

    }catch(error) {
        console.log(error.message)
        return rejectWithValue(error.message); 
        }    
})

export const fetchStudentCount = createAsyncThunk('student/fetchStudentCount', async (axiosPrivate, { rejectWithValue }) => {
    

      try {
        const response = await axiosPrivate.get(STUDENT_COUNT_URI);
        return response.data.totalStudents;
      } catch (error) {
        console.error('Error fetching student count:', error.message);
        return rejectWithValue(error.message);
      }
    }
  );

const ToggleSlice = createSlice({
    name: 'Toggle',
    initialState,
    reducers: {
        toggleBar(state){
            state.toggle = !state.toggle;
        },
        toggleMode(state, action){
            state.mode = action.payload;
            localStorage.setItem('mode', action.payload);
        },
        toggleActiveItem(state, action){
            state.activeItem = action.payload
        },
        toggleAllQuestion(state){
            state.viewAll = !state.viewAll
        },
        toggleAllCourses(state){
            state.allCourses = !state.allCourses
        },
        handlePageChange(state, action) {
            console.log('i am here')
            console.log(action.payload)
            state.currentPage = action.payload
        }
    },

    extraReducers(builder) {
        builder
        .addCase(fetchQuestion.fulfilled, (state, action) => {
            state.questions = action.payload
        })
        .addCase(fetchQuestion.rejected, (state, action) => {
            state.error = action.payload
        })
        .addCase(fetchStudentCount.fulfilled, (state, action) => {
            state.studentCount = action.payload
            state.studentError = ''
        })
        .addCase(fetchStudentCount.rejected, (state, action) => {
            state.studentError = action.payload
        });;
    }
})

export const toggleActions = ToggleSlice.actions;
export  default ToggleSlice;