import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import ProductDescription from './pages/ProductDescription';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className='container'>
        <Header />

        <Switch>
          <Route history={history} exact path={'/'}>
            <Home />
          </Route>

          <Route history={history} path={'/product/:id'}>
            <ProductDescription />
          </Route>

          <Route history={history} path={'/cart'}>
            <h1 style={{ marginTop: 90 }}>Cart page</h1>
          </Route>

          <Route history={history} path={'*'}>
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
