import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { ReactComponent as Del } from "../../../../assets/header/Del.svg";
import { delete_data } from "../../../../React-lib/src/networkhandler";
import { API_URL } from "../../../../config";
import { AppContext } from "../../../../App";
function Content({ followUpDetails, handleClick }) {
  const appContext = useContext(AppContext);

  function handleDelete(e, id) {
    e.preventDefault();
    delete_data(
      `${API_URL}/crux/sales/follow/up/v1/?follow_up_id=${id}`,
      appContext,
      true
    ).then(function (data) {
      if (data?.success === true) {
        handleClick();
      }
    });
  }
  return (
    <div className={styles.details}>
      <div className={styles.details_container}>
        <div className={styles.row_1}>
          <p className={styles.heading}>Follow Up</p>{" "}
          <p className={styles.heading}>Scheduled Time</p>
        </div>
      </div>
      <div className={styles.big_wrapper}>
        {followUpDetails?.map(function (item, idx) {
          return (
            <div className={styles.sub_div}>
              <div className={styles.sub_details_container}>
                <NavLink
                  className={styles.row_2}
                  to={`/lead/details/${item?.lead_id}`}
                  onClick={handleClick}
                  key={idx}
                >
                  <p className={styles.p}>
                    {item?.name && item?.name !== undefined
                      ? `${item?.name}`
                      : `Otipy User`}
                    &nbsp;({item?.phone})
                  </p>
                  <div
                    className={`${styles.p} ${styles.bold}`}
                    style={{ flex: "1" }}
                  >
                    <p className={styles.p_div}>{item?.scheduled_time}</p>
                  </div>
                </NavLink>
              </div>
              <button
                className={styles.delete_btn}
                onClick={(e) => handleDelete(e, item?.id)}
              >
                <Del />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Content;
