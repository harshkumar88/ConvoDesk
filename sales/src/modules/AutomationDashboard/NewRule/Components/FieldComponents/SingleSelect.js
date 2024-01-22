import React, { useEffect } from "react";
import Select from "react-select";
import styles from "../../css/components.module.css";
function SingleSelect({
  value,
  callbackfn,
  choices,
  val,
  setIssueId,
  issueId,
  subIssueId,
  setSubIssueId,
}) {
  function handleChange(e) {
    if (e?.id) {
      if (val == "issue") {
        setIssueId(e.id);
      } else if (val == "sub_issue") {
        setSubIssueId(e.id);
      }
    }

    if (e?.value) {
      callbackfn("value", [e?.value]);
    } else {
      callbackfn("value", []);
    }
  }

  return (
    <Select
      options={choices?.map((item) => {
        return { label: item?.label, value: item?.label, ...item };
      })}
      isClearable={true}
      placeholder="value"
      className={styles.select_field}
      value={choices?.filter((info) => info.label == value?.[0])}
      onChange={handleChange}
    />
  );
}

export default SingleSelect;
