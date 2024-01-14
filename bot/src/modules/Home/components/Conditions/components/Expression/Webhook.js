import React, { useEffect, useState } from "react";
import Select from "react-select";
function Webhook({ webhooks, data, setData }) {
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
          return item.type == "key";
        })
        .map(function (item, idx) {
          return { label: item.key, value: item.key };
        })
    );
    setData({
      ...data,
      webhook_id: option["value"],
      webhook_name: option["label"],
    });
  }
  return (
    <>
      <Select
        options={options}
        value={selectedOption(options, data?.webhook_id)}
        onChange={webhookHandler}
      />
      {keys ? (
        <Select
          options={keys}
          value={selectedOption(keys, data?.key)}
          onChange={function (option) {
            setData({
              ...data,
              key: option["value"],
            });
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Webhook;
