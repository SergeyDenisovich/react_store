import { createSlice } from '@reduxjs/toolkit';
import { calcProductCount } from '../../utils/calcProductCount';

const initialState = {
  cart: {},
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      if (!state.cart[product.id]) {
        state.cart[product.id] = [{ ...product, count: 1 }];
      } else {
        const addedProductSelectOptions = JSON.stringify(product.selectedOptions);

        const productExistIndex = state.cart[product.id].findIndex(
          (product) => JSON.stringify(product.selectedOptions) === addedProductSelectOptions
        );

        if (productExistIndex !== -1) {
          state.cart[product.id][productExistIndex].count++;
        } else {
          state.cart[product.id].push({ ...product, count: 1 });
        }
      }

      state.totalCount = calcProductCount(state.cart);
    },

    plusCartItem: (state, action) => {
      const sumProductSelectOptions = JSON.stringify(action.payload.selectedOptions);
      let productIndex = state.cart[action.payload.id].findIndex(
        (product) => JSON.stringify(product.selectedOptions) === sumProductSelectOptions
      );
      state.cart[action.payload.id][productIndex].count++;

      state.totalCount = calcProductCount(state.cart);
    },

    minusCartItem: (state, action) => {
      const sumProductSelectOptions = JSON.stringify(action.payload.selectedOptions);

      let productIndex = state.cart[action.payload.id].findIndex(
        (product) => JSON.stringify(product.selectedOptions) === sumProductSelectOptions
      );

      state.cart[action.payload.id][productIndex].count === 1
        ? state.cart[action.payload.id].splice(productIndex, 1)
        : state.cart[action.payload.id][productIndex].count--;

      state.totalCount = calcProductCount(state.cart);
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addToCart, plusCartItem, minusCartItem } = actions;

export default reducer;
