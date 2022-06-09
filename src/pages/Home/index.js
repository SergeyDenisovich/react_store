import React, { PureComponent } from 'react';
import { client } from '@tilework/opus';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';

import HomePage from './HomePage';
import { upperName } from '../../utils/upperName';
import { addToCart } from '../../store/slices/cartSlice';
import { getCategory } from '../../queries/getCategory';

import styles from './Home.module.scss';

class Home extends PureComponent {
  state = {
    products: [],
  };

  componentDidMount() {
    const category = this.props.location.pathname.slice(1);
    this.queryCategory(category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.queryCategory(this.props.category);
    }
  }

  queryCategory = async (category) => {
    const {
      category: { products },
    } = await client.post(getCategory(category));
    this.setState({ products });
  };

  addProductToCart = (productId) => {
    const product = this.state.products.find(({ id }) => id === productId);
    this.props.addToCart(product);
  };

  render() {
    const { currency, category } = this.props;
    const { products } = this.state;

    return (
      <>
        {products && (
          <>
            <h1 className={styles.categoryName}>{category && upperName(category)}</h1>
            <div className={styles.products}>
              <HomePage products={products} currency={currency} addProductToCart={this.addProductToCart} />
            </div>
          </>
        )}
      </>
    );
  }
}

const mapState = ({ currency, category }) => ({
  currency: currency.currency,
  category: category.category,
});

export default compose(connect(mapState, { addToCart }), withRouter)(Home);
