import React, { useEffect, useState } from "react";
import styles from "../css/popup.module.css";
import PopUp from "../../../utils/Popup";
import { API_URL } from "../../../config";
import { get_data, patch_data } from "../../../networkHandler";
import { getNSlot } from "../../../utils/utility";
function ExceptionFlow({ phone, appContext }) {
  let [close, setClose] = useState(false);
  let [exceptionalPayload, setExceptionalPayload] = useState({});
  useEffect(() => {
    setClose(false);
  }, [phone, appContext.reload]);

  function getExceptionalRefundData() {
    get_data(`${API_URL}/crux/users/data/v1/?phone=${phone}`, appContext).then(
      function (data) {
        if (data) {
          setExceptionalPayload({
            phone: phone,
            exceptional_refund: data?.data?.exceptional_refund,
            exceptional_refund_slot: parseInt(getNSlot()),
          });
        }
      }
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    patch_data(
      `${API_URL}/crux/users/data/v1/`,
      exceptionalPayload,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }

  function handleExceptionalFlow(e) {
    const value = e.target.value;
    setExceptionalPayload({
      ...exceptionalPayload,
      exceptional_refund: value == "Yes",
      exceptional_refund_slot: parseInt(getNSlot()),
    });
  }

  return (
    <PopUp
      btnName={"Exceptional Refund"}
      btnStyling="btn"
      closeState={close}
      handleOpen={getExceptionalRefundData}
    >
      <h1 className={styles.heading}>Exceptional Refund</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.exception_wrapper}>
          <div className={styles.radio_wrapper}>
            <div className={styles.radio_div}>
              <input
                type="radio"
                name="exceptionalFlow"
                onChange={handleExceptionalFlow}
                value="Yes"
                checked={exceptionalPayload?.exceptional_refund}
              />
              <label className={styles.radio_text} htmlFor="">
                Yes
              </label>
            </div>
            <div className={styles.radio_div}>
              <input
                type="radio"
                name="exceptionalFlow"
                onChange={handleExceptionalFlow}
                value="No"
                checked={!exceptionalPayload?.exceptional_refund}
              />
              <label className={styles.radio_text} htmlFor="">
                No
              </label>
            </div>
          </div>
          <div
            className={`${styles.input_container} ${styles.submit_container}`}
          >
            <input className="dark-btn" type="submit" />
          </div>
        </div>
      </form>
    </PopUp>
  );
}

export default ExceptionFlow;
