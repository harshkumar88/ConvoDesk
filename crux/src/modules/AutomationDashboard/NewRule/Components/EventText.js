import React from "react";
import styles from "../css/style.module.css";
function EventText({ item, callbackfn, number }) {
  function handleChange(e) {
    if (isNaN(e.target.value) && number) {
      return;
    }

    let val = e.target.value;

    if (number && val !== "") {
      val = parseInt(val);
    }
    callbackfn(e.target.name, val);
  }
  return (
    <div className={styles.condition_item2}>
      <input
        type="text"
        className={styles.text_field}
        value={item?.old_value || ""}
        name="old_value"
        onChange={handleChange}
        placeholder="old_value"
      />

      <input
        type="text"
        className={styles.text_field}
        value={item?.new_value || ""}
        name="new_value"
        onChange={handleChange}
        placeholder="new_value"
      />
    </div>
  );
}

export default EventText;
