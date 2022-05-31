import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './CartMini.module.scss';

class CartMini extends Component {
  componentDidMount() {
    if (this.props.isVisible) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  close = () => {
    this.props.closeCartMini();
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.close}>
        <section className={styles.minicart} onClick={(e) => e.stopPropagation()}>
          <div className={styles.title}>No product's in cart!</div>

          <div className={styles.actions}>
            <Link to={'/cart'} onClick={this.close}>
              <button>view bag</button>
            </Link>
            <button onClick={this.close}>check out</button>
          </div>
        </section>
      </div>
    );
  }
}

export default CartMini;
