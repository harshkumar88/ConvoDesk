import React from "react";

import CreatableSelect from "react-select/creatable";
import styles from "../../css/components.module.css";
function SingleWithCreatable({ value, callbackfn, optionList }) {
  function handleCreateOption(val) {
    if (!val) {
      callbackfn("value", "");
    } else {
      callbackfn("value", val);
    }
  }
  function handleChange(e) {
    const val = e?.value || "";
    callbackfn("value", val);
  }

  return (
    <>
      <CreatableSelect
        isClearable={true}
        options={optionList}
        value={{ label: value, value: value }}
        onChange={handleChange}
        onCreateOption={handleCreateOption}
        className={styles.select_field}
        placeholder="Select or create single value"
      />
    </>
  );
}

export default SingleWithCreatable;
