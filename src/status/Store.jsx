import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import searchReducer from './SearchSlice';
import UserSearchSlice from "./UserSearchSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        user: userReducer,
        userSearch: UserSearchSlice,
    }
});