import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import Header from './components/Header';
import Home from './pages/Home';
import ProductDescription from './pages/ProductDescription';
import Cart from './pages/Cart';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  componentDidMount() {
    if (this.props.history.location.pathname === '/' && this.props.category) {
      this.props.history.push(`/${this.props.category}`);
    }
  }

  render() {
    const { history } = this.props;

    return (
      <div className='wrapper'>
        <ErrorBoundary>
          <Header />

          <div className='container'>
            <Route history={history} exact path={'/:category'}>
              <Home />
            </Route>

            <Route history={history} exact path={'/product/:id'}>
              <ProductDescription />
            </Route>

            <Route history={history} exact path={'/order/cart'}>
              <Cart />
            </Route>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapState = ({ category }) => ({
  category: category.category,
});

export default compose(connect(mapState), withRouter)(App);
