import React, { useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";

function ConditionIssueRender({
  ticketFields,
  item,
  setFieldType,
  handleTypeChange,
  choices,
  setChoices,
  constantsMapping,
  fieldType,
  renderComponentSwitch,
}) {
  return (
    <div>
      <div className={styles.arrow_wrapper}>
        <Select
          options={ticketFields?.map((info) => {
            return { ...info, value: info.key };
          })}
          placeholder="key"
          className={styles.condition_select1}
          onChange={(e) => {
            item.operator = "";
            setFieldType(e.field_type);
            handleTypeChange("key", e.value);
            setChoices(e?.choices || []);
          }}
          value={ticketFields?.filter((info) => info.key == item?.key)}
        />

        <Select
          options={constantsMapping?.operator_choices?.filter((info) => {
            return constantsMapping?.field_opertaor_mapping?.[
              fieldType
            ]?.includes(info.value);
          })}
          placeholder="Operator"
          className={styles.condition_select2}
          value={constantsMapping?.operator_choices?.filter(
            (info) => info.value == item?.operator
          )}
          required
          onChange={(e) => {
            item.value = [];
            handleTypeChange("operator", e.value);
          }}
        />
      </div>

      {item?.operator !== "" ? (
        <div className={styles.condition_item2}>
          {renderComponentSwitch(item, handleTypeChange, choices, "issue")}
        </div>
      ) : null}
    </div>
  );
}

export default ConditionIssueRender;
