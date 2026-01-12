import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';
import favoritesSlice from './slices/favoritesSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  product: productSlice,
  favorites: favoritesSlice,
});

export default rootReducer;