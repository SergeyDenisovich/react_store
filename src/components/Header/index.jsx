import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CurrencySwitcher from '../CurrencySwitcher';
import CartMini from '../CartMini';
import Categories from '../Categories';
import logo from '../../assets/images/logo.svg';
import cart from '../../assets/images/cart.svg';

import styles from './Header.module.scss';

class Header extends PureComponent {
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
    const { cartCount } = this.props;

    return (
      <div className={styles.header}>
        <Categories />

        <img className={styles.logo} src={logo} alt='Logo' />

        <div className={styles.actions}>
          <CurrencySwitcher />

          <div className={styles.cart} onClick={this.showCartMini}>
            <img src={cart} alt='Cart' />
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </div>
        </div>

        {isCartMiniVisible && <CartMini isVisible={isCartMiniVisible} closeCartMini={this.closeCartMini} />}
      </div>
    );
  }
}

const mapState = (state) => ({
  cartCount: state.cart.totalCount,
});

Header.propTypes = {
  cartCount: PropTypes.number,
};

export default connect(mapState)(Header);
