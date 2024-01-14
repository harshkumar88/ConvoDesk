import React, { useEffect, useState } from "react";
import styles from "../../css/style.module.css";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
function Issue({
  label,
  value,
  type,
  clickHandler,
  changeHandler,
  deleteHandler,
  activeValue,
}) {
  const [issue, setIssue] = useState("");
  const [active, setActive] = useState();

  useEffect(() => {
    setIssue(label);
    setActive(value);
  }, [label, value]);
  function onClickHandler() {
    clickHandler(type, value);
    setActive(value);
  }
  function onChangeHandler(e) {
    const change = e.target.value;
    setIssue(change);
  }
  function onSaveHandler() {
    changeHandler(issue, type, value, label);
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
        value={issue}
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
export default Issue;
