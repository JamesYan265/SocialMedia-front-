import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import searchReducer from './SearchSlice';
import UserSearchSlice from "./UserSearchSlice";
import SendSlice from "./SendSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        user: userReducer,
        userSearch: UserSearchSlice,
        send: SendSlice,
    }
});