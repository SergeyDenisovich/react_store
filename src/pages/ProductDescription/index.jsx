import React, { Component } from 'react';
import { client } from '@tilework/opus';
import { compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { calculatePrice } from '../../utils/calculatePrice';
import { getProduct } from '../../queries/getProduct';

// import { addToCart } from '../../store/slices/cartSlice';
import ProductDescriptionPage from './ProductDescriptionPage';

class ProductDescription extends Component {
  state = {
    product: null,
    productImage: null,
    productPrice: null,
    redirect: false,
    selectedAttrs: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const productId = match.params.id;

    this.queryProduct(productId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currency !== prevProps.currency) {
      const { priceSymbol, productPrice } = calculatePrice(this.props.currency?.label, this.state.product?.prices);

      this.setState({ productPrice: { priceSymbol, productPrice } });
    }
  }

  queryProduct = async (productId) => {
    const { product } = await client.post(getProduct(productId));

    const selectedDefaultAttrs = product?.attributes?.map(({ name, items: [item] }) => {
      const value = item.value;
      return {
        name,
        value,
      };
    });

    const { priceSymbol, productPrice } = calculatePrice(this.props.currency?.label, product?.prices);

    this.setState({
      product,
      productImage: product?.gallery[0],
      productPrice: { priceSymbol, productPrice },
      selectedAttrs: selectedDefaultAttrs,
    });
  };

  setProductImg = (img) => {
    this.setState({ productImage: img });
  };

  // function handle click on different attributes
  handleChangeAttr = (name, value) => {
    const selectedAttrsCopy = this.state.selectedAttrs.slice();
    const attrIndex = selectedAttrsCopy.findIndex(({ name: attrName }) => attrName === name);
    selectedAttrsCopy.splice(attrIndex, 1, { name, value });

    this.setState({ selectedAttrs: selectedAttrsCopy });
  };

  onAddToCart = () => {
    const selectedOptions = this.state.selectedAttrs;
    const { id, name, brand, gallery, prices, attributes } = this.state.product;
    const selectedProduct = {
      id,
      name,
      brand,
      gallery,
      prices,
      attributes,
      selectedOptions,
    };

    this.props.addToCart(selectedProduct);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }

    return (
      <ProductDescriptionPage
        product={this.state.product}
        productImage={this.state.productImage}
        productPrice={this.state.productPrice}
        setProductImg={this.setProductImg}
        handleChangeAttrValue={this.handleChangeAttr}
        onAddToCart={this.onAddToCart}
      />
    );
  }
}

const mapState = ({ currency }) => ({
  currency: currency.currency,
});

export default compose(connect(mapState, {}), withRouter)(ProductDescription);
