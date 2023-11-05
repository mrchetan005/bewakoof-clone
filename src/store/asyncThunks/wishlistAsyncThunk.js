import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async () => {
    try {
        const data = await api.get(`/ecommerce/wishlist`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId) => {
    if (productId) {
        try {
            const data = await api.patch(`/ecommerce/wishlist/${productId}`, { productId });
            return data?.data;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (productId) => {
    try {
        const data = await api.delete(`/ecommerce/wishlist/${productId}`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const removeAllFromWishlist = createAsyncThunk('wishlist/removeAllFromWishlist', async () => {
    try {
        const data = await api.delete(`/ecommerce/wishlist`);
        return data?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});


export const extraReducers = (builder) => {
    builder
        // ! Get Wishlist
        .addCase(getWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getWishlist.fulfilled, (state, { payload }) => {
            state.isAlreadyFetchedWishlist = true;
            state.results = payload?.results;
            state.wishlistItems = payload?.data?.items;
            state.loading = false;
        })
        .addCase(getWishlist.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Add To Wishlist
        .addCase(addToWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToWishlist.fulfilled, (state, { payload }) => {
            state.results = payload?.results;
            state.wishlistItems = payload?.data?.items;
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(addToWishlist.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Remove From Wishlist
        .addCase(removeFromWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromWishlist.fulfilled, (state, { payload }) => {
            state.results = payload?.results;
            state.wishlistItems = payload?.data?.items;
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(removeFromWishlist.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Remove All From Wishlist
        .addCase(removeAllFromWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeAllFromWishlist.fulfilled, (state, { payload }) => {
            state.results = payload?.results;
            state.wishlistItems = payload?.data?.items;
            state.message = payload?.message;
            state.loading = false;
        })
        .addCase(removeAllFromWishlist.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
}
