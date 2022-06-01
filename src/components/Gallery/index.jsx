import React, { Component } from 'react';

import { throttle } from '../../utils/throttle';

import styles from './Gallery.module.scss';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: this.props.gallery,
      index: 0,
    };

    this.showPrevImageTrottled = throttle(this.showPrevImage, 1000);
    this.showNextImageTrottled = throttle(this.showNextImage, 1000);
  }

  calculateImagePosition = () => {
    const lastIndex = this.state.gallery?.length - 1;

    if (this.state.index < 0) {
      this.setState({ index: lastIndex });
    }

    if (this.state.index > lastIndex) {
      this.setState({ index: 0 });
    }
  };

  componentDidMount() {
    this.calculateImagePosition();
  }

  componentDidUpdate(prevState) {
    if (this.state.index !== prevState.index) {
      this.calculateImagePosition();
    }
  }

  showPrevImage = () => {
    this.setState((state) => ({ index: state.index - 1 }));
  };

  showNextImage = () => {
    this.setState((state) => ({ index: state.index + 1 }));
  };

  render() {
    return (
      <div className={styles.gallery}>
        {this.state.gallery.map((image, imageIndex) => {
          let position = 'nextSlide';

          if (imageIndex === this.state.index) {
            position = 'activeSlide';
          }
          if (
            imageIndex === this.state.index - 1 ||
            (this.state.index === 0 && imageIndex === this.state.gallery.length - 1)
          ) {
            position = 'lastSlide';
          }

          return <img className={styles[position]} key={imageIndex} src={image} alt='Product' />;
        })}

        <button onClick={this.showPrevImageTrottled} className={styles.prevBtn}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='24' height='24' fill='black' fillOpacity='0.73' />
            <path
              d='M14.25 6.06857L8.625 11.6876L14.25 17.3066'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <button onClick={this.showNextImageTrottled} className={styles.nextBtn}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='24' height='24' transform='matrix(-1 0 0 1 24 0)' fill='black' fillOpacity='0.73' />
            <path
              d='M9.75 6.06857L15.375 11.6876L9.75 17.3066'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    );
  }
}

export default Gallery;
