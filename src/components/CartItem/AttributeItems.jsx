import { PureComponent } from 'react';

import styles from './CartItem.module.scss';

class AttributeItems extends PureComponent {
  render() {
    const { attr, selectedName, selectedValue } = this.props;

    return (
      <ul className={[styles.attributeItems, attr.type === 'swatch' ? styles.attributeItemsSwatch : ''].join(' ')}>
        {attr.items.map(({ id, value }) => (
          <li
            key={id}
            style={{ background: attr.type !== 'text' ? `${value}` : '' }}
            className={
              attr.type === 'text'
                ? [
                    styles.attrText,
                    selectedName === attr.name && value === selectedValue ? styles.attrTextActive : '',
                  ].join(' ')
                : [
                    styles.attrSwatch,
                    selectedName === attr.name && value === selectedValue ? styles.attrSwatchActive : '',
                  ].join(' ')
            }
          >
            {attr.type === 'text' ? value : ''}
          </li>
        ))}
      </ul>
    );
  }
}

export default AttributeItems;
