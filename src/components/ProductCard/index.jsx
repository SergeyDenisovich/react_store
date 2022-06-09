import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import cart from '../../assets/images/add-to-cart.svg';
import { calculatePrice } from '../../utils/calculatePrice';

import styles from './ProductCard.module.scss';

class ProductCard extends Component {
  render() {
    const {
      id,
      productName,
      productBrand,
      image,
      prices,
      currency,
      inStock,
      attributes,
      onAddToCart,
      location: { pathname },
    } = this.props;
    const productTitle = `${productBrand} ${productName}`;
    const { priceSymbol, productPrice } = calculatePrice(currency.label, prices);

    return (
      <Link className={styles.card} to={attributes.length ? `/product/${id}` : pathname}>
        <div className={styles.image}>
          <img src={image} alt={productName} />
          {!inStock ? <p className={styles.outOfStock}>out of stock</p> : ''}
        </div>

        <div className={styles.description}>
          <h3>{productTitle}</h3>
          <div>{`${priceSymbol}${productPrice}`}</div>
        </div>

        {inStock && (
          <button onClick={onAddToCart.bind(null, id)}>
            <img src={cart} alt={'Cart'} />
          </button>
        )}
      </Link>
    );
  }
}

export default withRouter(ProductCard);
