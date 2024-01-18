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

      <span className="logout_btn" onClick={() => navigate("/logout")}>
        <Logout />
      </span>
    </header>
  );
}

export default AdminHeader;
