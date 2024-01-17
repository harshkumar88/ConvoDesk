import React, { useContext } from "react";
import styles from "./style.module.css";
import Label from "../../components/Label";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logout } from "../../assets/drawer/icon/Logout.svg";
function AdminHeader() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.subheader}>
        <Label name="Admin" className={styles.ticket_info} />
      </div>
      {/* <div className={styles.subheader}>
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
      </div> */}
      <span className="logout_btn" onClick={() => navigate("/logout")}>
        <Logout />
      </span>
    </header>
  );
}

export default AdminHeader;
