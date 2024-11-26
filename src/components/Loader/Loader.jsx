import { RotatingLines } from "react-loader-spinner"; // npm i react-loader-spinner
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;