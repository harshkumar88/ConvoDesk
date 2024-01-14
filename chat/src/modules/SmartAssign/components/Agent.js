import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import { put_data } from "../../../React-lib/src/networkhandler";
import styles from "../css/style.module.css";
function Agent(props) {
  const { item } = props;
  const appContext = useContext(AppContext);
  function updateAgent(e) {
    e.preventDefault();
    put_data(
      `${API_URL}/neon/chat/smart/assign/v1/`,
      { is_active: e.target.checked, agent_id: item["id"] },
      appContext,
      true
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.incentive_details}>
        <div
          className={styles.details_info}
          style={{ display: "flex", flexDirection: "row", flex: 4 }}
        >
          <div className={styles.incentive_info}>
            <span className={styles.heading}>Agent</span>
            <span>{item?.name}</span>
          </div>
          <div className={styles.incentive_info}>
            <span className={styles.heading}>Chat Count</span>
            <span>{item?.chat_count}</span>
          </div>
          <div className={styles.incentive_info}>
            <span className={styles.heading}>Group</span>
            <span>
              <span>{item.groups.join(", ")}</span>
            </span>
          </div>
        </div>
        <div
          className={styles.toggle_details}
          style={{ display: "flex", flexDirection: "row", flex: 1 }}
        >
          <div className={`${styles.incentive_info} ${styles.toggle}`}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={item?.is_active}
                className={styles.hide}
                onChange={updateAgent}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;
