import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/Products/products-slice';
import cartReducer from '../features/Cart/cart-slice';
import userReducer from '../features/User/user-slice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        user: userReducer
    }
});
