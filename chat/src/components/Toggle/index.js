import React from "react";
import styles from "./style.module.css";

export default function Toggle({ flag, handleSubmit }) {
  return (
    <>
      <div className={styles.toggle}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={flag}
            className={styles.hide}
            onChange={handleSubmit}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
    </>
  );
}
