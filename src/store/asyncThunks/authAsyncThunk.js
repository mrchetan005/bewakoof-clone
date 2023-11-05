import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
    try {
        const response = await api.post('/user/login', { ...userData });
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
});

export const signupUser = createAsyncThunk("user/signupUser", async (userData) => {
    try {
        const response = await api.post('/user/signup', { ...userData });
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
});

export const updatePassword = createAsyncThunk("auth/updatePassword", async (userData) => {
    try {
        const response = await api.patch('/user/updateMyPassword', { ...userData });
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
});

export const updateInfo = createAsyncThunk("auth/updateInfo", async (userData) => {
    try {
        const response = await api.patch('/user/updateme', { ...userData });
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
});


export const extraReducers = (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            const { token, data } = action.payload;
            state.token = token;
            state.user = { ...data };
            state.authenticated = true;
            state.loading = false;
            window.localStorage.setItem('auth_token_bewkoof', token);
            window.localStorage.setItem('user_bewkoof', JSON.stringify(data));
        })
        .addCase(loginUser.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Signup User
        .addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            const { token, data } = action.payload;
            state.token = token;
            state.user = data?.user;
            state.authenticated = true;
            state.loading = false;
            window.localStorage.setItem('auth_token_bewkoof', token);
            window.localStorage.setItem('user_bewkoof', JSON.stringify(data?.user));
        })
        .addCase(signupUser.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Update Password
        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = '';
        })
        .addCase(updatePassword.fulfilled, (state, { payload }) => {
            const { token } = payload;
            state.token = token;
            state.loading = false;
            state.status = payload.status;
            window.localStorage.setItem('auth_token_bewkoof', token);
        })
        .addCase(updatePassword.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })
        // ! Update Address
        .addCase(updateInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = '';
        })
        .addCase(updateInfo.fulfilled, (state, { payload }) => {
            const { data } = payload;
            state.user = { ...data.user };
            state.loading = false;
            state.status = payload.status;
            window.localStorage.setItem('user_bewkoof', JSON.stringify(data.user));
        })
        .addCase(updateInfo.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        })

}