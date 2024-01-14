import React, { useContext } from "react";

import styles from "./style.module.css";
import Label from "../../components/Label";
import { AppContext } from "../../App";

import Search from "./components/Search";
import { NavLink } from "react-router-dom";

function Header() {
  const appContext = useContext(AppContext);

  return (
    <header className={styles.header}>
      <div className={styles.subheader}>
        {/* <Label name={page} className={styles.ticket_info} icon={<FaStar />} /> */}
        <Label name={appContext.title} className={styles.ticket_info} />
      </div>
      <div className={styles.subheader}>
        {/* <select
          className={styles.select}
          onChange={handleNavigate}
          defaultValue={link}
        >
          {newOptions.map(function (item, idx) {
            return <option value={item.value}>{item.name}</option>;
          })}
        </select> */}
        {/* <CreateTicket /> */}
        <NavLink className="btn" to={"/create-ticket"}>
          Create Ticket
        </NavLink>
        {/* <button className="btn">New Ticket</button> */}
        {/* <Search className={styles.search} placeholder="Search Tickets" /> */}
        <Search className={styles.search} placeholder="Search Tickets" />
        {/* <button className={styles.icon_btn}>
          <MdNotifications />
        </button>
        <button className={styles.icon_btn}>
          <MdOutlineContactSupport />
        </button>
        <button className={styles.icon_btn}>
          <CgProfile />
        </button> */}
      </div>
    </header>
  );
}

export default Header;
