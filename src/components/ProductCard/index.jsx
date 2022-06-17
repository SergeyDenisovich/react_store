import { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import cart from '../../assets/images/add-to-cart.svg';
import { calculatePrice } from '../../utils/calculatePrice';

import styles from './ProductCard.module.scss';

class ProductCard extends PureComponent {
  render() {
    const {
      product,
      currency,
      // onAddToCart,
      // location,
    } = this.props;
    const image = product.gallery[0];
    const productTitle = `${product.brand} ${product.name}`;
    const { priceSymbol, productPrice } = calculatePrice(currency.label, product.prices);

    return (
      <li>
        {/* <Link className={styles.card} to={product.attributes.length ? `/product/${product.id}` : location.pathname}> */}
        <Link className={styles.card} to={`/product/${product.id}`}>
          <div className={styles.image}>
            <img src={image} alt={product.name} />
            {!product.inStock ? <p className={styles.outOfStock}>out of stock</p> : ''}
          </div>

          <div className={styles.description}>
            <h3>{productTitle}</h3>
            <div>{`${priceSymbol}${productPrice}`}</div>
          </div>

          {product.inStock && (
            // <button onClick={!product.attributes.length ? onAddToCart.bind(null, product.id) : undefined}>
            <button>
              <img src={cart} alt={'Cart'} />
            </button>
          )}
        </Link>
      </li>
    );
  }
}

ProductCard.propTypes = {
  currency: PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  location: PropTypes.object,
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    inStock: PropTypes.bool,
    brand: PropTypes.string,
    gallery: PropTypes.arrayOf(PropTypes.string),
    prices: PropTypes.arrayOf(PropTypes.object),
    attributes: PropTypes.array,
  }).isRequired,
};

export default withRouter(ProductCard);
