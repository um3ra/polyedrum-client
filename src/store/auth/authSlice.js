import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isLoggedIn: false,
        email: null,
    },
    reducers: {
        setAuthData: (state, {payload}) => {
            state.token = payload;
            state.isLoggedIn = true;
        },
        resetAuthData: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
        setMessage: (state, {payload}) => {
            state.message = payload;
        }
    },
})

export default authSlice.reducer;

export const {setMessage, setAuthData, resetAuthData} = authSlice.actions;