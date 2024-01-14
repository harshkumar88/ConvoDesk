import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { AppContext } from "../../App";
import { IoMdAdd } from "react-icons/io";
function PopUp(props) {
  const { closeState, handleOpen, handleClose, popup, btnStyling, disabled } =
    props;
  const appContext = useContext(AppContext);
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
            : styles.trigger_btn
        }
        onClick={open}
        title={
          props?.isCreateFlow && props?.isCreateFlow != undefined
            ? props.createName
            : ""
        }
      >
        {props?.isCreateFlow && props?.isCreateFlow != undefined ? (
          <IoMdAdd />
        ) : (
          ""
        )}
        {props.btnName}
      </button>
      {display && (
        <div className={styles.overlay} onClick={handleClick}>
          <div className={styles.modal} ref={formRef}>
            <div className={styles.container}>
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
