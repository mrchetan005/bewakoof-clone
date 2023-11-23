import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { LIMIT_PER_PAGE } from "../../constants";

export const getFilteredProducts = createAsyncThunk('filter/getFilteredProducts', async ({ url, page }) => {
    try {
        const data = await api.get(url);
        return { data: data?.data, page };
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
            if (payload.page === 1) {
                state.products = payload?.data?.data;
            } else {
                state.products = [...state.products, ...payload.data.data];
            }
        })
        .addCase(getFilteredProducts.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
}