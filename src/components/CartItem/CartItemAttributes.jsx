import AttributeItems from './AttributeItems';

import styles from './CartItem.module.scss';

function CartItemAttributes({ attributes, selectedOptions }) {
  return (
    <>
      {attributes &&
        attributes.map((attr, index) => {
          const { name, value } = selectedOptions?.[index];

          return (
            <div key={attr.id} className={styles.attributeBlock}>
              <div className={styles.attributeTitle}>{`${attr.name}:`}</div>
              <div
                className={[styles.attributeItems, attr.type === 'swatch' ? styles.attributeItemsSwatch : ''].join(' ')}
              >
                <AttributeItems attr={attr} selectedName={name} selectedValue={value} />
              </div>
            </div>
          );
        })}
    </>
  );
}

export default CartItemAttributes;
