import React from "react";
import styles from "../css/style.module.css";
function WalletInfo({ data, retentionData }) {
  return (
    <div className={styles.user_info}>
      <div className={styles.info}>
        <label>Retention Date</label>
        <p>
          {retentionData?.retention_slot_id !== 0
            ? `${retentionData?.retention_slot_id}`
            : "-"}
        </p>
      </div>
      <div className={styles.info}>
        <label>Retentioned Order Count</label>
        <p>{retentionData?.retention_order_count}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.p}>Wallet Share</p>
        <p>{data?.wallet_share}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.p}>Reward Wallet % Used</p>
        <p>{data?.reward_wallet_percentage_used}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.p}>Recharge Sold</p>
        <p>{data?.recharge_sold}</p>
      </div>
    </div>
  );
}

export default WalletInfo;
