import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import Label from "../../components/Label";
import { AppContext } from "../../App";
import FollowUpSideBar from "./components/FollowUpSideBar";
import SideBar from "./components/SideBar";
import Search from "./components/Search";

function Header() {
  const appContext = useContext(AppContext);
  let [show, setShow] = useState(false);
  let [showFollowUp, setShowFollowUp] = useState(false);
  function handleFollowUpClick() {
    setShowFollowUp(!showFollowUp);
  }
  function handleClick() {
    setShow(!show);
  }
  return (
    <header className={styles.header}>
      <div className={styles.subheader}>
        <Label name={appContext.title} className={styles.ticket_info} />
      </div>
      <div className={styles.subheader}>
        <button className="btn zIndex0" onClick={handleClick}>
          Create Ticket
        </button>
        <button className="btn zIndex0" onClick={handleFollowUpClick}>
          Follow Ups
        </button>
        <Search className={styles.search} placeholder="Search Tickets" />
      </div>
      {showFollowUp && (
        <FollowUpSideBar show={showFollowUp} setShow={setShowFollowUp} />
      )}
      {show ? <SideBar show={show} setShow={setShow} /> : <></>}
    </header>
  );
}

export default Header;
