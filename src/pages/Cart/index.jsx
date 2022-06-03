import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartItem from '../../components/CartItem';
import { calculatePrice } from '../../utils/calculatePrice';
import { productArrayFromCart } from '../../utils/productArrayFromCart';
import { plusCartItem, minusCartItem, deleteCartItem } from '../../store/slices/cartSlice';

import styles from './Cart.module.scss';

class Cart extends Component {
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

  deleteItemFromCart = (productId) => {
    this.props.deleteCartItem(productId);
  };

  render() {
    const {
      cart: { cart, totalCount },
      currency: { currency },
    } = this.props;

    const cartProducts = productArrayFromCart(cart);

    return (
      <section className={styles.cart}>
        <h1>Cart</h1>

        {cartProducts.map((product, index) => {
          const { priceSymbol, productPrice } = calculatePrice(currency.label, product.prices);
          const productTotalPrice = productPrice * product.count;
          this.totalPrice.current += productTotalPrice;

          return (
            <CartItem
              key={`${product.id}_${index}`}
              product={product}
              cart={this.cart}
              priceSymbol={priceSymbol}
              productPrice={productPrice}
              onPlusCartItem={this.onPlusCartItem}
              onMinusCartItem={this.onMinusCartItem}
              deleteItem={this.deleteItemFromCart}
            />
          );
        })}

        <div className={styles.orderBlock}>
          <span>Tax 21%:</span>
          <span>{}</span>
          <span>Quantity:</span>
          <span>{totalCount}</span>
          <span>Total:</span>
          <span>{}</span>
        </div>

        <button className={styles.orderBtn}>order</button>
      </section>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(mapState, { plusCartItem, minusCartItem, deleteCartItem })(Cart);
