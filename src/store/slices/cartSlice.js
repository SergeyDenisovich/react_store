import { createSlice } from '@reduxjs/toolkit';
import { calcProductCount } from '../../utils/calcProductCount';
import { productArrayFromCart } from '../../utils/productArrayFromCart';
import { calculatePrice } from '../../utils/calculatePrice';

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
      const [product, currency] = action.payload;
      let total = 0;

      if (!state.cart[product.id]) {
        state.cart[product.id] = [{ ...product, count: 1 }];
      } else {
        const addedProductSelectOptions = JSON.stringify(product.selectedOptions);
        let isProductExist = false;

        state.cart[product.id].forEach((product) => {
          if (JSON.stringify(product.selectedOptions) === addedProductSelectOptions) {
            isProductExist = true;
            product.count++;
          }
        });

        if (!isProductExist) {
          state.cart[product.id].push({ ...product, count: 1 });
        }
      }

      const cartItemsArr = productArrayFromCart(state.cart);
      cartItemsArr.forEach((product) => {
        const { productPrice } = calculatePrice(currency.label, product.prices);
        const productTotalPrice = productPrice * product.count;

        total += productTotalPrice;
      });

      state.totalPrice = total;

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

    currencyUpdate: (state, action) => {
      const currency = action.payload.label;

      let total = 0;

      const cartItemsArr = productArrayFromCart(state.cart);
      cartItemsArr.forEach((product) => {
        const { priceSymbol, productPrice } = calculatePrice(currency, product.prices);
        const productTotalPrice = productPrice * product?.count;

        total += productTotalPrice;
      });

      state.totalPrice = total;
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addToCart, plusCartItem, minusCartItem, currencyUpdate } = actions;

export default reducer;
