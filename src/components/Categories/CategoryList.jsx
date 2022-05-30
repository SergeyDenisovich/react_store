import React, { Component } from 'react';

import styles from './Categories.module.scss';

class CategoryList extends Component {
  render() {
    const { categories, category, changeCategory } = this.props;

    return (
      <>
        {categories.length ? (
          <ul className={styles.categories}>
            {categories.map((name, index) => (
              <li
                key={index}
                className={category === name ? styles.activeCategory : undefined}
                onClick={() => changeCategory(name)}
              >
                {name.toUpperCase()}
              </li>
            ))}
          </ul>
        ) : null}
      </>
    );
  }
}

export default CategoryList;
