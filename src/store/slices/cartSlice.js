import { createSlice } from '@reduxjs/toolkit';
import { calcProductCount } from '../../utils/calcProductCount';
import { productArrayFromCart } from '../../utils/productArrayFromCart';

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
  },
});

const { actions, reducer } = cartSlice;

export const { addToCart } = actions;

export default reducer;
