import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      this.props.setCategory(categoryNames[0]);
    };

    queryCategories();
  }

  changeCategory = (categoryName) => {
    this.props.setCategory(categoryName);
  };

  render() {
    return (
      <CategoryList
        category={this.props.category}
        categories={this.state.categories}
        changeCategory={this.changeCategory}
      />
    );
  }
}

const mapState = ({ category }) => ({
  category: category.category,
});

export default connect(mapState, { setCategory })(Categories);
