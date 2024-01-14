import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";
import Popup from "./Popup";

const DynamicPayload = ({
  label,
  handleTicketChange,
  item,
  showbtn,
  setShowBtn,
  setHideBtn1,
  setHideBtn2,
}) => {
  const [jsonPayload, setJsonPayload] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const textAreaRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (item?.webhook && item?.webhook?.[label]) {
      let jsonData = JSON.parse(item?.webhook?.[label]);
      if (jsonData) {
        setJsonPayload(jsonData);
      }
    }
  }, [item]);
  const handleValidation = () => {
    setShowBtn(false);
    try {
      const placeholderMap = {};
      let counter = 0;

      const replacedString = jsonPayload?.replace(/{{[^{}]+}}/g, (match) => {
        const placeholder = `___placeholder_${counter++}___`;
        placeholderMap[placeholder] = match;
        return JSON.stringify(placeholder);
      });

      let data = JSON.parse(replacedString);
      if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      } else {
        setError("not a valid json");
        return;
      }
      const dynamicPayload = JSON.stringify(jsonPayload);
      JSON.parse(dynamicPayload);
      handleTicketChange(label, dynamicPayload);

      setData("added successfully");
    } catch (error) {
      setError(error.message);
      setData("");
    }
  };

  const handleAppend = (appendedText) => {
    const textarea = textAreaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    const prefix = jsonPayload.substring(0, startPos);
    const suffix = jsonPayload.substring(endPos);
    // const appendedText = "yourAppendedText"; // Replace this with the text you want to append

    setJsonPayload(prefix + appendedText + suffix);

    // Move the cursor to the end of the appended text
    textarea.setSelectionRange(
      startPos + appendedText.length,
      startPos + appendedText.length
    );
    textarea.focus();
  };

  const handleDynamicVariables = () => {
    // console.log("j");
    setError("");
    setData("");
    setShowBtn(!showbtn);
    setHideBtn1(false);
    setHideBtn2(false);
  };

  function handleClose(e) {
    if (popupRef && popupRef.current && popupRef.current.contains(e.target)) {
      return;
    }
    setShowBtn(false);
  }
  return (
    <>
      <div className={styles.json}>
        <div className={styles.textdiv} onClick={handleClose}>
          <textarea
            ref={textAreaRef}
            value={jsonPayload}
            onChange={(e) => {
              setJsonPayload(e.target.value);
              setError("");
              setData("");
            }}
            placeholder="Enter JSON payload"
            className={styles.textArea}
            required
          />

          {!showbtn && error != "" && (
            <span className={styles.error}>{error}</span>
          )}
          {!showbtn && data != "" && (
            <span className={styles.success}>{data}</span>
          )}
        </div>
        <button
          onClick={handleDynamicVariables}
          type="button"
          className={styles.plus_popup}
        >
          {!showbtn ? "+" : "-"}
        </button>
        <div ref={popupRef}>
          {showbtn && (
            <Popup handleAppend={handleAppend} setShow={setShowBtn} />
          )}
        </div>
      </div>{" "}
      <button
        onClick={handleValidation}
        className={styles.validate_btn}
        type="button"
      >
        Add {label}
      </button>
    </>
  );
};

export default DynamicPayload;
