import React, { Component } from 'react';
import { connect } from 'react-redux';

import { client } from '../../client';
import { getCurrencies } from '../../queries/getCurrencies';
import { setCurrency } from '../../store/slices/currencySlice';
import CurrencyBlock from './CurrencyBlock';

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
    return (
      <CurrencyBlock
        currencySymbol={this.props.currencySymbol}
        currencies={this.state.currencies}
        isCurrencyBlockVisible={this.state.isCurrencyBlockVisible}
        onChangeCurrency={this.onChangeCurrency}
        toggleCurrencyBlock={this.toggleCurrencyBlock}
      />
    );
  }
}

const mapState = ({ currency }) => ({
  currencySymbol: currency.currency,
});

export default connect(mapState, { setCurrency })(CurrencySwitcher);
