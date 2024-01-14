import React, { useState, useEffect } from "react";
import styles from "../../css/style.module.css";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
function JobTitle({
  label,
  value,
  type,
  clickHandler,
  changeHandler,
  deleteHandler,
  activeValue,
}) {
  const [jobTitle, setJobTitle] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    setJobTitle(label);
    setActive(value);
  }, [label, value]);

  function onClickHandler() {
    clickHandler(type, value);
    setActive(value);
  }
  function onChangeHandler(e) {
    const change = e.target.value;
    setJobTitle(change);
  }
  function onSaveHandler() {
    changeHandler(jobTitle, type, value, label);
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
        value={jobTitle}
        onClick={onClickHandler}
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
export default JobTitle;
