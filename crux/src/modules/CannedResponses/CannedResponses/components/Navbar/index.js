import React, { useContext } from "react";
import styles from "./style.module.css";
import { AppContext } from "../../../../../App";
import { NavLink } from "react-router-dom";

function Navbar({ cluster, setCluster, allClusters, query, setQuery }) {
  const appContext = useContext(AppContext);
  // function changeCluster(e) {
  //   setCluster(parseInt(e.target.value));
  // }
  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        {/* <div className={styles.cta_1}>
          <label>Groups</label>&nbsp;
          <select className="select" value={cluster} onChange={changeCluster}>
            {allClusters.map(function (item, idx) {
              return (
                <option className="option" value={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div> */}
        <NavLink className="btn" to="/workflows/canned/response/new">
          Create Canned Response
        </NavLink>
      </div>

      <div className={styles.subnav}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={function (e) {
            setQuery(e.target.value);
          }}
          placeholder="Search By Title/Shortcut"
        />

        {/* <CreateCluster />
        <DeleteCluster cluster={cluster} /> */}
      </div>
    </nav>
  );
}

export default Navbar;
