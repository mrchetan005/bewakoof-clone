

import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from '../asyncThunks/wishlistAsyncThunk';


const initialState = {
    wishlistItems: [],
    results: 0,
    message: '',
    isAlreadyFetchedWishlist: false,
    loading: false,
    error: null,
}
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {

    },
    extraReducers,
})


export default wishlistSlice.reducer;