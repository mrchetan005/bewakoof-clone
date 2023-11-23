import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getCart = createAsyncThunk('cart/getCart', async () => {
    try {
        const data = await api.get(`/ecommerce/cart`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity, size }) => {
    try {
        const data = await api.patch(`/ecommerce/cart/${productId}`, { quantity: Number(quantity), size });
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
    try {
        const data = await api.delete(`/ecommerce/cart/${productId}`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const removeAllFromCart = createAsyncThunk('cart/removeAllFromCart', async () => {
    try {
        const data = await api.delete(`/ecommerce/cart`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});


export const extraReducers = (builder) => {
    builder
        // ! Get Cart
        .addCase(getCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCart.fulfilled, (state, { payload }) => {
            state.isAlreadyFetchedCart = true;
            state.results = payload?.results;
            state.totalPrice = payload?.data?.totalPrice;
            state.cartItems = payload?.data?.items;
            state.loading = false;
        })
        .addCase(getCart.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Add To Cart
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, { payload }) => {
            state.results = payload?.results;
            state.cartItems = payload?.data?.items;
            state.totalPrice = payload?.data?.totalPrice;
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(addToCart.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Remove From Cart
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, { payload }) => {
            state.results = state.results - 1;
            state.cartItems = payload?.data?.items;
            state.totalPrice = payload?.data?.totalPrice;
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(removeFromCart.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Remove All From Cart
        .addCase(removeAllFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeAllFromCart.fulfilled, (state, { payload }) => {
            state.results = payload?.results;
            state.cartItems = payload?.data?.items;
            state.totalPrice = payload?.data?.totalPrice;
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(removeAllFromCart.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
}
