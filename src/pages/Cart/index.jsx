import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CartList from './CartList';
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
      category,
      totalPrice,
    } = this.props;

    return (
      <section className={styles.cart}>
        <CartList
          cartItems={cart}
          currency={currency}
          totalCount={totalCount}
          totalPrice={totalPrice}
          tax={this.tax}
          cartName={this.cart}
          category={category.category}
          onPlusCartItem={this.onPlusCartItem}
          onMinusCartItem={this.onMinusCartItem}
        />
      </section>
    );
  }
}

const mapState = ({ cart, currency, category }) => ({
  cart: cart,
  currency: currency,
  category: category,
  totalPrice: Object.keys(cart.cart).length > 0 && totalPrice(cart.cart, currency.currency.label),
});

Cart.propTypes = {
  cart: PropTypes.shape({
    cart: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
    totalCount: PropTypes.number,
  }),
  totalPrice: PropTypes.number,
  currency: PropTypes.shape({
    currency: PropTypes.shape({
      label: PropTypes.string,
      symbol: PropTypes.string,
    }),
  }),
  category: PropTypes.shape({
    category: PropTypes.string,
  }),
  onPlusCartItem: PropTypes.func,
  onMinusCartItem: PropTypes.func,
};

export default connect(mapState, { plusCartItem, minusCartItem })(Cart);
