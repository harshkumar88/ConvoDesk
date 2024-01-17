import React, { useEffect, useState } from "react";
import styles from "../../css/issue.module.css";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
function Issue({
  idx,
  label,
  value,
  type,
  clickHandler,
  changeHandler,
  deleteHandler,
  activeValue,
  setState,
  state,
}) {
  const [issue, setIssue] = useState("");
  const [active, setActive] = useState();

  useEffect(() => {
    setIssue(label);
    setActive(value);
  }, [label, value]);
  function onClickHandler() {
    setState(idx);
  }
  function onChangeHandler(e) {
    const change = e.target.value;
    changeHandler(change, idx, type);
  }
  function onSaveHandler() {
    changeHandler(issue, type, value, label);
  }
  function onDeleteHandler() {
    deleteHandler(type, value);
  }
  return (
    <li className={idx === state ? styles.list_item_active : styles.list_item}>
      <input
        type="text"
        className={styles.list_text}
        value={issue}
        onClick={onClickHandler}
        onChange={onChangeHandler}
      />

      <span className={styles.list_icon} onClick={onDeleteHandler}>
        <AiFillDelete />
      </span>
    </li>
  );
}
export default Issue;
