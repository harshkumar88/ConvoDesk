import React, { useEffect, useState } from "react";
import styles from "../../css/issue.module.css";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";

function Subissue({
  label,
  type,
  value,
  clickHandler,
  changeHandler,
  deleteHandler,
  activeValue,
}) {
  const [subIssue, setSubIssue] = useState("");
  const [active, setActive] = useState(null);

  useEffect(
    function () {
      setSubIssue(label);
      setActive(value);
    },
    [label, value]
  );

  function onClickHandler() {
    clickHandler(type, value);
    setActive(value);
  }
  function onChangeHandler(e) {
    const change = e.target.value;
    setSubIssue(change);
  }
  function onSaveHandler() {
    changeHandler(subIssue, type, value, label);
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
        value={subIssue}
        onClick={onClickHandler}
        onChange={onChangeHandler}
      />

      <span className={styles.list_icon} onClick={onDeleteHandler}>
        <AiFillDelete />
      </span>
    </li>
  );
}

export default Subissue;
