import React from "react";
import styles from "../css/ticket.module.css";
function UserHeader(props) {
  return (
    <div className={`${styles.ticket} ${styles.header}`}>
      <span className={styles.name}>Name</span>
      <span>Job Title</span>
      <span>Status</span>
      <span>Sales Owner</span>
      <span>Retention Date</span>
      <span>Retentioned Order</span>
      <span>Coupon Code</span>
      <span>Balance</span>
      <span>Order Count</span>
      <span> Recharge Value </span>
      <span> Recharge Date </span>
      <span>Reward Wallet Used </span>
      <span>Created At</span>
      <span>Updated At</span>
    </div>
  );
}

export default UserHeader;
