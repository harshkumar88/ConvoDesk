import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
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

  return (
    <>
      <div className={`${props.className} ${styles.drawer}`} open={showSidebar}>
        <img
          className={styles.img}
          alt="otipy_img"
          src={require("../../assets/boy.png")}
        />

        {nav_data.map(function (item, idx) {
          return appContext.drawer ? (
            <NavLink
              className={({ isActive }) =>
                isActive
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
              {item.title.toLowerCase() == appContext.page.toLowerCase()
                ? item.activeicon
                : item.icon}
              <span>{item.title}</span>
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
