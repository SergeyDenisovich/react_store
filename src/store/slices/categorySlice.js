import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

const { actions, reducer } = categorySlice;

export const { setCategory } = actions;

export default reducer;
