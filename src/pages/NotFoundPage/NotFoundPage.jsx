import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;