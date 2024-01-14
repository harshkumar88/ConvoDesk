import React from "react";
import styles from "../../css/daily.module.css";
import { ReactComponent as Arrow } from "../../../../assets/Dashboard/Arrow.svg";

function Card({ svg, headerText, data }) {
  return (
    <div className={styles.cards}>
      <div className={styles.header}>
        <span className={styles.header_item}>
          {svg}
          {headerText}
        </span>
        <span>
          <Arrow />
        </span>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list_container}>
        {Object.keys(data).map((key, idx) => {
          return (
            <div key={idx} className={styles.list_item}>
              <span>{key}</span>
              <span>{data[key]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
