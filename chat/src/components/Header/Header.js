import React from "react";
import Search from "./components/Search";
import styles from "./style.module.css";
import { ReactComponent as Profile } from "../../assets/Profile.svg";
import SideBar from "./components/SideBar";
import { useState } from "react";

function Header() {
  let [show, setShow] = useState(false);
  function handleClick() {
    setShow(!show);
  }
  return (
    <header className={styles.header}>
      <div className={styles.subheader}>
        <h3>Team Inbox</h3>
      </div>
      <div className={styles.subheader}>
        <Search className={styles.search} />
        <Profile onClick={handleClick} className={styles.profile} />
        {show && <SideBar show={show} setShow={setShow} />}
      </div>
    </header>
  );
}

export default Header;
