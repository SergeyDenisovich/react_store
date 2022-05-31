import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Categories from '../Categories';

import logo from '../../assets/images/logo.svg';
import cart from '../../assets/images/cart.svg';

import styles from './Header.module.scss';
import CurrencySwitcher from '../CurrencySwitcher';
import CartMini from '../CartMini';

class Header extends Component {
  state = {
    isCartMiniVisible: false,
  };

  showCartMini = () => {
    this.setState({ isCartMiniVisible: true });
  };

  closeCartMini = () => {
    this.setState({ isCartMiniVisible: false });
  };

  render() {
    const { isCartMiniVisible } = this.state;

    return (
      <div className={styles.header}>
        <Categories />

        <Link to={'/'} className={styles.logo} title={'to Home page'}>
          <img src={logo} alt='Logo' />
        </Link>

        <div className={styles.actions}>
          <CurrencySwitcher />

          <div className={styles.cart} onClick={this.showCartMini}>
            <img src={cart} alt='Cart' />
            <span className={styles.cartCount}>1</span>
          </div>
        </div>

        {isCartMiniVisible && <CartMini isVisible={isCartMiniVisible} closeCartMini={this.closeCartMini} />}
      </div>
    );
  }
}

export default Header;
