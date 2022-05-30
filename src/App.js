import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className='container'>
        <h1>Header</h1>

        <Switch>
          <Route history={history} exact path={'/'}>
            <h2>Home</h2>
            <Link to={'/cart'}>To Cart</Link>
          </Route>

          <Route history={history} path={'/cart'}>
            <h2>Cart</h2>
            <Link to={'/'}>home</Link>
          </Route>

          <Route history={history} path={'*'}>
            <h2>Not Found</h2>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
