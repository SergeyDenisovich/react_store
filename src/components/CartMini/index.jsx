import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../CartItem';
import { calculatePrice } from '../../utils/calculatePrice';

import styles from './CartMini.module.scss';

class CartMini extends Component {
  cart = 'miniCart';

  componentDidMount() {
    if (this.props.isVisible) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  close = () => {
    this.props.closeCartMini();
  };

  render() {
    const {
      cart,
      currency: { currency },
    } = this.props;

    return (
      <div className={styles.overlay} onClick={this.close}>
        <section className={styles.minicart} onClick={(e) => e.stopPropagation()}>
          {cart.length > 0 ? (
            <>
              <div className={styles.title}>
                My Bag,
                <span>{` ${cart.length} items`}</span>
              </div>

              <div className={styles.products}>
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
              </div>

              <div className={styles.totalPrice}>
                <span>Total</span>
                <span>$200.00</span>
              </div>
            </>
          ) : (
            <div className={styles.title}>No product's in cart!</div>
          )}

          <div className={styles.actions}>
            <Link to={'/cart'} onClick={this.close}>
              <button disabled={!cart.length} className={!cart.length ? styles.disabledBtn : ''}>
                view bag
              </button>
            </Link>
            <button onClick={this.close}>check out</button>
          </div>
        </section>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart.cart,
  currency: state.currency,
});

export default connect(mapState)(CartMini);
