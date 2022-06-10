import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import ProductDescription from './pages/ProductDescription';
import Cart from './pages/Cart';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
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

export default withRouter(App);
