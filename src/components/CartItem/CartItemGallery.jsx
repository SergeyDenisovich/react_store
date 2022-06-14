import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Gallery from '../Gallery';

class CartItemGallery extends PureComponent {
  render() {
    if (this.props.cart === 'cart' && this.props.imageGallery.length > 1) {
      return <Gallery gallery={this.props.imageGallery} />;
    } else {
      return <img src={this.props.imageGallery[0]} alt={this.props.name} />;
    }
  }
}

CartItemGallery.propTypes = {
  cart: PropTypes.string,
  name: PropTypes.string,
  imageGallery: PropTypes.arrayOf(PropTypes.string),
};

export default CartItemGallery;
