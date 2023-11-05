import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getOrder = createAsyncThunk('order/getOrder', async () => {
    try {
        const data = await api.get(`/ecommerce/order`);
        // console.log(data);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const addOrder = createAsyncThunk('order/addOrder', async ({ productId, quantity }) => {
    try {
        const data = await api.patch(`/ecommerce/order/${productId}`, { quantity: Number(quantity) });
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

// export const removeFromOrder = createAsyncThunk('order/removeFromOrder', async (productId) => {
//     try {
//         const data = await api.delete(`/ecommerce/order/${productId}`);
//         return data?.data;
//     } catch (error) {
//         return Promise.reject(error?.response?.data);
//     }
// });

// export const removeAllFromOrder = createAsyncThunk('order/removeAllFromOrder', async () => {
//     try {
//         const data = await api.delete(`/ecommerce/order`);
//         return data?.data;
//     } catch (error) {
//         return Promise.reject(error?.response?.data);
//     }
// });


export const extraReducers = (builder) => {
    builder
        // ! Get Order
        .addCase(getOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrder.fulfilled, (state, { payload }) => {
            console.log('payload', payload);
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
        .addCase(addOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addOrder.fulfilled, (state, { payload }) => {
            // state.results = payload?.results;
            // state.orderItems = payload?.data?.items;
            // state.totalPrice = payload?.data?.totalPrice;
            console.log('payload', payload);
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(addOrder.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
    // // ! Remove From Order
    // .addCase(removeFromOrder.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    // })
    // .addCase(removeFromOrder.fulfilled, (state, { payload }) => {
    //     state.results = state.results - 1;
    //     state.orderItems = payload?.data?.items;
    //     state.totalPrice = payload?.data?.totalPrice;
    //     state.message = payload?.message;
    //     state.loading = false;
    // })
    // .addCase(removeFromOrder.rejected, (state, { error }) => {
    //     state.loading = false;
    //     state.error = error.message;
    // })
    // // ! Remove All From Order
    // .addCase(removeAllFromOrder.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    // })
    // .addCase(removeAllFromOrder.fulfilled, (state, { payload }) => {
    //     state.results = payload?.results;
    //     state.orderItems = payload?.data?.items;
    //     state.totalPrice = payload?.data?.totalPrice;
    //     state.message = payload?.message;
    //     state.loading = false;
    // })
    // .addCase(removeAllFromOrder.rejected, (state, { error }) => {
    //     state.loading = false;
    //     state.error = error.message;
    // })
}
