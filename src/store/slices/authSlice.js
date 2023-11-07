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
    error: null,
    activeAddress: null
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
        addActiveAddress(state, { payload }) {
            if (payload) {
                state.activeAddress = state.user?.address?.find(address => address._id === payload);
            } else {
                state.activeAddress = state.user?.address?.[0];
            }
        },
        resetStatus(state) {
            state.status = 'idle'
        }
    },
    extraReducers,
});

export const { isUserLoggedIn, logOutUser, addActiveAddress, resetStatus } = authSlice.actions;

export default authSlice.reducer;