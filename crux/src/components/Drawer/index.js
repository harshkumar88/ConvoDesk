import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import { nav_data } from "./NavData";
import LinkItem from "./LinkItem";
import styles from "./style.module.css";
import { ReactComponent as TfiHeadphoneAlt } from "../../assets/drawer/icon/Tf-phone.svg";
import { ReactComponent as OtipySmallLogo } from "../../assets/Otipy.svg";
import { ReactComponent as UsersBreak } from "../../assets/drawer/icon/break.svg";
import { authorise } from "../../ReactLib/auth";
import Tooltip from "../ToolTip";
function Drawer(props) {
  const appContext = useContext(AppContext);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className={`${props.className} ${styles.drawer}`} open={showSidebar}>
        <NavLink
          className={styles.logo}
          to={"/home"}
          style={{ justifyContent: "center" }}
        >
          <OtipySmallLogo />
        </NavLink>
        {nav_data.map(function (item, idx) {
          return authorise(item.role) && <LinkItem data={item} key={idx} />;
        })}
        <Tooltip text="Dialler">
          <span
            className={styles.drawer_tab}
            onClick={appContext.toggleDialler}
          >
            <TfiHeadphoneAlt />
          </span>
        </Tooltip>
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
