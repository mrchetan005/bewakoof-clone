import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getFilteredProducts = createAsyncThunk('filter/getFilteredProducts', async ({ url }) => {
    try {
        const data = await api.get(url);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const extraReducers = (builder) => {
    builder
        .addCase(getFilteredProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFilteredProducts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.products = [...state.products, ...payload.data];
        })
        .addCase(getFilteredProducts.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
}