import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { AppContext } from "../../../../../../App";
import PopUp from "../../../../../../utils/Popup";
import { post_data } from "../../../../../../React-lib/src/networkhandler";
import { API_URL } from "../../../../../../config";

function Ivr({ conversationDetails }) {
  const appContext = useContext(AppContext);

  let [close, setClose] = useState(false);
  useEffect(
    function () {
      setClose(false);
    },
    [appContext.reload, conversationDetails]
  );

  function handleSubmit(e) {
    setClose(true);
    e.preventDefault();

    post_data(
      `${API_URL}/crux/ivr/blast/v1/`,
      {
        phone: conversationDetails.phone,
        conversation_id: conversationDetails.id,
      },
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }

  return (
    <PopUp
      btnName={"IVR Blast"}
      btnStyling={styles.popup_btn}
      closeState={close}
    >
      <h1 className={styles.heading}>IVR Blast</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_box}>
          <h2 className={styles.h2}>
            Are you sure you want to make an IVR blast?
          </h2>
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input type="submit" className={styles.submit_btn} />
        </div>
      </form>
    </PopUp>
  );
}

export default Ivr;
