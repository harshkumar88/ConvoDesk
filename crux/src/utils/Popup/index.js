import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { AiOutlineClose } from "react-icons/ai";

function PopUp(props) {
  const { closeState, handleOpen, btnStyling, header } = props;
  let [display, setDisplay] = useState(false);
  const formRef = useRef(null);
  useEffect(
    function () {
      if (closeState && closeState != undefined) {
        close();
      }
    },
    [closeState]
  );
  function close() {
    setDisplay(false);
  }
  function open() {
    if (handleOpen && handleOpen != undefined) {
      handleOpen();
    }
    setDisplay(true);
  }
  function handleClick(e) {
    if (formRef && formRef.current && formRef.current.contains(e.target)) {
      return;
    }
    close();
  }
  return (
    <>
      <button
        className={
          btnStyling && btnStyling != undefined
            ? btnStyling
            : props.isDateRange && props.isDateRange != undefined
            ? props.btnName.length < 20
              ? styles.date_range_1
              : styles.date_range_2
            : styles.trigger_btn
        }
        onClick={open}
      >
        {props.btnName}
      </button>
      {display && (
        <div className={styles.overlay} onClick={handleClick}>
          <div className={styles.modal} ref={formRef}>
            <div className={styles.container}>
              {header ? header : null}
              <span
                className={styles.icon}
                onClick={close}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineClose />
              </span>
              <div className={styles.popup_body}>{props.children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PopUp;
