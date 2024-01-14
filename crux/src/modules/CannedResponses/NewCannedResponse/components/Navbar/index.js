import React, { useContext } from "react";
import styles from "./style.module.css";
import { AppContext } from "../../../../../App";

function Navbar({ cluster, setCluster, allClusters }) {
  const appContext = useContext(AppContext);
  function changeCluster(e) {
    setCluster(parseInt(e.target.value));
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        <div className={styles.cta_1}>
          <label>Clusters</label>&nbsp;
          <select
            className={styles.select}
            value={cluster}
            onChange={changeCluster}
          >
            {allClusters.map(function (item, idx) {
              return <option value={item.id}>{item.title}</option>;
            })}
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
