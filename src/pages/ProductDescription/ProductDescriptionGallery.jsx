import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ProductDescription.module.scss';

class ProductDescriptionGallery extends PureComponent {
  render() {
    const { gallery, productName, currentProductImage, setProductImg } = this.props;

    return (
      <ul className={styles.imagesList}>
        {gallery.map((image, index) => (
          <li key={index} className={image === currentProductImage ? styles.activeImage : ''}>
            <img src={image} alt={productName} onClick={setProductImg.bind(null, image)} />
          </li>
        ))}
      </ul>
    );
  }
}

ProductDescriptionGallery.propTypes = {
  productName: PropTypes.string,
  setProductImg: PropTypes.func,
  currentProductImage: PropTypes.string,
  gallery: PropTypes.arrayOf(PropTypes.string),
};

export default ProductDescriptionGallery;
