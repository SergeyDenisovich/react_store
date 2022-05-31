import React, { PureComponent, Fragment } from 'react';

import styles from './ProductDescription.module.scss';

class ProductDescriptionPage extends PureComponent {
  render() {
    const { product, productImage, productPrice, setProductImg, handleChangeAttrValue, onAddToCart } = this.props;

    return (
      <>
        {product && (
          <section className={styles.product}>
            <div className={styles.images}>
              {/* small images */}

              <div className={styles.imagesList}>
                {product.gallery.map((image, index) => (
                  <div key={index} className={image === productImage ? styles.activeImage : ''}>
                    <img src={image} alt={product.name} onClick={() => setProductImg(image)} />
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
                              onChange={() => handleChangeAttrValue(name, value)}
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
                                onChange={() => this.handleChangeAttrValue(name, value)}
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

              <button className={styles.btn} onClick={onAddToCart}>
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

export default ProductDescriptionPage;
