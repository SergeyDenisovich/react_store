import React, { Component } from 'react';

import styles from './NotFound.module.scss';

class NotFound extends Component {
  render() {
    return (
      <section className={styles.root}>
        <h1>
          <span>404</span>
          <span>Nothing was found</span>
        </h1>
        <p className={styles.description}>Unfortunately, this page is not available in our store</p>
      </section>
    );
  }
}

export default NotFound;
