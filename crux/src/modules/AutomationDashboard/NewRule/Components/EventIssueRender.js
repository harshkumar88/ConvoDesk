import React from "react";
import Select from "react-select";
import styles from "../css/style.module.css";

function EventIssueRender({ item, choices, handleTypeChange, setId }) {
  return (
    <div className={styles.condition_item2}>
      <div>
        from
        <Select
          options={choices?.map((item) => {
            return { label: item?.label, value: item?.label, ...item };
          })}
          isClearable={true}
          placeholder="old_value"
          className={styles.condition_select2}
          value={choices?.filter((info) => info.label == item?.old_value)}
          onChange={(e) => {
            handleTypeChange("old_value", e?.value || null);
          }}
        />
      </div>
      <div>
        to
        <Select
          options={choices?.map((item) => {
            return { label: item?.label, value: item?.label, ...item };
          })}
          isClearable={true}
          placeholder="new_value"
          className={styles.condition_select2}
          value={choices?.filter((info) => info.label == item?.new_value)}
          onChange={(e) => handleTypeChange("new_value", e?.value || null)}
        />
      </div>
    </div>
  );
}

export default EventIssueRender;
