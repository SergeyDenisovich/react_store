import { PureComponent } from 'react';

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

export default HomePage;
