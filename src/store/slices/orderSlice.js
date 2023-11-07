import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "../asyncThunks/orderAsyncThunk";

const initialState = {
    orderItems: [],
    results: 0,
    totalPrice: 0,
    isAlreadyFetchedOrder: false,
    message: '',
    loading: false,
    error: null,
    status: 'idle'
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = 'idle';
        }
    },
    extraReducers
});


export const { resetStatus } = orderSlice.actions;

export default orderSlice.reducer;