import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cart from '../../assets/images/add-to-cart.svg';
import { calculatePrice } from '../../utils/calculatePrice';

import styles from './ProductCard.module.scss';

class ProductCard extends Component {
  render() {
    const { id, productName, productBrand, image, prices, currency, inStock, attributes, onAddToCart } = this.props;
    const productTitle = `${productBrand} ${productName}`;

    const { priceSymbol, productPrice } = calculatePrice(currency?.label, prices);

    return (
      <div className={styles.card}>
        <div className={styles.image}>
          <img src={image} alt={productName} />
          {!inStock ? <p className={styles.outOfStock}>out of stock</p> : ''}
        </div>

        <div className={styles.description}>
          <div>{productTitle}</div>
          <div>{`${priceSymbol} ${productPrice}`}</div>
        </div>

        {inStock &&
          (attributes.length ? (
            <button>
              <Link to={`/product/${id}`}>
                <img src={cart} alt={'Cart'} />
              </Link>
            </button>
          ) : (
            <button onClick={() => onAddToCart(id)}>
              <img src={cart} alt={'Cart'} />
            </button>
          ))}
      </div>
    );
  }
}

export default ProductCard;
