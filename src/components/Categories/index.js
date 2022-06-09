import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { withRouter } from 'react-router-dom';

import { client } from '../../client';
import { getCategories } from '../../queries/getCategories';
import { setCategory } from '../../store/slices/categorySlice';
import CategoryList from './CategoryList';

class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    // request category data
    const queryCategories = async () => {
      const { categories } = await client.post(getCategories);
      const categoryNames = categories.map(({ name }) => name);

      this.setState({ categories: categoryNames });
      const category = categoryNames[0];
      this.props.history.push(`/${this.props.category || category}`);
    };

    queryCategories();
  }

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
