import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import styles from "./style.module.css";
function Collapse(props) {
  const [hovered, setHovered] = useState(false);
  const { item, idx } = props;
  const appContext = useContext(AppContext);
  return (
    <NavLink
      className={`${styles.drawer_tab} ${styles.collapse}`}
      activeClassName={styles.active}
      to={item.path}
      onClick={function () {
        props.setActive(item.title);
        appContext.setPage(item.title.toLowerCase());
      }}
      onMouseEnter={function (e) {
        setHovered(true);
      }}
      onMouseLeave={function (e) {
        setHovered(false);
      }}
      key={idx}
    >
      <span>
        {item.title.toLowerCase() === appContext.page.toLowerCase()
          ? item.activeicon
          : item.icon}
      </span>
      <span
        style={{
          display:
            hovered ||
            item.title.toLowerCase() === appContext.page.toLowerCase()
              ? ""
              : "none",
        }}
      >
        {item.title}
      </span>
    </NavLink>
  );
}

export default Collapse;
