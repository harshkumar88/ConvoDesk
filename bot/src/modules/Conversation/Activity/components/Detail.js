import React, { useState } from "react";
import styles from "../style.module.css";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import ExtraDetail from "./ExtraDetail";

function Detail(props) {
  const { item } = props;
  let [isActive, setActive] = useState(false);
  let isToggle = item.type !== "A" && item.type !== "R";

  function handleClick() {
    setActive(!isActive);
  }

  function handleToggle() {
    if (isToggle) {
      setActive(!isActive);
    }
  }
  function handleChatType(type) {
    if (type === "W") return "Webhook";
    else if (type === "C") return "Conditions";
    else if (type === "P") return "Property";
    else if (type === "A") return "Group Assigned";
    else return "Resolved";
  }
  return (
    <div className={styles.detail_container}>
      <div
        className={styles.detail}
        onClick={handleToggle}
        style={{ cursor: isToggle ? "pointer" : "default" }}
      >
        <span className={styles.text}>{item?.created_at}</span>
        <span className={styles.text}>{item?.flow?.name}</span>
        <span className={styles.text}> {item?.dialogue_id}</span>
        <span className={styles.text}>{handleChatType(item?.type)}</span>
        {isToggle ? (
          <span
            onClick={handleClick}
            className={`${styles.text} ${styles.text_icon}`}
          >
            {isActive ? <TiArrowSortedUp /> : <TiArrowSortedDown />}{" "}
          </span>
        ) : (
          <span
            style={{ visibility: "hidden" }}
            className={`${styles.text} ${styles.text_icon}`}
          >
            {isActive ? <TiArrowSortedUp /> : <TiArrowSortedDown />}{" "}
          </span>
        )}
      </div>
      {isActive && <ExtraDetail item={item} />}
    </div>
  );
}

export default Detail;
