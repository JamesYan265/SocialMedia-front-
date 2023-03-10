import { createSlice } from "@reduxjs/toolkit";

//init
const initialState = {
    user: null,
    isFetching: true,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoginStart: (state, action) => {
            console.log('start success');
        },
        LoginSuccess: (state, action) => {
            state.user = action.payload;
            state.isFetching = true;
        },
        LogoutClear: (state, action) => {
            state.user = null;
            state.isFetching = true;
            state.error = false;
        },
        LoginError: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },

    }
})

export const { LoginStart, LoginSuccess, LoginError, LogoutClear } = userSlice.actions
export default userSlice.reducer;