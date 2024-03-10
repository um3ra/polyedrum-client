import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "../../@types/userType";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isLoggedIn: false,
        email: null
    } as IAuthState,

    reducers: {
        setAuthData: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
            state.isLoggedIn = true;
        },
        resetAuthData: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        }
    }
});

export default authSlice.reducer;

export const { setAuthData, resetAuthData } = authSlice.actions;
