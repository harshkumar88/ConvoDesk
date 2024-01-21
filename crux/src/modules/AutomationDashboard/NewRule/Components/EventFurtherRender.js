import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "../css/style.module.css";

function EventFurtherRender({
  issueItem,
  subIssueItem,
  item,
  event,
  setEvent,
  idx,
  subOldChoices,
  subNewChoices,
}) {
  const [furtherOldChoices, setFurtherOldChoices] = useState([]);
  const [furtherNewChoices, setFurtherNewChoices] = useState([]);

  function handleTypeChange(label, value) {
    item[label] = value;
    item.property = null;
    subIssueItem.property = item;
    issueItem.property = subIssueItem;

    let conditionData = event;
    conditionData.properties[idx] = issueItem;
    event = conditionData;
    setEvent({ ...event });
  }

  function handleOldChoice() {
    const sub_choices =
      subOldChoices?.find((info) => info?.label == subIssueItem?.old_value)
        ?.choices || [];
    setFurtherOldChoices(sub_choices);
  }

  function handleNewChoice() {
    const sub_choices =
      subNewChoices?.find((info) => info?.label == subIssueItem?.new_value)
        ?.choices || [];
    setFurtherNewChoices(sub_choices);
  }
  useEffect(() => {
    handleOldChoice();
    handleNewChoice();
  }, [subIssueItem]);
  return (
    <div className={styles.condition_item2}>
      <div
        style={
          subIssueItem?.old_value == undefined ? { visibility: "hidden" } : {}
        }
        className={styles.from_flex}
      >
        from
        <Select
          options={furtherOldChoices?.map((item) => {
            return { label: item?.label, value: item?.label, ...item };
          })}
          isClearable={true}
          placeholder="old_value"
          className={styles.condition_select2}
          value={furtherOldChoices?.filter(
            (info) => info.label == item?.old_value
          )}
          onChange={(e) => handleTypeChange("old_value", e?.value || null)}
        />
      </div>
      <div
        style={
          subIssueItem?.new_value == undefined ? { visibility: "hidden" } : {}
        }
        className={styles.from_flex}
      >
        to
        <Select
          options={furtherNewChoices?.map((item) => {
            return { label: item?.label, value: item?.label, ...item };
          })}
          isClearable={true}
          placeholder="new_value"
          className={styles.condition_select2}
          value={furtherNewChoices?.filter(
            (info) => info.label == item?.new_value
          )}
          onChange={(e) => handleTypeChange("new_value", e?.value || null)}
        />
      </div>
    </div>
  );
}

export default EventFurtherRender;
