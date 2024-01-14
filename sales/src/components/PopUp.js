import React, { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import styles from "./PopUp.module.css";
function PopUp(props) {
  let [display, setDisplay] = useState(false);
  const {
    title,
    Header,
    handleOpen,
    handlePopup,
    handlePromise,
    setRef,
    handleCancel,
    btnStyling,
  } = props;
  const btnRef = useRef(null);
  useEffect(function () {
    if (setRef) setRef(btnRef);
  }, []);
  function handleSubmit() {
    if (handlePromise && handlePromise != undefined) {
      handlePromise().then(
        function (data) {
          if (handleOpen && handleOpen != undefined) {
            handleOpen();
          }
          setDisplay(true);
        },
        function (error) {}
      );
    } else {
      if (handleOpen && handleOpen != undefined) {
        handleOpen();
      }
      setDisplay(true);
    }
  }
  function close() {
    setDisplay(false);
    if (handleCancel) {
      handleCancel();
    }
  }
  return (
    <>
      <button
        className={
          btnStyling && btnStyling !== undefined ? btnStyling : styles.popup_btn
        }
        ref={btnRef}
        onClick={handleSubmit}
      >
        {title}
      </button>

      {display && (
        <Overlay>
          <form
            className={styles.modal}
            onSubmit={function (e) {
              e.preventDefault();
              let a = handlePopup(e);
              if (a) {
              } else {
                close();
              }
            }}
          >
            <div className={styles.popup_header}>
              <Header />
            </div>
            <div className={styles.container}>
              <div className={styles.popup_body}>{props.children}</div>

              <div className={styles.popup_cta}>
                <button className={styles.popup_btn_1} onClick={close}>
                  Cancel
                </button>
                <button className={styles.popup_btn_1} type="submit">
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </Overlay>
      )}
    </>
  );
}

export default PopUp;
