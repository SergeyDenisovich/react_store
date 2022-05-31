import React, { Component } from 'react';

// import Slider from '../Slider/Slider';
import plusIcon from '../../assets/images/plus-square.svg';
import minusIcon from '../../assets/images/minus-square.svg';

import styles from './CartItem.module.scss';

class CartItem extends Component {
  render() {
    const { product, cart, priceSymbol, productPrice } = this.props;
    // cart={'miniCart'} - minicart block
    // cart={'cart'} - cart page

    return (
      <section key={product.id} className={cart === 'miniCart' ? styles.cartItemMini : styles.cartItem}>
        <div className={styles.leftSection}>
          <div>
            <header className={styles.productTitle}>
              <div>{product.brand}</div>
              <div>{product.name}</div>
            </header>

            <div className={styles.productPrice}>{`${priceSymbol} ${productPrice}`}</div>

            {product.attributes.map((attr, index) => {
              const { name: selName, value: selValue } = product.selectedOptions[index];

              return (
                <div key={attr.id} className={styles.attributeBlock}>
                  <div className={styles.attributeTitle}>{`${attr.name}:`}</div>
                  <div className={styles.attributeItems}>
                    {attr.items.map(({ id, value }) =>
                      attr.type === 'text' ? (
                        <span
                          key={id}
                          className={[
                            styles.attrText,
                            selName === attr.name && value === selValue ? styles.attrTextActive : '',
                          ].join(' ')}
                        >
                          {value}
                        </span>
                      ) : (
                        <span
                          key={id}
                          style={{ background: `${value}` }}
                          className={[
                            styles.attrSwatch,
                            selName === attr.name && value === selValue ? styles.attrSwatchActive : '',
                          ].join(' ')}
                        />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actionBlock}>
            <button onClick={() => {}}>
              <img src={plusIcon} alt='Icon plus' />
            </button>
            <span className={styles.productCount}>{'1'}</span>
            <button onClick={() => {}}>
              <img src={minusIcon} alt='Icon minus' />
            </button>
          </div>
        </div>
        <div className={styles.rightSection}>
          {cart === 'miniCart' ? (
            <img src={product.gallery[0]} alt='Product' />
          ) : product.gallery.length > 1 ? (
            // <Slider images={product.gallery} />
            1
          ) : (
            <img src={product.gallery[0]} alt='Product' />
          )}
        </div>
      </section>
    );
  }
}

export default CartItem;
