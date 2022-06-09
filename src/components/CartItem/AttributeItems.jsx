import styles from './CartItem.module.scss';

function AttributeItems({ attr, selectedName, selectedValue }) {
  return (
    <>
      {attr.items.map(({ id, value }) =>
        attr.type === 'text' ? (
          <span
            key={id}
            className={[
              styles.attrText,
              selectedName === attr.name && value === selectedValue ? styles.attrTextActive : '',
            ].join(' ')}
          >
            {value}
          </span>
        ) : (
          <span
            key={id}
            style={{ background: `${value}` }}
            className={[
              styles.attrSwatch,
              selectedName === attr.name && value === selectedValue ? styles.attrSwatchActive : '',
            ].join(' ')}
          />
        )
      )}
    </>
  );
}

export default AttributeItems;
