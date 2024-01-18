import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import { nav_data } from "./NavData";
import styles from "./style.module.css";
import Collapse from "./Collapse";

function AdminDrawer(props) {
  const [active, setActive] = useState("");
  const appContext = useContext(AppContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const onToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const location = useLocation();

  return (
    <>
      <div className={`${props.className} ${styles.drawer}`} open={showSidebar}>
        {nav_data?.map(function (item, idx) {
          return appContext.drawer ? (
            <NavLink
              className={
                location.pathname.includes(item.title.toLowerCase())
                  ? `${styles.drawer_tab} ${styles.active}`
                  : styles.drawer_tab
              }
              to={item.path}
              onClick={function () {
                setActive(item.title);
                appContext.setPage(item.title.toLowerCase());
              }}
              key={idx}
            >
              <div className={styles.flex}>
                <span>
                  <img src={item.icon} />
                </span>
                <div className={styles.flex_col}>
                  <span className={styles.title_style}>{item.title}</span>
                  <span className={styles.sub_title_style}>
                    {item.subTitle}
                  </span>
                </div>
              </div>
            </NavLink>
          ) : (
            <Collapse item={item} idx={idx} setActive={setActive} />
          );
        })}
      </div>
    </>
  );
}

export default AdminDrawer;
