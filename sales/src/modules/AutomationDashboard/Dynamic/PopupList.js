import React from "react";

import styles from "./popup.module.css";
function PopupList({ ticketData, popupData, item, handleClick }) {
  return (
    <span
      className={styles.item_label}
      onClick={() => handleClick(item?.value)}
    >
      {item?.label}
    </span>
  );
}

export default PopupList;
