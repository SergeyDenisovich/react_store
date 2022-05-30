import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import cart from '../../assets/images/cart.svg';

import styles from './Header.module.scss';

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <Link to={'/'} className={styles.logo} title={'to Home page'}>
          <img src={logo} alt='Logo' />
        </Link>

        <img src={cart} alt='Cart' />
      </div>
    );
  }
}

export default Header;
