import styles from './Gallery.module.scss';

function GalleryList({ gallery, index }) {
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

export default GalleryList;
