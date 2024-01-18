import React from "react";
import styles from "../css/style.module.css";
function SideItem({ item }) {
  return (
    <div className={styles.item_list}>
      <div className={styles.item_flex}>
        <span className={styles.icon_style}>{item?.name[0]}</span>
        <span>{item?.name}</span>
      </div>
      <span className={styles.plus_icon}>+</span>
    </div>
  );
}

export default SideItem;
