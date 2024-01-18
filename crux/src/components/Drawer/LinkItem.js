import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import Card from "./Card";
import styles from "./style.module.css";

function LinkItem({ data }) {
  const [activeLink, setActiveLink] = useState(false);
  const [active, setActive] = useState(false);
  const appContext = useContext(AppContext);
  const location = useLocation();
  function focusHandler() {
    setActiveLink(true);
  }
  function leaveHandler() {
    setActiveLink(false);
  }

  function checkIncludes() {
    return (
      location.pathname.includes("teams") ||
      location.pathname.includes("workflows") ||
      location.pathname.includes("analytics")
    );
  }
  return (
    <li
      className={styles.link_li}
      onMouseEnter={focusHandler}
      onMouseLeave={leaveHandler}
    >
      <NavLink
        className={({ isActive }) =>
          isActive || (data.title == "Admin" && checkIncludes())
            ? `${styles.drawer_tab} ${styles.active}`
            : styles.drawer_tab
        }
        to={data.path}
        onClick={function () {
          setActive(data.title);
          appContext.setPage(data.title.toLowerCase());
        }}
      >
        {data.title.toLowerCase() == appContext.page.toLowerCase()
          ? data.activeicon
          : data.icon}

        {/* <span>{data.title}</span> */}
      </NavLink>
      {activeLink ? <Card name={data.title} links={data.children} /> : <></>}
    </li>
  );
}

export default LinkItem;
