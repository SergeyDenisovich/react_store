import React, { PureComponent } from 'react';
import { client } from '@tilework/opus';
import { connect } from 'react-redux';

import { addToCart } from '../../store/slices/cartSlice';
import { getCategory } from '../../queries/getCategory';

import HomePage from './HomePage';

export class Home extends PureComponent {
  state = {
    products: [],
  };

  componentDidMount() {
    this.queryCategory(this.props.category);
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
    this.props.addToCart([product, this.props.currency]);
  };

  render() {
    const { category, currency } = this.props;
    const { products } = this.state;

    return (
      <HomePage products={products} category={category} currency={currency} addProductToCart={this.addProductToCart} />
    );
  }
}

const mapState = ({ currency, category }) => ({
  currency: currency.currency,
  category: category.category,
});

export default connect(mapState, { addToCart })(Home);
