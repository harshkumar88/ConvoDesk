import React from "react";
import styles from "../../css/components.module.css";
function Text({ value, callbackfn, number }) {
  function handleChange(e) {
    if (isNaN(e.target.value) && number) {
      return;
    }

    let val = e.target.value;

    if (number && val !== "") {
      val = parseInt(val);
    }
    callbackfn("value", val);
  }
  return (
    <input
      type="text"
      className={styles.text_field}
      value={value || ""}
      name="value"
      onChange={handleChange}
      placeholder={number ? "enter numeric value" : "enter value"}
    />
  );
}

export default Text;
