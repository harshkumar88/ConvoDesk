import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import AddAgent from "./components/AddAgent";
import { AppContext } from "../../../../../App";

function Navbar({ groups, allAgents, roles }) {
  const appContext = useContext(AppContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        {/* <button className="btn" onClick={toggle}>
          {showActivity ? "Hide " : "Show "}Activity{" "}
        </button>
        <AddNote ticket_id={ticket_id} />
        <button className="btn">Merge</button>
        <button className="btn">Delete</button> */}
      </div>

      <div className={styles.subnav}>
        <AddAgent groups={groups} allAgents={allAgents} roles={roles} />
      </div>
    </nav>
  );
}

export default Navbar;
