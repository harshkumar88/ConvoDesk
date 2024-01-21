import React, { useEffect } from "react";
import Select from "react-select";
import styles from "../css/style.module.css";
function EventBoolean({ item, callbackfn }) {
  function handleChange(label, val) {
    callbackfn(label, val);
  }

  const choices = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  return (
    <div className={styles.condition_item2}>
      <Select
        options={choices}
        isClearable={true}
        placeholder="old_value"
        className={styles.select_field}
        value={choices?.filter((info) => info.value === item?.old_value)}
        onChange={(e) => handleChange("old_value", e?.value)}
      />

      <Select
        options={choices}
        isClearable={true}
        placeholder="new_value"
        className={styles.select_field}
        value={choices?.filter((info) => info.value === item?.new_value)}
        onChange={(e) => handleChange("new_value", e?.value)}
      />
    </div>
  );
}

export default EventBoolean;
