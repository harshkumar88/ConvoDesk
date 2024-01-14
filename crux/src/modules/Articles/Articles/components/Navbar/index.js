import React, { useContext } from "react";
import styles from "./style.module.css";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import { AppContext } from "../../../../../App";
import CreateCluster from "./components/CreateCluster";
import DeleteCluster from "./components/DeleteCluster";
import { NavLink } from "react-router-dom";

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
          <select className="select" value={cluster} onChange={changeCluster}>
            {allClusters.map(function (item, idx) {
              return (
                <option className="option" value={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className={styles.subnav}>
        <NavLink className="btn" to="/article/new">
          Create Article
        </NavLink>
        <CreateCluster />
        <DeleteCluster cluster={cluster} />
      </div>
    </nav>
  );
}

export default Navbar;
