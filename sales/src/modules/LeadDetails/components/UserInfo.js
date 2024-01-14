import React from "react";
import styles from "../css/style.module.css";
function UserInfo({ data, jobTitle }) {
  return (
    <div className={styles.user_info}>
      {data.name}
      <b>
        {jobTitle} ({data.n_slot_id})
      </b>

      <div className={styles.info}>
        <label>Phone</label>
        <p>{data?.phone}</p>
      </div>
      <div className={styles.info}>
        <label>Balance</label>
        <p>{data?.balance}</p>
      </div>
      <div className={styles.info}>
        <label>Coupon Code</label>
        <p>{data?.coupon_code}</p>
      </div>
      <div className={styles.info}>
        <label>Order Count</label>
        <p>{data?.order_count}</p>
      </div>
    </div>
  );
}

export default UserInfo;
