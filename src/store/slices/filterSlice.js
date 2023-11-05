import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from '../asyncThunks/authAsyncThunk';

const initialState = {
    filter: {
        sellerTag: 'top rated'
    },
    sort: 0,
    previousFilter: {},
    clearedFilters: true,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilters(state, { payload }) {
            state.previousFilter = state.filter;

            const { name, value } = payload;

            // ? I want to remove sellerTag for brands

            if (name === 'brand') {
                delete state.filter['sellerTag'];
            }

            let optionValue, deleteFilter = false;
            if (state.filter[name]) {
                if (Array.isArray(state.filter[name])) {
                    // ! Toggle value
                    const index = state.filter[name].indexOf(value);
                    if (index === -1) {
                        // ? add to an array
                        optionValue = [...state.filter[name], value];
                    } else {
                        // ? delete from an array
                        state.filter[name].splice(index, 1);

                        // ? if array is empty, delete it from filter object
                        if (state.filter[name].length === 0) {
                            deleteFilter = true;
                            delete state.filter[name];
                        }
                        optionValue = state.filter[name];
                    }
                } else {
                    // ! For mandatory fields, keeping it non array
                    optionValue = value;
                }
            } else {
                optionValue = [value];
            }

            !deleteFilter && (state.filter[name] = optionValue);

            state.clearedFilters = false;
        },
        setAllFilters(state, { payload }) {
            console.log('payload', payload);
            state.previousFilter = state.filter;
            state.clearedFilters = false;
            state.filter = { ...payload };
        },
        sortProducts(state, { payload }) {
            state.sort = payload;
            state.clearedFilters = false;
        },
        clearAllFilters() {
            return initialState;
        }
    },
    extraReducers,
});

export const { setFilters, setAllFilters, clearAllFilters, sortProducts } = filterSlice.actions;

export default filterSlice.reducer;