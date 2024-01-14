import React from "react";
import ModifyAutomation from "../ModifyAutomation";
import styles from "./style.module.css";

function Subject({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.customer_details}>
        <div className={styles.customer_info}>
          <span className={styles.heading}>Subject</span>
          <span>{data?.name}</span>
        </div>
        <div className={styles.customer_info}>
          <span className={styles.heading}>Group</span>
          <span>{data?.group_name}</span>
        </div>
        <ModifyAutomation data={data} />
      </div>
    </div>
  );
}

export default Subject;
