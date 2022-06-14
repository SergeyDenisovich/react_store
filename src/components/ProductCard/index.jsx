import { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import cart from '../../assets/images/add-to-cart.svg';
import { calculatePrice } from '../../utils/calculatePrice';

import styles from './ProductCard.module.scss';

class ProductCard extends PureComponent {
  render() {
    const {
      product,
      currency,
      onAddToCart,
      location: { pathname },
    } = this.props;
    const image = product.gallery[0];
    const productTitle = `${product.brand} ${product.name}`;
    const { priceSymbol, productPrice } = calculatePrice(currency.label, product.prices);

    return (
      <li>
        <Link className={styles.card} to={product.attributes.length ? `/product/${product.id}` : pathname}>
          <div className={styles.image}>
            <img src={image} alt={product.name} />
            {!product.inStock ? <p className={styles.outOfStock}>out of stock</p> : ''}
          </div>

          <div className={styles.description}>
            <h3>{productTitle}</h3>
            <div>{`${priceSymbol}${productPrice}`}</div>
          </div>

          {product.inStock && (
            <button onClick={!product.attributes.length ? onAddToCart.bind(null, product.id) : undefined}>
              <img src={cart} alt={'Cart'} />
            </button>
          )}
        </Link>
      </li>
    );
  }
}

export default withRouter(ProductCard);
