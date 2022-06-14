import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';

import { client } from '../../client';
import { getCategories } from '../../queries/getCategories';
import { setCategory } from '../../store/slices/categorySlice';
import CategoryList from './CategoryList';

class Categories extends PureComponent {
  initialCategory = '';
  state = {
    categories: [],
  };

  componentDidMount() {
    const queryCategories = async () => {
      const { categories } = await client.post(getCategories);
      const categoryNames = categories.map(({ name }) => name);
      const initialCategory = categoryNames[0];

      this.setState({ categories: categoryNames });

      this.setInitialCategory(initialCategory);
    };

    queryCategories();
  }

  setInitialCategory = (category) => {
    if (!this.initialCategory && !this.props.category) {
      this.props.history.push(`/${category}`);
      this.props.setCategory(category);
    }
  };

  changeCategory = (categoryName) => {
    this.props.setCategory(categoryName);
  };

  render() {
    const { categories } = this.state;

    return <CategoryList categories={categories} changeCategory={this.changeCategory} />;
  }
}

const mapState = ({ category }) => ({
  category: category.category,
});

export default compose(connect(mapState, { setCategory }), withRouter)(Categories);
