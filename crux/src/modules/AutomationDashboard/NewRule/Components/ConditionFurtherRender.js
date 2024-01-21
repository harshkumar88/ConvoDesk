import React, { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
function ConditionFurtherRender({
  issueData,
  subIssueData,
  idx,
  conditions,
  choices,
  setConditions,
  ticketFields,
  item,
  setFieldType,
  handleTypeChange,
  setChoices,
  constantsMapping,
  fieldType,
  renderComponentSwitch,
}) {
  const [hide, setHide] = useState(false);
  const subIssueOptions = [
    { label: "Further Breakup", value: "further_breakup" },
  ];

  function handleFurtherAppend(label, value) {
    item[label] = value;
    subIssueData.property = item;
    issueData.property = subIssueData;
    let conditionData = conditions;
    conditionData.properties[idx] = issueData;
    conditions = conditionData;
    setConditions({ ...conditions });
  }

  useEffect(() => {
    handleFurtherAppend("key", "further_breakup");
  }, [subIssueData]);
  return (
    <div>
      <div className={styles.arrow_wrapper}>
        <Select
          options={subIssueOptions}
          placeholder="key"
          className={styles.condition_select1}
          value={subIssueOptions?.filter((info) => info?.value == item?.key)}
          isDisabled={true}
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
          onChange={(e) => {
            item.value = [];
            handleFurtherAppend("operator", e.value);
          }}
        />
      </div>

      {item?.operator ? (
        <div className={styles.condition_item2}>
          {renderComponentSwitch(item, handleFurtherAppend, choices)}
        </div>
      ) : null}
    </div>
  );
}

export default ConditionFurtherRender;
