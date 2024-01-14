import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "../../css/popup.module.css";

function Webhook({ webhooks, data, setData, handler, isKey }) {
  const [options, setOptions] = useState(
    webhooks.map(function (item, idx) {
      return { label: item?.name, value: item?.id };
    })
  );
  const [keys, setKeys] = useState([]);

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  function webhookHandler(option) {
    let webhook_id = option["value"];
    setKeys(
      webhooks
        .filter(function (item, idx) {
          return item.id == webhook_id;
        })[0]
        .expected_keys.filter(function (item, idx) {
          if (isKey) {
            return item.type == "key";
          } else {
            return true;
          }
        })
        .map(function (item, idx) {
          return { label: item.key, value: item.key, type: item.type };
        })
    );
    setData({
      ...data,
      webhook_id: option["value"],
      webhook_name: option["label"],
    });
  }
  return (
    <div className={styles.popup_subdiv_1}>
      <div className={styles.popup_subdiv}>
        <label>Select Api</label>
        {console.log("keys", keys)}
        <Select
          options={options}
          value={selectedOption(options, data?.webhook_id)}
          onChange={webhookHandler}
        />
      </div>
      {keys ? (
        <>
          <div className={styles.popup_subdiv}>
            <label>Select Key</label>
            <Select
              options={keys}
              value={selectedOption(keys, data?.key)}
              onChange={function (option) {
                setData({
                  ...data,
                  key: option["value"],
                });
                if (option["type"] == "key") {
                  handler(`webhook[${data.webhook_name}]${option["value"]}`);
                } else {
                  handler(option["value"]);
                }
              }}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Webhook;
