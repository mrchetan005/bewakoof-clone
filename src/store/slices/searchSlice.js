import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "../asyncThunks/searchAsyncThunk";

const initialState = {
    searchItems: null,
    searchValue: '',
    loading: false,
    message: '',
    error: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, { payload }) {
            state.searchValue = payload;
        }
    },
    extraReducers
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;