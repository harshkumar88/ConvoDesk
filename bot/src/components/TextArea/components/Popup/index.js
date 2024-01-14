import React, { useState } from "react";
import Select from "react-select";
import Webhook from "./Webhook";
import Text from "./Text";
import Dialogue from "./Dialogue";
import Property from "./Property";
import styles from "../../css/popup.module.css";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillCloseSquare } from "react-icons/ai";

const valueOptions = [
  { label: "Dialogue", value: "dialogue" },
  { label: "Property", value: "property" },
  { label: "Api", value: "webhook" },
  { label: "Text", value: "string" },
];

function Popup({ insert, properties, webhooks, flows, isCondition, isKey }) {
  let [data, setData] = useState({});
  let [display, setDisplay] = useState(false);

  function handler(value) {
    insert(value);
    close();
  }
  function close() {
    setData({});
    setDisplay(false);
  }
  function renderValue() {
    switch (data?.type) {
      case "webhook":
        return (
          <Webhook
            webhooks={webhooks}
            data={data}
            setData={setData}
            handler={handler}
            isKey={isKey}
          />
        );
      case "string":
        return <Text data={data} setData={setData} />;
      case "dialogue":
        return (
          <Dialogue
            flows={flows}
            data={data}
            setData={setData}
            handler={handler}
            close={close}
          />
        );
      case "property":
        return (
          <Property
            properties={properties}
            data={data}
            setData={setData}
            handler={handler}
          />
        );
    }
  }

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <>
      {display ? (
        <div
          className={`${styles.popup_container} ${
            isCondition ? styles.left : ""
          }`}
        >
          <button onClick={close} className={styles.close_icon}>
            <AiFillCloseSquare className={styles.insert_icon} />
          </button>
          <label htmlFor="property_value">Property Value</label>
          <Select
            options={valueOptions}
            value={selectedOption(valueOptions, data?.type)}
            onChange={function (option) {
              setData({ ...data, type: option["value"] });
            }}
            classNamePrefix="custom-select"
            className="custom-select-container"
            menuClassName="custom-select-menu"
            optionClassName="custom-select-option"
          />
          {data && data.type ? renderValue() : <></>}{" "}
        </div>
      ) : (
        <button
          onClick={function () {
            setDisplay(true);
          }}
          className={styles.add_icon}
        >
          <CgPlayListAdd className={styles.insert_icon} />
        </button>
      )}
    </>
  );
}

export default Popup;
