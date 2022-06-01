import { createSlice } from '@reduxjs/toolkit';
import { calcProductCount } from '../../utils/calcProductCount';

const initialState = {
  cart: {},
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!state.cart[action.payload.id]) {
        state.cart[action.payload.id] = [{ ...action.payload, count: 1 }];
      } else {
        const addedProductSelectOptions = JSON.stringify(action.payload.selectedOptions);
        let isProductExist = false;

        state.cart[action.payload.id].forEach((product) => {
          if (JSON.stringify(product.selectedOptions) === addedProductSelectOptions) {
            isProductExist = true;
            product.count++;
          }
        });

        if (!isProductExist) {
          state.cart[action.payload.id].push({ ...action.payload, count: 1 });
        }
      }

      state.totalCount = calcProductCount(state.cart);
    },

    plusCartItem: (state, action) => {
      const sumProductSelectOptions = JSON.stringify(action.payload.selectedOptions);

      state.cart[action.payload.id].forEach((product) => {
        if (JSON.stringify(product.selectedOptions) === sumProductSelectOptions) {
          product.count++;
        }
      });

      state.totalCount = calcProductCount(state.cart);
    },
    minusCartItem: (state, action) => {
      const minusProductSelectOptions = JSON.stringify(action.payload.selectedOptions);

      state.cart[action.payload.id].forEach((product) => {
        if (JSON.stringify(product.selectedOptions) === minusProductSelectOptions) {
          product.count--;
        }
      });

      state.totalCount = calcProductCount(state.cart);
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addToCart, plusCartItem, minusCartItem } = actions;

export default reducer;
