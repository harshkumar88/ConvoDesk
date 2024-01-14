import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import { nav_data } from "./NavData";
import styles from "./style.module.css";
import { TfiHeadphoneAlt } from "react-icons/tfi";
// import { ReactComponent as OtipySmallLogo } from "../../assets/Otipy.svg";
import LinkItem from "./LinkItem";
import Tooltip from "../ToolTip";

function Drawer(props) {
  const appContext = useContext(AppContext);
  const [showSidebar, setShowSidebar] = useState(false);

  const onToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className={`${props.className} ${styles.drawer}`} open={showSidebar}>
        <NavLink
          className={styles.logo}
          to={"/home"}
          style={{ justifyContent: "center" }}
        >
          {/* <OtipySmallLogo /> */}
        </NavLink>

        {nav_data.map(function (item, idx) {
          return <LinkItem data={item} key={idx} />;
        })}
      </div>
    </>
  );
}

export default Drawer;
