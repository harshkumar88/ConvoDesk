import React, { useState } from "react";
import Select from "react-select";

import Property from "./Property";
import styles from "../../css/popup.module.css";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillCloseSquare } from "react-icons/ai";

function Popup({ insert, isCondition, shortNoteList }) {
  let [data, setData] = useState({});
  let [display, setDisplay] = useState(false);

  function handler(value) {
    insert(value);
    close();
  }
  function close() {
    setData({});
    setDisplay(false);
  }

  return (
    <>
      {display ? (
        <div
          className={`${styles.popup_container} ${
            isCondition ? styles.left : ""
          }`}
        >
          <button onClick={close} className={styles.close_icon}>
            <AiFillCloseSquare className={styles.insert_icon} />
          </button>

          <Property
            properties={shortNoteList}
            data={data}
            setData={setData}
            handler={handler}
          />
        </div>
      ) : (
        <button
          onClick={function () {
            setDisplay(true);
          }}
          className={styles.add_icon}
        >
          <CgPlayListAdd className={styles.insert_icon} />
        </button>
      )}
    </>
  );
}

export default Popup;
