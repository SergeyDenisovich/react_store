import React, { Component } from 'react';

import styles from './Cart.module.scss';

class Cart extends Component {
  render() {
    return (
      <section className={styles.cart}>
        <h1>Cart</h1>

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

export default Cart;
