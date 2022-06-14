import { PureComponent } from 'react';

import styles from './ErrorBoundary.module.scss';

class Error extends PureComponent {
  render() {
    return (
      <section className={styles.errorMessage}>
        <h1>Sorry! Something went wrong.</h1>
        <p>Please, try again later.</p>
      </section>
    );
  }
}

export default Error;
