import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.totalCount += 1;
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addToCart } = actions;

export default reducer;
