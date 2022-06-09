import { Fragment } from 'react';

import styles from './ProductDescription.module.scss';

function ProductDescriptionAttributes({ attributes, onChangeAttr }) {
  return (
    <>
      {attributes.map(({ id, name, type, items }) => {
        return (
          <div key={id} className={styles.attributeBlock}>
            <h5>{`${name}:`}</h5>
            <div className={styles.attrItems}>
              {items.map(({ id, value, displayValue }, index) => (
                <Fragment key={id}>
                  <input
                    type='radio'
                    id={`${value}${name}`}
                    name={name}
                    value={value}
                    onChange={onChangeAttr.bind(null, name, value)}
                    defaultChecked={index === 0}
                  />
                  {type === 'text' ? (
                    <label htmlFor={`${value}${name}`} className={styles.attr} data-attr='text'>
                      {value}
                    </label>
                  ) : (
                    <label
                      title={displayValue}
                      htmlFor={`${value}${name}`}
                      style={{ background: `${value}` }}
                      className={styles.attrSwatch}
                      data-attr='swatch'
                      onChange={onChangeAttr.bind(null, name, value)}
                      defaultChecked={index === 0}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductDescriptionAttributes;
