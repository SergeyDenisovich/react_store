import styles from './CurrencySwitcher.module.scss';

function CurrencyBlock({ currencies, isCurrencyBlockVisible, onChangeCurrency }) {
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

export default CurrencyBlock;
