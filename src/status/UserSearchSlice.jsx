import { createSlice } from "@reduxjs/toolkit";

//init
const initialState = {
    searchStatus: false,
};

const UserSearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        UserSearchStart: (state, action) => {
            state.searchStatus = true;
        },
        UserSearchEnd: (state, action) => {
            state.searchStatus = false;
        },
    }
})

export const { UserSearchStart, UserSearchEnd } = UserSearchSlice.actions
export default UserSearchSlice.reducer;