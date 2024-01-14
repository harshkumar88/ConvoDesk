import React from "react";
import styles from "../css/style.module.css";
function SideItem({ item }) {
  return (
    <div className={styles.item_list}>
      <div className={styles.item_flex}>
        <span className={styles.icon_style}>{item?.label}</span>
        <span>{item?.value}</span>
      </div>
      <span className={styles.plus_icon}>+</span>
    </div>
  );
}

export default SideItem;
