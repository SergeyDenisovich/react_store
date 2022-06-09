import styles from './ErrorBoundary.module.scss';

function Error() {
  return (
    <section className={styles.errorMessage}>
      <h1>Sorry! Something went wrong.</h1>
      <p>Please, try again later.</p>
    </section>
  );
}

export default Error;
