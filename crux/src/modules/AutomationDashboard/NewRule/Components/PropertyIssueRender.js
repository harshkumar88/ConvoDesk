import React, { useEffect } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";

function PropertyIssueRender({
  ticketFields,
  item,
  setFieldType,
  choices,
  handleTypeChange,
  renderComponentSwitch,
}) {
  return (
    <>
      <Select
        options={ticketFields?.map((info) => {
          return { ...info, value: info.key };
        })}
        placeholder="key"
        className={styles.condition_select1}
        onChange={(e) => {
          if (item.properties) item.properties.value = null;
          setFieldType(e.field_type);
          handleTypeChange("key", e.value);
        }}
        value={ticketFields?.filter(
          (info) => info.key == item?.properties?.key
        )}
      />

      {item?.properties?.key && (
        <div className={styles.condition_select4}>
          {renderComponentSwitch(
            item?.properties,
            handleTypeChange,
            choices,
            "issue"
          )}
        </div>
      )}
    </>
  );
}

export default PropertyIssueRender;
