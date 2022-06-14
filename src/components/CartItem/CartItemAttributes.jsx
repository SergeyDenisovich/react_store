import { PureComponent } from 'react';

import AttributeItems from './AttributeItems';

import styles from './CartItem.module.scss';

class CartItemAttributes extends PureComponent {
  render() {
    const { attributes, selectedOptions } = this.props;

    return (
      <ul>
        {attributes.map((attr, index) => {
          const { name, value } = selectedOptions[index];

          return (
            <li key={attr.id} className={styles.attributeBlock}>
              <div className={styles.attributeTitle}>{`${attr.name}:`}</div>

              <AttributeItems attr={attr} selectedName={name} selectedValue={value} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CartItemAttributes;
