import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currency: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

const { actions, reducer } = currencySlice;

export const { setCurrency } = actions;

export default reducer;
