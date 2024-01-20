import React from "react";
import styles from "../../css/components.module.css";
function Text({ value, callbackfn }) {
  function handleChange(e) {
    if (isNaN(e.target.value)) {
      return;
    }
    callbackfn("value", e.target.value);
  }
  return (
    <input
      type="text"
      className={styles.text_field}
      value={value || ""}
      name="value"
      onChange={handleChange}
      placeholder="enter numeric value"
    />
  );
}

export default Text;
