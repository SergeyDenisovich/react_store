import { Link } from 'react-router-dom';

import CartItem from '../../components/CartItem';
import { calculatePrice } from '../../utils/calculatePrice';
import { productArrayFromCart } from '../../utils/productArrayFromCart';

import styles from './Cart.module.scss';

function CartList({
  cartItems,
  currency,
  totalPrice,
  totalCount,
  tax,
  cartName,
  category,
  onPlusCartItem,
  onMinusCartItem,
}) {
  const cartProducts = productArrayFromCart(cartItems);

  if (cartProducts.length !== 0) {
    return (
      <>
        <h1>Cart</h1>

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

        <div className={styles.orderBlock}>
          <span>Tax 21%:</span>
          <span>{`${currency.symbol}${(totalPrice * tax).toFixed(2)}`}</span>
          <span>Quantity:</span>
          <span>{totalCount}</span>
          <span>Total:</span>
          <span>{`${currency.symbol}${totalPrice.toFixed(2)}`}</span>
        </div>

        <button className={styles.orderBtn}>order</button>
      </>
    );
  } else {
    return (
      <div className={styles.cartEmpty}>
        <h2>Cart is empty!</h2>
        <Link to={`/${category}`}>
          <button className={styles.back}>Back</button>
        </Link>
      </div>
    );
  }
}

export default CartList;
