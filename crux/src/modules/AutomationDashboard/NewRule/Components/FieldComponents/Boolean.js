import React, { useEffect } from "react";
import Select from "react-select";
import styles from "../../css/components.module.css";
function BooleanInput({ value, callbackfn }) {
  function handleChange(e) {
    if (e?.value !== undefined) {
      callbackfn("value", e.value);
    } else {
      callbackfn("value", "");
    }
  }

  const choices = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  return (
    <Select
      options={choices}
      isClearable={true}
      placeholder="value"
      className={styles.select_field}
      value={choices?.filter((info) => info.value === value)}
      onChange={handleChange}
    />
  );
}

export default BooleanInput;
