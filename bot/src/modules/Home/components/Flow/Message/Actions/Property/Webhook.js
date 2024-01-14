import React, { useEffect, useState } from "react";
import styles from "../../../../../css/Action.module.css";
import Select from "react-select";

function Webhook({ webhooks, data, setData }) {
  const [options, setOptions] = useState([]);
  const [hookOptions, setHookOptions] = useState([]);

  useEffect(
    function () {
      let arr = [];

      webhooks.map(function (item, idx) {
        arr.push({ label: item?.name, value: item?.id });
      });
      setOptions(arr);

      let arr2 = [];
      let hooks = webhooks.find(
        (ele) => ele.id === data?.data?.data?.webhook_id
      );
      hooks?.expected_keys?.map(function (item, idx) {
        arr2.push({ label: item?.key, value: item?.key });
      });
      setHookOptions(arr2);
    },
    [webhooks]
  );

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  function changeHandler(option) {
    const temp = { ...data };
    temp.data.data.webhook_id = option["value"];
    temp.data.data.webhook_name = option["label"];
    setData(temp);
    let arr2 = [];
    let hooks = webhooks.find((ele) => ele.id === option["value"]);
    console.log("hooks", hooks);
    hooks?.expected_keys?.map(function (item, idx) {
      arr2.push({ label: item?.key, value: item?.key });
    });
    setHookOptions(arr2);
  }

  function hookChangeHandler(option) {
    const temp = { ...data };
    temp.data.data.key = option["value"];
    setData(temp);
  }

  //   console.log("webhook options----", options);
  //   console.log("webhook selected----", item?.data?.webhook_id);

  return (
    <div>
      <div className={styles.action_div}>
        <label className={styles.select}>Select Api</label>
        <Select
          options={options}
          value={selectedOption(options, data?.data?.data?.webhook_id)}
          onChange={changeHandler}
          className={styles.select}
        />
      </div>

      {data?.data?.data?.webhook_id && (
        <div className={styles.action_div}>
          <label className={styles.select}>Select Key</label>
          <Select
            options={hookOptions}
            value={selectedOption(hookOptions, data?.data?.data?.key)}
            onChange={hookChangeHandler}
            className={styles.select}
          />
        </div>
      )}
    </div>
  );
}

export default Webhook;
