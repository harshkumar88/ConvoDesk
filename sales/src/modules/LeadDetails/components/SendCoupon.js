import React, { useContext, useEffect, useState } from "react";
import { post_data } from "../../../networkHandler";
import { AppContext } from "../../../App";
import styles from "../css/popup.module.css";
import { API_URL } from "../../../config";
import PopUp from "../../../utils/Popup";
function SendCoupon({ lead_id }) {
  let [close, setClose] = useState(false);
  let [amt, setAmt] = useState(30);
  let [validity, setValidity] = useState(1);
  useEffect(function () {
    setClose(false);
  }, []);
  const appContext = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    post_data(
      `${API_URL}/crux/sales/send/coupon/v1/`,
      { lead_id: lead_id, amount: amt, validity: validity },
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }

  return (
    <PopUp btnName={"Send Coupon"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Send Coupon</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Amount</label>
          <input
            type="tel"
            className={styles.input}
            value={amt}
            onChange={function (e) {
              setAmt(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Validation</label>
          <input
            type="tel"
            className={styles.input}
            value={validity}
            onChange={function (e) {
              setValidity(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input
            className={styles.submit}
            style={{ cursor: "pointer" }}
            type="submit"
          />
        </div>
      </form>
    </PopUp>
  );
}

export default SendCoupon;
