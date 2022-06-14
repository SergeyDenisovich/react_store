import { PureComponent } from 'react';
import { client } from '@tilework/opus';
import { compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Markup } from 'interweave';
import PropTypes from 'prop-types';

import ProductDescriptionGallery from './ProductDescriptionGallery';
import ProductDescriptionAttributes from './ProductDescriptionAttributes';
import { calculatePrice } from '../../utils/calculatePrice';
import { getProduct } from '../../queries/getProduct';
import { addToCart } from '../../store/slices/cartSlice';

import styles from './ProductDescription.module.scss';

class ProductDescription extends PureComponent {
  state = {
    product: null,
    productImage: null,
    productPrice: null,
    selectedAttrs: [],
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

    const selectedProduct = {
      ...this.state.product,
      selectedOptions,
    };

    this.props.addToCart(selectedProduct);
  };

  render() {
    const { product, productImage, productPrice } = this.state;

    return (
      <>
        {product && (
          <section className={styles.product}>
            <div className={styles.images}>
              {/* 
              ====================== small images 
              */}

              <ProductDescriptionGallery
                gallery={product.gallery}
                productName={product.name}
                currentProductImage={productImage}
                setProductImg={this.setProductImg}
              />

              {/* 
              ====================== main big image
              */}

              <a href={productImage} className={styles.imageBig} target='_blank' rel='noreferrer'>
                <img src={productImage} alt={product.name} />
                {!product.inStock ? <p className={styles.outOfStock}>out of stock</p> : ''}
              </a>
            </div>
            <div className={styles.description}>
              <h3>{product.brand}</h3>
              <h4>{product.name}</h4>

              {/* 
              ====================== attributes 
              */}
              <ProductDescriptionAttributes attributes={product.attributes} onChangeAttr={this.handleChangeAttr} />

              {/* 
              ====================== price
              */}

              <div className={styles.price}>
                <div>Price:</div>
                <div>{`${productPrice.priceSymbol}${productPrice.productPrice}`}</div>
              </div>

              <button
                className={[styles.btn, !product.inStock ? styles.disabledBtn : ''].join(' ')}
                onClick={this.onAddToCart}
                disabled={!product.inStock}
              >
                add to cart
              </button>
              {/* 
              ====================== text description (html!)
              */}
              <Markup className={styles.text} content={product.description} />
            </div>
          </section>
        )}
      </>
    );
  }
}

const mapState = ({ currency }) => ({
  currency: currency.currency,
});

ProductDescription.propTypes = {
  addToCart: PropTypes.func,
  curency: PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
  }),
};

export default compose(connect(mapState, { addToCart }), withRouter)(ProductDescription);
