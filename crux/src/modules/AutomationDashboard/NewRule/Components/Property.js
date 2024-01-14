import React from "react";
import styles from "../css/style.module.css";
import Select from "react-select";

function Property({ ticketOptions, item, actions, setActions }) {
  function handleTicketChange(label, value) {
    let actionList = actions?.map((data) => {
      if (item.uid == data.uid) {
        return { ...data, property: { ...data?.property, [label]: value } };
      }
      return data;
    });
    setActions([...actionList]);
  }
  return (
    <>
      <Select
        options={ticketOptions}
        placeholder="key"
        className={styles.condition_select2}
        value={ticketOptions.filter(
          (info) => info.value == item?.property?.key
        )}
        onChange={(e) => handleTicketChange("key", e.value)}
        required
      />
      <Select
        options={ticketOptions}
        placeholder="value"
        className={styles.condition_select1}
        value={ticketOptions.filter(
          (info) => info.value == item?.property?.value
        )}
        onChange={(e) => handleTicketChange("value", e.value)}
        required
      />
    </>
  );
}

export default Property;
