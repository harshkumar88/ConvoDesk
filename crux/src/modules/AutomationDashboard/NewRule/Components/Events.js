import React, { useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
function Events({ item, event, idx, selectedOption, setEvent, index }) {
  const [hover, setHover] = useState(false);
  const ticketOptions = [
    { label: "Ticket", value: "Tickets" },
    { label: "Creation", value: "Creation" },
  ];
  let [hide, setHide] = useState(false);
  function handleEventDelete() {
    let propertyData = event;
    let properyArr = propertyData.properties;
    properyArr.splice(idx, 1);
    propertyData.properties = properyArr;
    event = propertyData;
    setEvent({ ...event });
  }

  function handleTypeChange(label, value) {
    let data = { ...item, [label]: value };
    let conditionData = event;
    conditionData.properties[idx] = data;
    event = conditionData;
    setEvent({ ...event });
  }
  return (
    <div
      className={styles.condition_box}
      key={idx}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.delete_wrapper}>
        <div className={styles.action_delete}>
          <div className={styles.arrow_wrapper}>
            <Select
              options={ticketOptions}
              placeholder="choose key"
              className={styles.condition_select1}
              onChange={(e) => handleTypeChange("key", e.value)}
              value={ticketOptions?.filter((info) => info.value == item?.key)}
              required
            />
            {!hide ? (
              <span
                className={styles.wrapper_span}
                onClick={() => setHide(!hide)}
              >
                <IoMdArrowDropdown />
              </span>
            ) : (
              <span
                className={styles.wrapper_span}
                onClick={() => setHide(!hide)}
              >
                <IoMdArrowDropup />
              </span>
            )}
          </div>
          {!hide && (
            <div className={styles.condition_item2}>
              <Select
                options={ticketOptions}
                placeholder="old_value"
                className={styles.condition_select2}
                value={ticketOptions?.filter(
                  (info) => info.value == item?.old_value
                )}
                required
                onChange={(e) => handleTypeChange("old_value", e.value)}
              />
              <Select
                options={ticketOptions}
                placeholder="new_value"
                className={styles.condition_select1}
                value={ticketOptions?.filter(
                  (info) => info.value == item?.new_value
                )}
                required
                onChange={(e) => handleTypeChange("new_value", e.value)}
              />
            </div>
          )}
        </div>
        {event?.properties?.length == 1 && idx == 0
          ? null
          : hover && (
              <span
                className={styles.delete_icon}
                onClick={() => handleEventDelete()}
              >
                <FaTrash />
              </span>
            )}
      </div>

      {event?.properties?.length > 1 && idx != 0 && (
        <span className={styles.operator}>{selectedOption}</span>
      )}
    </div>
  );
}

export default Events;
