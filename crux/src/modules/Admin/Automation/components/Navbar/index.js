import React, { useContext } from "react";
import styles from "./style.module.css";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import { AppContext } from "../../../../../App";
import AddAutomation from "../AddAutomation";

function Navbar() {
  const appContext = useContext(AppContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        <AddAutomation />
        {/* <AddNote ticket_id={ticket_id} /> */}
        {/* <button className={styles.popup_btn}>Merge</button>
        <button className={styles.popup_btn}>Delete</button> */}
      </div>

      <div className={styles.subnav}>
        {/* <AddAgent
          groups={[{ name: "ECU", id: 1 }]}
          supervisors={[{ name: "Himanshu", id: 1 }]}
          roles={[{ name: "Login", id: 1 }]}
        /> */}
      </div>
    </nav>
  );
}

export default Navbar;
