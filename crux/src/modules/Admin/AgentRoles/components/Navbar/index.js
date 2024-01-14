import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import AddAgent from "./components/AddAgent";
import { AppContext } from "../../../../../App";
import Search from '../Search/index'
function Navbar(props) {
  // const appContext = useContext(AppContext);
  const { groups, allAgents, roles }=props

  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        <AddAgent groups={groups} allAgents={allAgents} roles={roles} />
      </div>
      <div className={styles.subnav}>
      <Search context={props.context}/>
      </div>
    </nav>
  );
}

export default Navbar;
