import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './CurrencySwitcher.module.scss';

class CurrencyBlock extends PureComponent {
  render() {
    const { currencies, isCurrencyBlockVisible, onChangeCurrency } = this.props;

    if (isCurrencyBlockVisible) {
      return (
        <ul className={styles.currencyBlock}>
          {currencies.map(({ symbol, label }) => (
            <li key={label} onClick={onChangeCurrency.bind(null, { label, symbol })}>{`${symbol} ${label}`}</li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }
}

CurrencyBlock.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      symbol: PropTypes.string,
    })
  ),
  isCurrencyBlockVisible: PropTypes.bool,
  onChangeCurrency: PropTypes.func,
};

export default CurrencyBlock;
