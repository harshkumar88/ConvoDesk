import React, { useContext, useState } from "react";
import ModifyAgent from "../ModifyAgents";
import ModifyAutomation from "../ModifyAgents";
import ModifyBusinessHour from "../ModifyBusinessHour";
import styles from "./style.module.css";

function GroupDetails({ data, groups }) {
  return (
    <div className={styles.container}>
      <div className={styles.customer_details}>
        <div></div>
        <div className={styles.customer_info} style={{ flex: ".3" }}>
          <span className={styles.heading}>Group</span>
          <span>{data?.name}</span>
        </div>
        <div className={styles.customer_info}>
          <span className={styles.heading}>Ecosystem</span>
          <span>{data?.ecosys_name}</span>
        </div>
        {/* <div className={styles.customer_info}>
          <span className={styles.heading}>Group</span>
          <span>{data?.group_name}</span>
        </div> */}
        <ModifyAgent data={data} />
        <ModifyBusinessHour data={data} />
      </div>
    </div>
  );
}

export default GroupDetails;
