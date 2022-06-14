import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Categories.module.scss';

class CategoryList extends PureComponent {
  render() {
    const { categories, changeCategory } = this.props;

    return (
      <nav className={styles.categories}>
        {categories.map((category, index) => (
          <NavLink
            to={`/${category}`}
            key={index}
            activeClassName={styles.activeCategory}
            onClick={changeCategory.bind(null, category)}
          >
            {category.toUpperCase()}
          </NavLink>
        ))}
      </nav>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  changeCategory: PropTypes.func,
};

export default CategoryList;
