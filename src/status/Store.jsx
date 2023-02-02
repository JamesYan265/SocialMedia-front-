import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import searchReducer from './SearchSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
        user: userReducer,
    }
});