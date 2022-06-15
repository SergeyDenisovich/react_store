import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { client } from '../../client';

import CategoryList from './CategoryList';
import { getCategories } from '../../queries/getCategories';
import { setCategory } from '../../store/slices/categorySlice';

class Categories extends PureComponent {
  // initialCategory = '';
  state = {
    initialCategory: '',
    categories: [],
  };

  componentDidMount() {
    const queryCategories = async () => {
      const { categories } = await client.post(getCategories);
      const categoryNames = categories.map(({ name }) => name);
      return categoryNames;
    };

    queryCategories().then((categories) => {
      const category = categories[0];

      console.log(this.props);

      if (category && !this.props.category) {
        this.props.history.push(`/${category}`);
        this.props.setCategory(category);
      }

      this.setState({ categories });
    });
  }

  changeCategory = (categoryName) => {
    this.props.setCategory(categoryName);
  };

  render() {
    const { categories } = this.state;

    console.log('render');

    return <CategoryList categories={categories} changeCategory={this.changeCategory} />;
  }
}

const mapState = ({ category }) => ({
  category: category.category,
});

Categories.propTypes = {
  category: PropTypes.string,
  setCategory: PropTypes.func,
};

export default compose(connect(mapState, { setCategory }), withRouter)(Categories);
