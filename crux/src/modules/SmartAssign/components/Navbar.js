import React, { useState } from "react";
import styles from "../css/style.module.css";

const Navbar = (props) => {
  const { query, setQuery, agents } = props.context;

  return (
    <div className={styles.navbar}>
      <div className={styles.subnav}></div>
      <div className={styles.subnav}>
        <input
          className={styles.input}
          placeholder="Search by Name / Email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Navbar;
