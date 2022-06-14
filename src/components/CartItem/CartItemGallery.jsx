import Gallery from '../Gallery';

// function CartItemGallery({ cart, imageGallery, name }) {
//   if (cart === 'miniCart') {
//     return <img src={imageGallery[0]} alt={name} />;
//   } else if (cart === 'cart' && imageGallery.length > 1) {
//     return <Gallery gallery={imageGallery} />;
//   } else {
//     return <img src={imageGallery[0]} alt={name} />;
//   }
// }

function CartItemGallery({ cart, imageGallery, name }) {
  if (cart === 'cart' && imageGallery.length > 1) {
    return <Gallery gallery={imageGallery} />;
  } else {
    return <img src={imageGallery[0]} alt={name} />;
  }
}

export default CartItemGallery;
