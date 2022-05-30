import React, { Component } from 'react';

import ProductCard from '../../components/ProductCard';
import { upperName } from '../../utils/upperName';

import styles from './Home.module.scss';

class HomePage extends Component {
  render() {
    const { products, category, currency, addProductToCart } = this.props;

    return (
      <>
        {category && (
          <>
            <h1 className={styles.categoryName}>{upperName(this.props?.category)}</h1>
            <div className={styles.products}>
              {products.map(({ id, name, brand, gallery, prices, inStock, attributes }) => (
                <ProductCard
                  key={id}
                  id={id}
                  productName={name}
                  productBrand={brand}
                  image={gallery[0]}
                  prices={prices}
                  inStock={inStock}
                  attributes={attributes}
                  currency={currency}
                  onAddToCart={addProductToCart}
                />
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default HomePage;
