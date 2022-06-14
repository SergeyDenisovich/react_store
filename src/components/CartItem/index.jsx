import { PureComponent } from 'react';

import CartItemGallery from './CartItemGallery';
import CartItemAttributes from './CartItemAttributes';
import plusIcon from '../../assets/images/plus-square.svg';
import minusIcon from '../../assets/images/minus-square.svg';

import styles from './CartItem.module.scss';

class CartItem extends PureComponent {
  handleOnPlusCartItem = () => {
    this.props.onPlusCartItem(this.props.product);
  };

  handleOnMinusCartItem = () => {
    this.props.onMinusCartItem(this.props.product);
  };

  render() {
    const { product, cart, priceSymbol, productPrice } = this.props;

    return (
      <section key={product.id} className={cart === 'miniCart' ? styles.cartItemMini : styles.cartItem}>
        <div className={styles.leftSection}>
          <div>
            <header className={styles.productTitle}>
              <div>{product.brand}</div>
              <div>{product.name}</div>
            </header>

            <div className={styles.productPrice}>{`${priceSymbol}${productPrice}`}</div>

            {product.attributes && (
              <CartItemAttributes attributes={product.attributes} selectedOptions={product.selectedOptions} />
            )}
          </div>

          <div className={styles.actionBlock}>
            <button onClick={this.handleOnPlusCartItem}>
              <img src={plusIcon} alt='Icon plus' />
            </button>
            <span className={styles.productCount}>{product.count}</span>

            <button onClick={this.handleOnMinusCartItem}>
              <img src={minusIcon} alt='Icon minus' />
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          <CartItemGallery cart={cart} imageGallery={product.gallery} name={product.name} />
        </div>
      </section>
    );
  }
}

export default CartItem;
