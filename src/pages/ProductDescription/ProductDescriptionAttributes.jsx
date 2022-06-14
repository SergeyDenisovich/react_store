import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ProductDescription.module.scss';

class ProductDescriptionAttributes extends PureComponent {
  render() {
    const { attributes, onChangeAttr } = this.props;

    return (
      <ul>
        {attributes.map(({ id, name, type, items }) => (
          <li key={id} className={styles.attributeBlock}>
            <h5>{`${name}:`}</h5>
            <ul className={styles.attrItems}>
              {items.map(({ id, value }, index) => (
                <li key={id}>
                  <input
                    type='radio'
                    id={`${value}${name}`}
                    name={name}
                    value={value}
                    onChange={onChangeAttr.bind(null, name, value)}
                    defaultChecked={index === 0}
                  />
                  <label
                    htmlFor={`${value}${name}`}
                    style={{ background: type !== 'text' ? `${value}` : '' }}
                    className={type === 'text' ? styles.attr : styles.attrSwatch}
                    data-attr={type === 'text' ? 'text' : 'swatch'}
                  >
                    {type === 'text' ? value : ''}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

ProductDescriptionAttributes.propTypes = {
  onChangeAttr: PropTypes.func,
  attributes: PropTypes.arrayOf(PropTypes.object),
};

export default ProductDescriptionAttributes;
