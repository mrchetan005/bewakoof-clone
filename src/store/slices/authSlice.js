import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from '../asyncThunks/authAsyncThunk';

const initialState = {
    token: null,
    status: 'idle',
    user: {
        name: '',
        email: '',
        profileImage: '',
    },
    authenticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isUserLoggedIn(state) {
            if (state.token) return;
            const token = window.localStorage.getItem('auth_token_bewkoof');
            if (token) {
                const user = JSON.parse(window.localStorage.getItem('user_bewkoof'));
                state.token = token;
                state.user = { ...user };
                state.authenticated = true;
            }
        },
        logOutUser() {
            window.localStorage.removeItem('auth_token_bewkoof');
            window.localStorage.removeItem('user_bewkoof');
            return initialState;
        },
        resetStatus(state) {
            state.status = 'idle'
        }
    },
    extraReducers,
});

export const { isUserLoggedIn, logOutUser, resetStatus } = authSlice.actions;

export default authSlice.reducer;