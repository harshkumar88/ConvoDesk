import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import Label from "../../components/Label";
import { AppContext } from "../../App";
import { ReactComponent as Profile } from "../../assets/Profile.svg";
import SideBar from "./components/SideBar";
import Search from "./components/Search";
import { NavLink } from "react-router-dom";
import FollowUpSideBar from "./components/FollowUpSideBar";

function Header() {
  const appContext = useContext(AppContext);

  let [show, setShow] = useState(false);
  let [showFollowUp, setShowFollowUp] = useState(false);
  function handleClick() {
    setShow(!show);
  }
  function handleFollowUpClick() {
    setShowFollowUp(!showFollowUp);
  }
  return (
    <header className={styles.header}>
      <div className={styles.subheader}>
        <Label name={appContext.title} className={styles.ticket_info} />
      </div>
      <div className={styles.subheader}>
        <NavLink className="btn zIndex0" to={"/create-ticket"}>
          Create Ticket
        </NavLink>
        <button className="btn zIndex0" onClick={handleFollowUpClick}>
          Follow Ups
        </button>
        <Search className={styles.search} />
        <Profile onClick={handleClick} className={styles.profile} />
        {show && <SideBar show={show} setShow={setShow} />}
        {showFollowUp && (
          <FollowUpSideBar show={showFollowUp} setShow={setShowFollowUp} />
        )}
      </div>
    </header>
  );
}

export default Header;
