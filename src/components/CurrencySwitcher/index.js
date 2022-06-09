import React, { Component } from 'react';
import { connect } from 'react-redux';

import { client } from '../../client';
import { getCurrencies } from '../../queries/getCurrencies';
import { setCurrency } from '../../store/slices/currencySlice';
import CurrencyBlock from './CurrencyBlock';
import arrow from '../../assets/images/arrow.svg';

import styles from './CurrencySwitcher.module.scss';

class CurrencySwitcher extends Component {
  container = React.createRef();
  state = {
    currencies: [],
    isCurrencyBlockVisible: false,
  };

  componentDidMount() {
    //   request currency data
    const queryCurrencies = async () => {
      const { currencies } = await client.post(getCurrencies);

      this.setState({ currencies });
      //   save first currency in store as default
      this.props.setCurrency(currencies[0]);
    };

    queryCurrencies();
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  //   event listener on click outside of currency block
  handleClickOutside = (e) => {
    if (this.container.current && !this.container.current.contains(e.target)) {
      this.setState({ isCurrencyBlockVisible: false });
    }
  };

  toggleCurrencyBlock = () => {
    this.setState((state) => ({ isCurrencyBlockVisible: !state.isCurrencyBlockVisible }));
  };

  onChangeCurrency = (currency) => {
    this.props.setCurrency(currency);
    this.toggleCurrencyBlock();
  };
  render() {
    const { currencySymbol } = this.props;
    const { currencies, isCurrencyBlockVisible } = this.state;

    return (
      <>
        {currencies && (
          <>
            <div onClick={this.toggleCurrencyBlock} ref={this.container} className={styles.currency}>
              <span>{currencySymbol.symbol}</span>
              <img
                src={arrow}
                alt={'Arrow'}
                className={[isCurrencyBlockVisible && styles.arrowUp, styles.arrow].join(' ')}
              />
            </div>
            <CurrencyBlock
              currencies={currencies}
              isCurrencyBlockVisible={isCurrencyBlockVisible}
              onChangeCurrency={this.onChangeCurrency}
            />
          </>
        )}
      </>
    );
  }
}

const mapState = ({ currency }) => ({
  currencySymbol: currency.currency,
});

export default connect(mapState, { setCurrency })(CurrencySwitcher);
