import { NavLink } from 'react-router-dom';

import styles from './Categories.module.scss';

function CategoryList({ categories, changeCategory }) {
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

export default CategoryList;
