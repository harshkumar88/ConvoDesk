import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
function Webhook({ item, webhooks, handler }) {
  let [data, setData] = useState({});

  const [options, setOptions] = useState(
    webhooks.map(function (item, idx) {
      return { label: item?.name, value: item?.id };
    })
  );

  const [keys, setKeys] = useState([]);
  useEffect(
    function () {
      if (item && item.webhook_id && item.webhook_id != undefined) {
        setData({ webhook_id: item?.webhook_id, arr: item?.arr });
        setWebhookKeys(item?.webhook_id);
      }
    },
    [item]
  );
  function setWebhookKeys(webhook_id) {
    let s = new Set([]);

    let filteredWebhooks = webhooks.filter(function (element, idx) {
      return element.id == webhook_id;
    });
    if (!(filteredWebhooks && filteredWebhooks.length)) {
      return;
    }
    console.log(filteredWebhooks);
    let selectedWebhook = filteredWebhooks[0];
    setKeys(
      selectedWebhook.expected_keys
        .filter(function (element, idx) {
          let exists = false;
          if (!s.has(element["arr"])) {
            s.add(element["arr"]);
            exists = true;
          }
          return element.type == "list" && exists;
        })
        .map(function (element, idx) {
          return {
            label: element.arr,
            value: `data[webhook][${selectedWebhook.name}]${element.arr}`,
          };
        })
    );
  }

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  function webhookHandler(option) {
    let webhook_id = option["value"];
    setWebhookKeys(webhook_id);

    setData({
      ...data,
      webhook_id: option["value"],
      webhook_name: option["label"],
    });
  }
  return (
    <div className={styles.list_div}>
      <div className={styles.select_div}>
        <Select
          options={options}
          value={selectedOption(options, data.webhook_id)}
          onChange={webhookHandler}
        />
      </div>

      {keys ? (
        <div className={styles.action_div}>
          {console.log("dataa", data, keys)}
          <label>Select Key</label>
          <Select
            options={keys}
            value={selectedOption(keys, data?.arr)}
            onChange={function (option) {
              setData({
                ...data,
                key: option["value"],
              });
              handler(option["value"], data.webhook_id);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Webhook;
