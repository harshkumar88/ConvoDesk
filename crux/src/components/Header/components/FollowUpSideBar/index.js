import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.css";
import { ReactComponent as Close } from "../../../../assets/CloseIcon.svg";
import Content from "./Content";
import { get_data } from "../../../../networkHandler";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";

function FollowUpSideBar({ show, setShow }) {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(false);
  let [followUpDetails, setFollowUpDetails] = useState([]);

  function handleClick() {
    setShow(false);
  }

  useEffect(() => {
    setLoader(true);
    get_data(`${API_URL}/crux/ticket/follow/up/v1/`, appContext).then(function (
      data
    ) {
      if (data) {
        setFollowUpDetails(data?.data);
        setLoader(false);
      }
    });
  }, [appContext.reload]);

  return (
    <div
      className={styles.sidenav}
      style={{
        width: show ? "100%" : "0",
      }}
    >
      <div className={styles.sidenav_body}>
        <p onClick={handleClick} className={styles.close}>
          <Close />
        </p>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3>Follow Up Details</h3>
            <h3>{followUpDetails?.length}</h3>
          </div>{" "}
          <hr className={styles.grey_hr} />
          {loader ? (
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <Content
                followUpDetails={followUpDetails}
                handleClick={handleClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowUpSideBar;
