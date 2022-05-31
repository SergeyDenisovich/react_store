import React, { Component } from 'react';

import nextBtn from '../../assets/images/arrow-next.svg';
import prevBtn from '../../assets/images/arrow-prev.svg';

import styles from './Gallery.module.scss';

class Gallery extends Component {
  state = {
    gallery: this.props.gallery,
    index: 0,
  };

  componentDidMount() {
    const lastIndex = this.state.gallery?.length - 1;

    if (this.state.index < 0) {
      this.setState({ index: lastIndex });
    }

    if (this.state.index > lastIndex) {
      this.setState({ index: 0 });
    }
  }

  render() {
    console.log(this.props);

    return (
      <div className={styles.gallery}>
        <img src={this.state.gallery?.[0]} alt='' />

        <button onClick={() => this.setState((state) => ({ index: state.index - 1 }))} className={styles.prevBtn}>
          <img src={prevBtn} alt='' />
        </button>
        <button onClick={() => this.setState((state) => ({ index: state.index + 1 }))} className={styles.nextBtn}>
          <img src={nextBtn} alt='' />
        </button>
      </div>
    );
  }
}

export default Gallery;
