import { createSlice } from "@reduxjs/toolkit";

//init
const initialState = {
    SendStatus: false,
};

const SendSlice = createSlice({
    name: 'send',
    initialState,
    reducers: {
        SendAction: (state, action) => {
            state.SendStatus = !state.SendStatus;
        },
    }
})

export const { SendAction } = SendSlice.actions
export default SendSlice.reducer;