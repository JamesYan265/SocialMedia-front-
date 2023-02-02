import { createSlice } from "@reduxjs/toolkit";

//init
const initialState = {
    searchContent: null,
    searchStatus: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        Searching: (state, action) => {
            state.searchContent = action.payload;
            state.searchStatus = true;
        },
        Searched: (state) => {
            state.searchContent = null;
            state.searchStatus = false;
        },
    }
})

export const { Searching, Searched } = searchSlice.actions
export default searchSlice.reducer;