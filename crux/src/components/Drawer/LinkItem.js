import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import Card from "./Card";
import styles from "./style.module.css";

function LinkItem({ data }) {
  const [activeLink, setActiveLink] = useState(false);
  const [active, setActive] = useState(false);
  const appContext = useContext(AppContext);

  function focusHandler() {
    setActiveLink(true);
  }
  function leaveHandler() {
    setActiveLink(false);
  }

  return (
    <li
      className={styles.link_li}
      onMouseEnter={focusHandler}
      onMouseLeave={leaveHandler}
    >
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.drawer_tab} ${styles.active}` : styles.drawer_tab
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
