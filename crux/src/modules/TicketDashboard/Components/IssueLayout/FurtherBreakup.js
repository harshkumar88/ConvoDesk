import React, { useState, useEffect } from "react";
import styles from "../../css/issue.module.css";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";

function FurtherBreakup({
  label,
  value,
  type,
  clickHandler,
  changeHandler,
  deleteHandler,
  activeValue,
}) {
  const [furtherBreakup, setFurtherBreakup] = useState("");
  const [active, setActive] = useState("");
  useEffect(
    function () {
      setFurtherBreakup(label);
      setActive(value);
    },
    [(label, value)]
  );

  function onClickHandler() {
    clickHandler(type, value);
    setActive(value);
  }
  function onChangeHandler(e) {
    const change = e.target.value;
    setFurtherBreakup(change);
  }
  function onSaveHandler() {
    changeHandler(furtherBreakup, type, value, label);
  }
  function onDeleteHandler() {
    deleteHandler(type, value);
  }
  return (
    <li
      className={
        active === activeValue ? styles.list_item_active : styles.list_item
      }
    >
      <input
        type="text"
        className={styles.list_text}
        onClick={onClickHandler}
        value={furtherBreakup}
        onChange={onChangeHandler}
      />
      <span className={styles.list_icon} onClick={onSaveHandler}>
        <MdCreateNewFolder />
      </span>
      <span className={styles.list_icon} onClick={onDeleteHandler}>
        <AiFillDelete />
      </span>
    </li>
  );
}

export default FurtherBreakup;
