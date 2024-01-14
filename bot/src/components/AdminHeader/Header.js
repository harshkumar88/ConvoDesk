import React, { useContext } from "react";

import styles from "./style.module.css";
import Label from "../../components/Label";
import { AppContext } from "../../App";

import { NavLink } from "react-router-dom";

function AdminHeader() {
  const appContext = useContext(AppContext);

  return (
    <header className={styles.header}>
      <div className={styles.subheader}>
        <Label name={appContext.title} className={styles.ticket_info} />
      </div>
      <div className={styles.subheader}>
        <NavLink className="btn" to={"/smart-assign"}>
          Smart Assign
        </NavLink>
        <NavLink className="btn" to={"/agents"}>
          Agents
        </NavLink>
        <NavLink className="btn" to={"/users"}>
          Users
        </NavLink>
        <NavLink className="btn" to={"/business-hour"}>
          Business Hour
        </NavLink>
        <NavLink className="btn" to={"/automation"}>
          Automation
        </NavLink>
        <NavLink className="btn" to={"/disposition"}>
          Disposition
        </NavLink>
      </div>
    </header>
  );
}

export default AdminHeader;
