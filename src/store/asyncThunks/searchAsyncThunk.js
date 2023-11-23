import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const searchItems = createAsyncThunk('search/searchItems', async (searchQuery) => {
    try {
        const data = await api.get(`/ecommerce/clothes/products?search={"name":"${searchQuery}"}&limit=6`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const extraReducers = (builder) => {
    builder
        .addCase(searchItems.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        .addCase(searchItems.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.searchItems = payload?.data;
        })
        .addCase(searchItems.rejected, (state, { error }) => {
            state.loading = false;
            state.searchItems = null;
            state.error = error.message;
        })
}