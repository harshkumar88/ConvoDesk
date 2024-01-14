import React from "react";
import styles from "../css/style.module.css";
import DatePicker from "../../../utils/DatePicker";

function Navbar({ agentData, handleDate }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        {" "}
        <div className={styles.header}>
          <div className={styles.img_container}>
            <div className={styles.round}>{agentData?.name?.charAt(0)}</div>
            <div className={styles.agent_details}>
              <span className={styles.name}>{agentData?.name}</span>
              <span>{agentData?.email}</span>
            </div>
          </div>

          <div className={styles.date_picker_container}>
            <DatePicker callBackfn={handleDate} isAgentDashboard={true} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
