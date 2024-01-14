import React from "react";
import styles from "../css/style.module.css";
function AccountInfo({ data }) {
  return (
    <div className={styles.user_info}>
      <div className={styles.info}>
        <label>Address</label>
        <p>{data?.address}</p>
      </div>
      <div className={styles.info}>
        <label>City</label>
        <p>{data?.city}</p>
      </div>
      <div className={styles.info}>
        <label>Zipcode</label>
        <p>{data?.zipcode}</p>
      </div>
      <div className={styles.info}>
        <label>State</label>
        <p>{data?.state}</p>
      </div>
      <div className={styles.info}>
        <label>Delivery Partner</label>
        <p>{data?.delivery_partner_id}</p>
      </div>
    </div>
  );
}

export default AccountInfo;
