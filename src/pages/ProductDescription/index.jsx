import React, { PureComponent, Fragment } from 'react';
import { client } from '@tilework/opus';
import { compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { calculatePrice } from '../../utils/calculatePrice';
import { getProduct } from '../../queries/getProduct';

// import { addToCart } from '../../store/slices/cartSlice';
import styles from './ProductDescription.module.scss';

class ProductDescription extends PureComponent {
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

    const { priceSymbol, productPrice } = calculatePrice(this.props.currency?.label, product.prices);

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
  handleChange = (name, value) => {
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

    const { product, productImage, productPrice } = this.state;

    return (
      <>
        {product && (
          <section className={styles.product}>
            <div className={styles.images}>
              {/* small images */}

              <div className={styles.imagesList}>
                {product.gallery.map((image, index) => (
                  <div key={index} className={image === productImage ? styles.activeImage : ''}>
                    <img src={image} alt={product.name} onClick={() => this.setProductImg(image)} />
                  </div>
                ))}
              </div>
              {/* main big image */}

              <a href={productImage} className={styles.imageBig} target='_blank' rel='noreferrer'>
                <img src={productImage} alt='Product' />
              </a>
            </div>
            <div className={styles.description}>
              <h3>{product.brand}</h3>
              <h4>{product.name}</h4>
              {/* attributes */}

              <>
                {product?.attributes.map(({ id, name, type, items }) => {
                  return (
                    <div key={id} className={styles.attributeBlock}>
                      <h5>{`${name}:`}</h5>
                      <div className={styles.attrItems}>
                        {items.map(({ id, value, displayValue }, index) => (
                          <Fragment key={id}>
                            <input
                              type='radio'
                              id={`${value}${name}`}
                              name={name}
                              value={value}
                              onChange={() => this.handleChange(name, value)}
                              defaultChecked={index === 0}
                            />
                            {type === 'text' ? (
                              <label htmlFor={`${value}${name}`} className={styles.attr} data-attr='text'>
                                {value}
                              </label>
                            ) : (
                              <label
                                title={displayValue}
                                htmlFor={`${value}${name}`}
                                style={{ background: `${value}` }}
                                className={styles.attrSwatch}
                                data-attr='swatch'
                                onChange={() => this.handleChange(name, value)}
                                defaultChecked={index === 0}
                              />
                            )}
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>

              {/* price */}

              <div className={styles.price}>
                <div>Price:</div>
                <div>{`${productPrice?.priceSymbol} ${productPrice?.productPrice}`}</div>
              </div>

              <button className={styles.btn} onClick={this.onAddToCart}>
                add to cart
              </button>
              <div className={styles.text} dangerouslySetInnerHTML={{ __html: product.description }}></div>
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

export default compose(connect(mapState, {}), withRouter)(ProductDescription);
