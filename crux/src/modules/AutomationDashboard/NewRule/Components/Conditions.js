import React, { useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
function Conditions({
  item,
  conditions,
  idx,
  selectedOption,
  setConditions,
  index,
}) {
  const [hover, setHover] = useState(false);
  const [hide, setHide] = useState(false);

  const ticketOptions = [
    { label: "Ticket", value: "Tickets" },
    { label: "Creation", value: "Creation" },
  ];

  //handle deletion of condition
  function handleConditionDelete() {
    let propertyData = conditions;
    let properyArr = propertyData.properties;
    properyArr.splice(idx, 1);
    propertyData.properties = properyArr;
    conditions = propertyData;
    setConditions({ ...conditions });
  }

  //handles the type of condition
  function handleTypeChange(label, value) {
    let data = { ...item, [label]: value };
    let conditionData = conditions;
    conditionData.properties[idx] = data;
    conditions = conditionData;
    setConditions({ ...conditions });
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
              placeholder="key"
              className={styles.condition_select1}
              onChange={(e) => handleTypeChange("key", e.value)}
              value={ticketOptions?.filter((info) => info.value == item?.key)}
              required
            />

            <Select
              options={ticketOptions}
              placeholder="Operator"
              className={styles.condition_select2}
              value={ticketOptions?.filter(
                (info) => info.value == item?.operator
              )}
              required
              onChange={(e) => handleTypeChange("operator", e.value)}
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
                placeholder="value"
                className={styles.condition_select_full}
                value={ticketOptions?.filter(
                  (info) => info.value == item?.value
                )}
                required
                onChange={(e) => handleTypeChange("value", e.value)}
              />
            </div>
          )}
        </div>
        {conditions?.properties?.length == 1 && idx == 0
          ? null
          : hover && (
              <span
                className={styles.delete_icon}
                onClick={() => handleConditionDelete()}
              >
                <FaTrash />
              </span>
            )}
      </div>

      {conditions?.properties?.length > 1 && idx != 0 && (
        <span className={styles.operator}>{selectedOption}</span>
      )}
    </div>
  );
}

export default Conditions;
