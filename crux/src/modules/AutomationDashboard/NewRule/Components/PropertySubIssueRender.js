import React, { useEffect } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";

function PropertySubIssueRender({
  issueData,
  actions,
  setActions,
  item,
  choices,
  renderComponentSwitch,
}) {
  const subIssueOptions = [{ label: "Sub Issue", value: "sub_issue" }];

  function handleSubIssueAppend(label, value) {
    let actionList = actions?.map((data) => {
      if (issueData.uid == data.uid) {
        item[label] = value;
        issueData.properties = {
          ...issueData?.properties,
          property: { ...item, property: {} },
        };
        return issueData;
      }
      return data;
    });

    setActions([...actionList]);
  }

  useEffect(() => {
    handleSubIssueAppend("key", "sub_issue");
  }, [issueData]);
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
            handleSubIssueAppend,
            choices,
            "sub_issue"
          )}
        </div>
      )}
    </>
  );
}

export default PropertySubIssueRender;
