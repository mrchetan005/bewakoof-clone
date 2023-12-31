import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "../asyncThunks/cartAsyncThunk";

const initialState = {
    cartItems: [],
    results: 0,
    totalPrice: 0,
    isAddedToCart: false,
    isAlreadyFetchedCart: false,
    message: '',
    loading: false,
    error: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        checkItemIsAddedToCart(state, { payload }) {
            state.isAddedToCart = state.cartItems?.some(({ product }) => product._id === payload);
        }
    },
    extraReducers
});


export const { checkItemIsAddedToCart } = cartSlice.actions;

export default cartSlice.reducer;