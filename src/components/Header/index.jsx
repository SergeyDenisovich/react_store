import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Categories from '../Categories';

import logo from '../../assets/images/logo.svg';
import cart from '../../assets/images/cart.svg';

import styles from './Header.module.scss';
import CurrencySwitcher from '../CurrencySwitcher';

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <Categories />

        <Link to={'/'} className={styles.logo} title={'to Home page'}>
          <img src={logo} alt='Logo' />
        </Link>

        <div className={styles.actions}>
          <CurrencySwitcher />

          <div className={styles.cart}>
            <img src={cart} alt='Cart' />
            <span className={styles.cartCount}>1</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
