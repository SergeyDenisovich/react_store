export const calculatePrice = (currency, pricesArray = []) => {
  const index = pricesArray?.findIndex(({ _, currency: { label } }) => label === currency);
  const productPrice = pricesArray[index]?.amount;
  const priceSymbol = pricesArray[index]?.currency.symbol;

  return {
    priceSymbol,
    productPrice,
  };
};
