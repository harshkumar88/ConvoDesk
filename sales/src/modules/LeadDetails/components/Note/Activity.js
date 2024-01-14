import React, { useContext } from "react";
import { AppContext } from "../../../../App";
import styles from "./style.module.css";

function Activity({ data }) {
  let appContext = useContext(AppContext);
  const agentDict = appContext?.filters?.agent?.choices?.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.customer_details}>
        <div className={styles.customer_info}>
          <span className={styles.heading}>
            <b> {agentDict?.[data?.agent_id]}</b> &nbsp;
            {data.text}
          </span>
          <span className={styles.created}>{data.created_at}</span>
        </div>
      </div>
    </div>
  );
}

export default Activity;
