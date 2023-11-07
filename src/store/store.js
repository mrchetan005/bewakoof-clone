
import authReducer from './slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import intersectionReducer from './slices/intersectionSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import filterReducer from './slices/filterSlice';
import orderReducer from './slices/orderSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        intersection: intersectionReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer,
        filter: filterReducer,
        search: searchReducer
    }
});

export default store;

