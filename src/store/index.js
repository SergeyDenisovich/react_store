import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import currencyReducer from './slices/currencySlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    currency: currencyReducer,
  },
});
