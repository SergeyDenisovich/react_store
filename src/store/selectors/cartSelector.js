import { productArrayFromCart } from '../../utils/productArrayFromCart';
import { calculatePrice } from '../../utils/calculatePrice';

export const totalPrice = (cart, label) => {
  const cartProductsArr = productArrayFromCart(cart);
  const totalPrice = cartProductsArr.reduce((acc, product) => {
    const { productPrice } = calculatePrice(label, product.prices);
    return acc + productPrice * product.count;
  }, 0);

  return totalPrice;
};
