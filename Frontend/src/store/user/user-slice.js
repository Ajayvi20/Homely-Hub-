import {createSlice} from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        getSignupRequest: (state) => {
            state.loading = true;


        },
        getSignupDetails: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        getLoginRequest: (state) => {
            state.loading = true;
        },
        getLoginDetails: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        getError:(state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getCurrentRequest: (state) => {
            state.loading = true;
        },
        getUpdateRequest: (state) => {
            state.loading = true;
        },
        getCurrentUser: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        getLogoutRequest: (state) => {
            state.loading = true;
        },
        getLogout: (state,action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = false;
        },
        getPasswordRequest: (state) => {
            state.loading = true;
        },
        getPasswordSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        }
        
    },
})

export const userActions = userSlice.actions;
export default userSlice.reducer;