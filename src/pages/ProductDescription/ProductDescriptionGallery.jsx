import styles from './ProductDescription.module.scss';

function ProductDescriptionGallery({ gallery, productName, currentProductImage, setProductImg }) {
  return (
    <div className={styles.imagesList}>
      {gallery.map((image, index) => (
        <div key={index} className={image === currentProductImage ? styles.activeImage : ''}>
          <img src={image} alt={productName} onClick={setProductImg.bind(null, image)} />
        </div>
      ))}
    </div>
  );
}

export default ProductDescriptionGallery;
