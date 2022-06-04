import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../../components/CartItem';
import { calculatePrice } from '../../utils/calculatePrice';
import { productArrayFromCart } from '../../utils/productArrayFromCart';
import { plusCartItem, minusCartItem } from '../../store/slices/cartSlice';
import { totalPrice } from '../../store/selectors/cartSelector';

import styles from './Cart.module.scss';

class Cart extends PureComponent {
  cart = 'cart';
  tax = 0.21;

  onPlusCartItem = (product) => {
    const { id, selectedOptions } = product;
    this.props.plusCartItem({ id, selectedOptions });
  };

  onMinusCartItem = (product) => {
    const { id, selectedOptions } = product;
    this.props.minusCartItem({ id, selectedOptions });
  };

  render() {
    const {
      cart: { cart, totalCount },
      currency: { currency },
      totalPrice,
    } = this.props;

    const cartProducts = productArrayFromCart(cart);

    return (
      <section className={styles.cart}>
        {cartProducts.length !== 0 ? (
          <>
            <h1>Cart</h1>

            {cartProducts.map((product, index) => {
              const { priceSymbol, productPrice } = calculatePrice(currency.label, product.prices);

              return (
                <CartItem
                  key={`${product.id}_${index}`}
                  product={product}
                  cart={this.cart}
                  priceSymbol={priceSymbol}
                  productPrice={productPrice}
                  onPlusCartItem={this.onPlusCartItem}
                  onMinusCartItem={this.onMinusCartItem}
                />
              );
            })}

            <div className={styles.orderBlock}>
              <span>Tax 21%:</span>
              <span>{`${currency.symbol}${(totalPrice * this.tax).toFixed(2)}`}</span>
              <span>Quantity:</span>
              <span>{totalCount}</span>
              <span>Total:</span>
              <span>{`${currency.symbol}${totalPrice.toFixed(2)}`}</span>
            </div>

            <button className={styles.orderBtn}>order</button>
          </>
        ) : (
          <>
            <p>Cart is empty!</p>
            <Link to={'/'}>
              <button className={styles.back}>Back</button>
            </Link>
          </>
        )}
      </section>
    );
  }
}

const mapState = ({ cart, currency }) => ({
  cart: cart,
  currency: currency,
  totalPrice: Object.keys(cart.cart).length > 0 && totalPrice(cart.cart, currency.currency.label),
});

export default connect(mapState, { plusCartItem, minusCartItem })(Cart);
