import React, { useEffect } from "react";
import styles from "./style.module.css";
function SideBar({ show, phone, setShow }) {
  useEffect(function () {
    window.addEventListener("message", (event) => {
      // console.log("support panel events", event);
    });
  }, []);
  function handleClick() {
    setShow(false);
  }
  return (
    <div className={styles.sidenav} style={{ width: show ? "96%" : "0" }}>
      <div className={styles.sidenav_body} style={{ width: "97%" }}>
        <p onClick={handleClick} className={styles.close}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
          </svg>
        </p>
        <iframe
          src={`https://support.crofarm.com/freshdesk/?phone=${phone}`}
          style={{ width: "93vw", height: "94vh" }}
        />
      </div>
    </div>
  );
}

export default SideBar;
