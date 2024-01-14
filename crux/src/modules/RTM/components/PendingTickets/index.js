import React from "react";
import styles from "../../css/pending.module.css";

function PendingTickets({ pendingTickets }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.header_label}>Pending Tickets</label>
        <div className={styles.line}></div>
      </div>
      <div className={styles.pending_types_layout}>
        {pendingTickets?.map((item, idx) => {
          return (
            <div className={styles.list_1} key={idx}>
              <div className={styles.list_header}>
                <label className={styles.list_label}>{item.group}</label>
              </div>
              <div className={styles.list_items}>
                <div className={styles.list_item}>
                  <span className={styles.list_item_key}> {"<15min"}</span>
                  <span className={styles.list_item_value}>
                    {item.less_than_15min}
                  </span>
                </div>
                <div className={styles.list_item}>
                  <span className={styles.list_item_key}>{"15min-30min"}</span>
                  <span className={styles.list_item_value}>
                    {item.between_15_to_30min}
                  </span>
                </div>
                <div className={styles.list_item}>
                  <span className={styles.list_item_key}>{">30min"}</span>
                  <span className={styles.list_item_value}>
                    {item.greater_than_30min}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PendingTickets;
