import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getOrder = createAsyncThunk('order/getOrder', async () => {
    try {
        const data = await api.get(`/ecommerce/order`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const convertCartToOrder = createAsyncThunk('order/convertCartToOrder', async ({ address, addressType }) => {
    try {
        const data = await api.post(`/ecommerce/order/convertCartToOrder`, { addressType, address });
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});


export const extraReducers = (builder) => {
    builder
        // ! Get Order
        .addCase(getOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrder.fulfilled, (state, { payload }) => {
            state.isAlreadyFetchedOrder = true;
            state.results = payload?.results;
            state.orderItems = payload?.data;
            state.loading = false;
        })
        .addCase(getOrder.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Add To Order
        .addCase(convertCartToOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(convertCartToOrder.fulfilled, (state, { payload }) => {
            state.status = payload.status;
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(convertCartToOrder.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
}
