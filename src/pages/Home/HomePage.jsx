import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProductCard from '../../components/ProductCard';

import styles from './Home.module.scss';

class HomePage extends PureComponent {
  render() {
    const { products, currency, addProductToCart } = this.props;

    return (
      <ul className={styles.products}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} currency={currency} onAddToCart={addProductToCart} />
        ))}
      </ul>
    );
  }
}

HomePage.propTypes = {
  addProductToCart: PropTypes.func,
  currency: PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
  }),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      inStock: PropTypes.bool,
      brand: PropTypes.string,
      gallery: PropTypes.arrayOf(PropTypes.string),
      prices: PropTypes.arrayOf(PropTypes.object),
      attributes: PropTypes.array,
    })
  ).isRequired,
};

export default HomePage;
