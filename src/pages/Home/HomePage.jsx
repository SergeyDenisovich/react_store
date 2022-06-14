import ProductCard from '../../components/ProductCard';

function HomePage({ products, currency, addProductToCart }) {
  return products.map(({ id, name, brand, gallery, prices, inStock, attributes }) => (
    <ProductCard
      // key={product.id}
      // produc={product}
      // currency={currency}
      // addProductToCart={addProductToCart}
      key={id}
      id={id}
      productName={name}
      productBrand={brand}
      image={gallery[0]}
      prices={prices}
      inStock={inStock}
      attributes={attributes}
      currency={currency}
      onAddToCart={addProductToCart}
    />
  ));
}

export default HomePage;
