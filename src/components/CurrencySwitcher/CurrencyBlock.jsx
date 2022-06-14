import { PureComponent } from 'react';

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

export default CurrencyBlock;
