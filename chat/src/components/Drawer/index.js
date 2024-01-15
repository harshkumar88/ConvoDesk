import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import { nav_data } from "./NavData";
import styles from "./style.module.css";
import { ReactComponent as OtipySmallLogo } from "../../assets/Otipy.svg";
import { ReactComponent as UsersBreak } from "../../assets/UsersBreak.svg";

import { authorise } from "../../ReactLib/auth";
import LinkItem from "./LinkItem";
import Tooltip from "../ToolTip";

function Drawer(props) {
  const appContext = useContext(AppContext);

  return (
    <>
      <div className={`${props.className} ${styles.drawer}`}>
        <NavLink
          className={styles.logo}
          to={"/home"}
          style={{ justifyContent: "center", width: "50px" }}
        >
          <OtipySmallLogo />
        </NavLink>

        {nav_data.map(function (item, idx) {
          return authorise(item.role) && <LinkItem data={item} key={idx} />;
        })}
        <Tooltip text="Break">
          <span
            className={styles.drawer_tab}
            onClick={appContext.toggleUsersBreak}
          >
            <UsersBreak />
          </span>
        </Tooltip>
      </div>
    </>
  );
}

export default Drawer;
