import React, { useState, useEffect } from "react";
import Select from "react-select";
import Webhook from "./Webhook";
import Text from "./Text";
import Dialogue from "./Dialogue";
import Property from "./Property";
import styles from "../../css/style.module.css";
const valueOptions = [
  { label: "Dialogue", value: "dialogue" },
  { label: "Property", value: "property" },
  { label: "Api", value: "webhook" },
  { label: "Text", value: "string" },
];

function Expression({ data, setData, properties, webhooks, dialogues }) {
  function renderValue() {
    switch (data?.type) {
      case "webhook":
        return <Webhook webhooks={webhooks} data={data} setData={setData} />;
      case "string":
        return <Text data={data} setData={setData} />;
      case "dialogue":
        return <Dialogue dialogues={dialogues} data={data} setData={setData} />;
      case "property":
        return (
          <Property properties={properties} data={data} setData={setData} />
        );
    }
  }
  {
    console.log("idxs", data);
  }
  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <div className={styles.expression_child}>
      <Select
        options={valueOptions}
        value={selectedOption(valueOptions, data?.type)}
        onChange={function (option) {
          setData({ ...data, type: option["value"] });
        }}
      />
      {renderValue()}
    </div>
  );
}

export default Expression;
