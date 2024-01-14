import React, { useState } from "react";
import Select from "react-select";
import styles from "../../css/popup.module.css";
function Property({ properties, data, setData, handler }) {
  let [options, setOptions] = useState(
    properties.map(function (item, idx) {
      return {
        label: item.name,
        value: item.id,
        is_user_property: item.is_user_property,
      };
    })
  );

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <div className={styles.popup_subdiv}>
      <label>Select Property</label>
      <Select
        options={options}
        value={selectedOption(options, data?.data?.property_id)}
        onChange={function (option) {
          setData({
            ...data,
            key: option["label"],
            property_id: option["value"],
          });
          if (option["is_user_property"]) {
            handler(option["label"]);
          } else {
            handler(`property_${option["value"]}`);
          }
        }}
      />
    </div>
  );
}

export default Property;
