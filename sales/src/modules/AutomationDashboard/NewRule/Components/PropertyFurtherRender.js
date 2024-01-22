import React, { useEffect } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";

function PropertyFurtherRender({
  issueData,
  subIssueData,
  actions,
  setActions,
  item,
  choices,
  renderComponentSwitch,
}) {
  const subIssueOptions = [
    { label: "Further Breakup", value: "further_breakup" },
  ];

  function handleFurtherAppend(label, value) {
    let actionList = actions?.map((data) => {
      if (issueData.uid == data.uid) {
        item[label] = value;
        subIssueData.property = { ...item, property: {} };

        issueData.properties = {
          ...issueData?.properties,
          property: subIssueData,
        };
        return issueData;
      }
      return data;
    });

    setActions([...actionList]);
  }

  useEffect(() => {
    handleFurtherAppend("key", "further_breakup");
  }, [subIssueData]);
  return (
    <>
      <Select
        options={subIssueOptions}
        placeholder="key"
        className={styles.condition_select1}
        value={subIssueOptions?.filter((info) => info?.value == item?.key)}
        isDisabled={true}
      />
      {item?.key && (
        <div className={styles.condition_select4}>
          {renderComponentSwitch(
            item,
            handleFurtherAppend,
            choices,
            "further_breakup"
          )}
        </div>
      )}
    </>
  );
}

export default PropertyFurtherRender;
