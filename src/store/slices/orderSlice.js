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
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers
});


// export const {  } = orderSlice.actions;

export default orderSlice.reducer;