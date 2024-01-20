import React from "react";
import Select from "react-select";
import styles from "../../css/components.module.css";
function MultiSelect({ value, callbackfn, choices }) {
  function handleChange(e) {
    const val = e.map(function (item, idx) {
      return item.value;
    });
    callbackfn("value", val);
  }
  return (
    <Select
      isMulti={true}
      isClearable={true}
      options={choices?.map((item) => {
        return { label: item?.label, value: item?.label };
      })}
      placeholder="value"
      className={styles.select_field}
      value={choices
        ?.filter((info) => value?.includes(info.label))
        ?.map((item) => {
          return { label: item?.label, value: item?.label };
        })}
      onChange={handleChange}
    />
  );
}

export default MultiSelect;
