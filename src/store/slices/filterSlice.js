import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from '../asyncThunks/filterAsyncThunk';

const initialState = {
    products: [],
    filter: {},
    sort: 0,
    clearedFilters: true,
    loading: false,
    error: null
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilters(state, { payload }) {
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
        setFilterFromParams(state, { payload }) {
            if (payload?.sort) {
                const { sort, ...remainingFilters } = payload;
                state.sort = sort.join('');
                state.filter = { ...remainingFilters };
            } else {
                state.filter = { ...payload };
            }
        },
        setProducts(state, { payload }) {
            state.products = [...state.products, ...payload];
        },
        sortProducts(state, { payload }) {
            state.sort = payload;
            state.clearedFilters = false;
        },
        clearAllFilters() {
            return initialState;
        },
        clearProducts(state) {
            state.products = [];
        }
    },
    extraReducers,
});

export const { setFilters, clearAllFilters, sortProducts, setFilterFromParams, setProducts, clearProducts } = filterSlice.actions;

export default filterSlice.reducer;


// useEffect(() => {
//     const gender = searchParams.get('gender');
//     const subCategory = searchParams.get('category');
//     const color = searchParams.get('color');
//     const size = searchParams.get('size');
//     const brand = searchParams.get('brand');
//     const sellerTag = searchParams.get('sellerTag');
//     const sort = searchParams.get('sort');
//     if (gender) filterRef.current.gender = gender;
//     if (sellerTag) filterRef.current.sellerTag = sellerTag;

//     if (subCategory) filterRef.current.subCategory = subCategory.split('_');
//     if (color) filterRef.current.color = color.split('_');
//     if (size) filterRef.current.size = size.split('_');
//     if (brand) filterRef.current.brand = brand.split('_');

//     setFilter(filterRef.current);

// }, [searchParams]);