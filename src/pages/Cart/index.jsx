import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartItem from '../../components/CartItem';
import { calculatePrice } from '../../utils/calculatePrice';

import styles from './Cart.module.scss';

class Cart extends Component {
  cart = 'cart';

  render() {
    const {
      cart,
      currency: { currency },
    } = this.props;

    return (
      <section className={styles.cart}>
        <h1>Cart</h1>

        {cart.map((product) => {
          const { priceSymbol, productPrice } = calculatePrice(currency.label, product.prices);

          return (
            <CartItem
              key={product.id}
              product={product}
              cart={this.cart}
              priceSymbol={priceSymbol}
              productPrice={productPrice}
            />
          );
        })}

        <div className={styles.orderBlock}>
          <span>Tax 21%:</span>
          <span>{'$42.00'}</span>
          <span>Quantity:</span>
          <span>{'3'}</span>
          <span>Total:</span>
          <span>{'$200.00'}</span>
        </div>

        <button className={styles.orderBtn}>order</button>
      </section>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart.cart,
  currency: state.currency,
});

export default connect(mapState)(Cart);
