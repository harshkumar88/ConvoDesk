import React, { useState, useEffect } from "react";
import styles from "../../../../../css/Action.module.css";
import Select from "react-select";
import Webhook from "./Webhook";
import Text from "./Text";
import Dialogue from "./Dialogue";

const valueOptions = [
  { label: "Dialogue", value: "dialogue" },
  { label: "Trigger Api", value: "webhook" },
  { label: "Text", value: "text" },
];

function Property({ properties, data, setData, webhooks, dialogues }) {
  const [options, setOptions] = useState(
    properties.map(function (item, idx) {
      return { label: item?.name, value: item?.id };
    })
  );

  function renderValue() {
    switch (data?.data?.data?.type) {
      case "webhook":
        return <Webhook webhooks={webhooks} data={data} setData={setData} />;
      case "text":
        return <Text data={data} setData={setData} />;
      case "dialogue":
        return <Dialogue dialogues={dialogues} data={data} setData={setData} />;
    }
  }
  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  function handleProperty(option) {
    let temp = { ...data };
    temp.data.property_id = option["value"];
    setData(temp);
  }

  function handlePropertyData(option) {
    let temp = { ...data };
    if (!temp.data.data) {
      temp.data["data"] = { type: option["value"] };
    } else {
      temp.data.data.type = option["value"];
    }
    setData(temp);
  }

  return (
    <div className={styles.action_subdiv}>
      <div className={styles.action_div}>
        <label htmlFor="property_name" className={styles.select}>
          Property Name
        </label>
        <Select
          id="property_name"
          options={options}
          value={selectedOption(options, data?.data?.property_id)}
          onChange={handleProperty}
          className={styles.select}
        />
      </div>
      {data?.data?.property_id && (
        <div className={styles.action_div}>
          <label htmlFor="property_value" className={styles.select}>
            Property Value
          </label>
          <Select
            id="property_value"
            options={valueOptions}
            value={selectedOption(valueOptions, data?.data?.data?.type)}
            onChange={handlePropertyData}
            className={styles.select}
          />
          {renderValue()}
        </div>
      )}
    </div>
  );
}

export default Property;
