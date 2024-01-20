import React, { useEffect } from "react";
import Select from "react-select";
import styles from "../../css/components.module.css";
function SingleSelect({ value, callbackfn, choices }) {
  useEffect(() => {
    console.log(choices, "jdksjdksjk");
  }, [choices]);
  function handleChange(e) {
    callbackfn("value", e?.value || "");
  }
  return (
    <Select
      options={choices?.map((item) => {
        return { label: item?.label, value: item?.label };
      })}
      isClearable={true}
      placeholder="value"
      className={styles.select_field}
      value={choices?.filter((info) => info.label == value)}
      required
      onChange={handleChange}
    />
  );
}

export default SingleSelect;
