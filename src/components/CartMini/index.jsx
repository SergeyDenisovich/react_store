import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { plusCartItem, minusCartItem } from '../../store/slices/cartSlice';
import { totalPrice } from '../../store/selectors/cartSelector';

import styles from './CartMini.module.scss';
import CartMiniList from './CartMiniList';

class CartMini extends PureComponent {
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

  onPlusCartItem = (product) => {
    const { id, selectedOptions } = product;
    this.props.plusCartItem({ id, selectedOptions });
  };

  onMinusCartItem = (product) => {
    const { id, selectedOptions } = product;
    this.props.minusCartItem({ id, selectedOptions });
  };

  preventPropagation = (e) => {
    e.stopPropagation();
  };

  render() {
    const {
      cart: { cart, totalCount },
      currency: { currency },
      totalPrice,
    } = this.props;

    return (
      <div className={styles.overlay} onClick={this.close}>
        <div className={styles.minicartWrapper}>
          <section className={styles.minicart} onClick={this.preventPropagation}>
            <CartMiniList
              cartItems={cart}
              cartName={this.cart}
              currency={currency}
              totalCount={totalCount}
              totalPrice={totalPrice}
              onPlusCartItem={this.onPlusCartItem}
              onMinusCartItem={this.onMinusCartItem}
            />

            <div className={styles.actions}>
              <Link to={'/order/cart'} replace onClick={this.close}>
                <button disabled={!totalCount} className={!totalCount ? styles.disabledBtn : ''}>
                  view bag
                </button>
              </Link>
              <button onClick={this.close}>check out</button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapState = ({ cart, currency }) => ({
  cart: cart,
  currency: currency,
  totalPrice: Object.keys(cart.cart).length > 0 && totalPrice(cart.cart, currency.currency.label),
});

export default connect(mapState, { plusCartItem, minusCartItem })(CartMini);
