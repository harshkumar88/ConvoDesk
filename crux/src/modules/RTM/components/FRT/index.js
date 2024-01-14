import React from "react";
import styles from "../../css/frt.module.css";
import { frt } from "./seed";
import { ReactComponent as Arrow } from "../../../../assets/Rtm/Arrow.svg";
function FRT() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.header_label}>FRT</label>
        <div className={styles.line}></div>
      </div>
      <div>
        <div className={styles.list_header}>
          <label className={styles.list_label}>Conversation ID</label>
          <label className={styles.list_label}>Agent </label>
          <label className={`${styles.list_label} ${styles.hidden}`}></label>
        </div>
        <div className={styles.list_values}>
          {frt?.map((item, idx) => {
            return (
              <div
                key={idx}
                className={
                  idx != frt.length - 1
                    ? `${styles.items} ${styles.items_border}`
                    : `${styles.items}`
                }
              >
                <span className={styles.item_value}>
                  {item.conversation_id}
                </span>
                <span className={styles.item_value}>{item.agent}</span>
                <span className={`${styles.item_value} ${styles.arrow}`}>
                  <Arrow />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FRT;
