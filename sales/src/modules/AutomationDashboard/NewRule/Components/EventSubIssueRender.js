import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "../css/style.module.css";

function EventSubIssueRender({
  issueItem,
  item,
  issueChoices,
  event,
  setEvent,
  choices,
  idx,
  subOldChoices,
  subNewChoices,
  setSubOldChoices,
  setSubNewChoices,
}) {
  function handleTypeChange(label, value) {
    item[label] = value;
    if (!item?.property) {
      item.property = { key: item.key };
    } else {
      item.property = { ...item.property, [label]: null };
    }
    issueItem.property = item;

    let conditionData = event;
    conditionData.properties[idx] = issueItem;
    event = conditionData;
    setEvent({ ...event });
  }

  function handleOldChoice() {
    const sub_choices =
      issueChoices?.find((info) => info?.label == issueItem?.old_value)
        ?.choices || [];
    setSubOldChoices(sub_choices);
  }

  function handleNewChoice() {
    const sub_choices =
      issueChoices?.find((info) => info?.label == issueItem?.new_value)
        ?.choices || [];
    setSubNewChoices(sub_choices);
  }
  useEffect(() => {
    handleOldChoice();
    handleNewChoice();
  }, [issueChoices, issueItem]);
  return (
    <div className={styles.condition_item2}>
      <div
        style={!issueItem?.old_value ? { visibility: "hidden" } : {}}
        className={styles.from_flex}
      >
        from
        <Select
          options={subOldChoices?.map((item) => {
            return { label: item?.label, value: item?.label, ...item };
          })}
          isClearable={true}
          placeholder="old_value"
          className={styles.condition_select2}
          value={subOldChoices?.filter((info) => info.label == item?.old_value)}
          onChange={(e) => handleTypeChange("old_value", e?.value || null)}
        />
      </div>

      <div
        style={!issueItem?.new_value ? { visibility: "hidden" } : {}}
        className={styles.from_flex}
      >
        to
        <Select
          options={subNewChoices?.map((item) => {
            return { label: item?.label, value: item?.label, ...item };
          })}
          isClearable={true}
          placeholder="new_value"
          className={styles.condition_select2}
          value={subNewChoices?.filter((info) => info.label == item?.new_value)}
          onChange={(e) => handleTypeChange("new_value", e?.value || null)}
        />
      </div>
    </div>
  );
}

export default EventSubIssueRender;
