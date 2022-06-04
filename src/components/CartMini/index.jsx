import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../CartItem';
import { calculatePrice } from '../../utils/calculatePrice';
import { productArrayFromCart } from '../../utils/productArrayFromCart';
import { plusCartItem, minusCartItem } from '../../store/slices/cartSlice';
import { totalPrice } from '../../store/selectors/cartSelector';

import styles from './CartMini.module.scss';

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

  onPlusCartItem = (product, productPrice) => {
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
      <div className={styles.overlay} onClick={this.close}>
        <section className={styles.minicart} onClick={(e) => e.stopPropagation()}>
          {cartProducts.length > 0 ? (
            <>
              <div className={styles.title}>
                My Bag,
                <span>{` ${totalCount} items`}</span>
              </div>

              <div className={styles.products}>
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
              </div>

              <div className={styles.totalPrice}>
                <span>Total</span>
                <span>{`${currency.symbol}${totalPrice.toFixed(2)}`}</span>
              </div>
            </>
          ) : (
            <div className={styles.title}>No product's in cart!</div>
          )}

          <div className={styles.actions}>
            <Link to={'/cart'} onClick={this.close}>
              <button disabled={!totalCount} className={!totalCount ? styles.disabledBtn : ''}>
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

const mapState = ({ cart, currency }) => ({
  cart: cart,
  currency: currency,
  totalPrice: Object.keys(cart.cart).length > 0 && totalPrice(cart.cart, currency.currency.label),
});

export default connect(mapState, { plusCartItem, minusCartItem })(CartMini);
