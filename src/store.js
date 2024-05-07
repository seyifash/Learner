import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginReducer/loginVerificationSlice";
import AuthSlice from "./AuthReducer/AuthSlice";
import ToggleSlice from "./Dashboard/dashBoardToggleRducer";
import TestSlice from "./TestCreation/TestReducer";
import createdSlice from "./viewAllCreated/createdReducer";

const store = configureStore({
    reducer: {
        loginVerify: loginSlice.reducer,
        auth: AuthSlice.reducer,
        toggle: ToggleSlice.reducer,
        test: TestSlice.reducer,
        created: createdSlice.reducer
    }
})
export default store;