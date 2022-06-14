import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Gallery.module.scss';

class GalleryList extends PureComponent {
  render() {
    const { gallery, index } = this.props;

    return gallery.map((image, imageIndex) => {
      let position = 'nextSlide';

      if (imageIndex === index) {
        position = 'activeSlide';
      }
      if (imageIndex === index - 1 || (index === 0 && imageIndex === gallery.length - 1)) {
        position = 'lastSlide';
      }

      return <img className={styles[position]} key={imageIndex} src={image} alt='Product' />;
    });
  }
}

GalleryList.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number,
};

export default GalleryList;
