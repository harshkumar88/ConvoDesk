import React from "react";
import styles from "./style.module.css";
function Stage(props) {
  let { value, options } = props;
  return (
    <>
      <div className={styles.stage_container}>
        {options.map(function (item, idx) {
          return (
            <div
              className={
                value >= item.value
                  ? `${styles.stage_div} ${styles.active}`
                  : styles.stage_div
              }
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Stage;
