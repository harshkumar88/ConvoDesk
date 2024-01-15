import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../App";
import { post_data_without_reload } from "../../../../../ReactLib/networkhandler";
import PopUp from "../../../../../utils/Popup";
import styles from "./style.module.css";
import { API_URL } from "../../../../../config";

function LeadCount({ filters }) {
  let [close, setClose] = useState(false);
  let [leadCount, setLeadCount] = useState(0);
  let [loader, setLoader] = useState(true);
  const appContext = useContext(AppContext);

  useEffect(
    function () {
      setClose(false);
      setLoader(true);
    },
    [appContext.reload]
  );

  function handleOpen() {
    post_data_without_reload(
      `${API_URL}/crux/sales/lead/count/v1/`,
      {
        filters: filters,
      },
      appContext
    ).then(function (data) {
      if (data) {
        setLeadCount(data.data);
        setLoader(false);
      }
    });
  }
  return (
    <PopUp
      btnName={"Lead Count"}
      btnStyling="btn"
      handleOpen={handleOpen}
      closeState={close}
    >
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <h1 className={styles.heading}>Lead Count : {leadCount}</h1>
      )}
    </PopUp>
  );
}

export default LeadCount;
