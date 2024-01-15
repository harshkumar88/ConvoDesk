import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import { put_data } from "../../../ReactLib/networkhandler";
import styles from "../css/style.module.css";
function Agent(props) {
  const { item } = props;

  const appContext = useContext(AppContext);
  function updateAgent(e) {
    e.preventDefault();
    console.log(e.target.checked);
    put_data(
      `${API_URL}/crux/users/smart/assign/v1/`,
      { is_active: e.target.checked, agent_id: item["id"] },
      appContext,
      true
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.incentive_details}>
        <div className={styles.details_info}>
          <div className={styles.incentive_info}>
            <span className={styles.heading}>Agent</span>
            <span>{item?.name}</span>
          </div>
          <div className={styles.incentive_info}>
            <span className={styles.heading}>Email</span>
            <span>{item?.email}</span>
          </div>
          <div className={styles.incentive_info}>
            <span className={styles.heading}>Updated At</span>
            <span>{item?.updated_at}</span>
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
