import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import { AppContext } from "../../../../App";

function Navbar({ group, setGroup, allGroups }) {
  const appContext = useContext(AppContext);

  function changeGroup(e) {
    setGroup(parseInt(e.target.value));
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        <div className={styles.cta_1}>
          {/* <label>Groups</label>&nbsp;
          <select className="select" value={group} onChange={changeGroup}>
            {allGroups.map(function (item, idx) {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
