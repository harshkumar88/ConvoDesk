import React from "react";

import styles from "./style.module.css";

function Activity({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.customer_details}>
        <div className={styles.customer_info}>
          <span className={styles.heading}>
            <b>{data?.agent_name}</b> &nbsp;{data.text}
          </span>
          <span className={styles.created}>{data.created_at}</span>
        </div>
      </div>
    </div>
  );
}

export default Activity;
