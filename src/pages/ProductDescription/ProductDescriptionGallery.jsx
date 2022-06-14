import { PureComponent } from 'react';

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

export default ProductDescriptionGallery;
