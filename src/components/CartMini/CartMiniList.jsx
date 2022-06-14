import { PureComponent } from 'react';

import CartItem from '../CartItem';
import { calculatePrice } from '../../utils/calculatePrice';
import { productArrayFromCart } from '../../utils/productArrayFromCart';

import styles from './CartMini.module.scss';

class CartMiniList extends PureComponent {
  render() {
    const { cartName, currency, totalCount, totalPrice, onPlusCartItem, onMinusCartItem, cartItems } = this.props;
    const cartProducts = productArrayFromCart(cartItems);

    if (cartProducts.length > 0) {
      return (
        <>
          <div className={styles.title}>
            My Bag,
            <span>{`${totalCount} items`}</span>
          </div>

          <div className={styles.products}>
            {cartProducts.map((product, index) => {
              const { priceSymbol, productPrice } = calculatePrice(currency.label, product.prices);

              return (
                <CartItem
                  key={`${product.id}_${index}`}
                  product={product}
                  cart={cartName}
                  priceSymbol={priceSymbol}
                  productPrice={productPrice}
                  onPlusCartItem={onPlusCartItem}
                  onMinusCartItem={onMinusCartItem}
                />
              );
            })}
          </div>

          <div className={styles.totalPrice}>
            <span>Total</span>
            <span>{`${currency.symbol}${totalPrice.toFixed(2)}`}</span>
          </div>
        </>
      );
    } else {
      return <div className={styles.title}>No product's in cart!</div>;
    }
  }
}

export default CartMiniList;
