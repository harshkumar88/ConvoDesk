import React, { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
function ConditionSubIssueRender({
  issueData,
  idx,
  conditions,
  setConditions,
  ticketFields,
  item,
  setFieldType,
  handleTypeChange,
  setChoices,
  choices,
  constantsMapping,
  fieldType,
  renderComponentSwitch,
}) {
  const [hide, setHide] = useState(false);
  const subIssueOptions = [{ label: "Sub Issue", value: "sub_issue" }];

  function handleSubIssueAppend(label, value) {
    item[label] = value;
    issueData.property = { ...item, property: {} };
    let conditionData = conditions;
    conditionData.properties[idx] = issueData;
    conditions = conditionData;
    setConditions({ ...conditions });
  }

  useEffect(() => {
    handleSubIssueAppend("key", "sub_issue");
  }, [issueData]);
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
            handleSubIssueAppend("operator", e.value);
          }}
        />
      </div>

      {item?.operator ? (
        <div className={styles.condition_item2}>
          {renderComponentSwitch(
            item,
            handleSubIssueAppend,
            choices,
            "sub_issue"
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ConditionSubIssueRender;
