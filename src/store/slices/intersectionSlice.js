import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isIntersecting: false
}

const intersectionSlice = createSlice({
    name: 'intersection',
    initialState,
    reducers: {
        setIsIntersecting(state, action) {
            state.isIntersecting = action.payload;
        }
    }
});

export const { setIsIntersecting } = intersectionSlice.actions;
export default intersectionSlice.reducer;