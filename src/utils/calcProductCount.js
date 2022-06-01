import { productArrayFromCart } from './productArrayFromCart';

export const calcProductCount = (cartObj) => {
  const cartItemsArr = productArrayFromCart(cartObj);

  return cartItemsArr.reduce((acc, product) => acc + product.count, 0);
};
