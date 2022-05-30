import React, { Component } from 'react';

import arrow from '../../assets/images/arrow.svg';

import styles from './CurrencySwitcher.module.scss';

class CurrencyBlock extends Component {
  render() {
    const { currencySymbol, currencies, isCurrencyBlockVisible, onChangeCurrency, toggleCurrencyBlock } = this.props;

    return (
      <>
        <div onClick={toggleCurrencyBlock} ref={this.container} className={styles.currency}>
          <span>{currencySymbol?.symbol}</span>
          <img
            src={arrow}
            alt={'Arrow'}
            className={[isCurrencyBlockVisible && styles.arrowUp, styles.arrow].join(' ')}
          />
        </div>

        {isCurrencyBlockVisible ? (
          <ul className={styles.currencyBlock}>
            {currencies.map(({ symbol, label }) => (
              <li key={label} onClick={() => onChangeCurrency({ label, symbol })}>{`${symbol} ${label}`}</li>
            ))}
          </ul>
        ) : null}
      </>
    );
  }
}

export default CurrencyBlock;
