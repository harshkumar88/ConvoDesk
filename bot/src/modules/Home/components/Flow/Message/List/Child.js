import React, { useContext, useEffect, useState } from "react";
import styles from "../../../../css/Main.module.css";
import MentionArea from "../../../../../../components/MentionArea";
import Webhook from "./Webhook";
import { AppContext } from "../../../../../../App";
import Select from "react-select";

function ListChild({ item, data, setData, contentType }) {
  let [btnTitle, setBtnTitle] = useState("");
  let [btnValue, setBtnValue] = useState("");
  let [key, setKey] = useState("");
  let [arr, setArr] = useState([]);
  let [webhookId, setWebhookId] = useState(0);
  const appContext = useContext(AppContext);
  function selectedOption(options, id) {
    const index = options.findIndex((item) => item.value === id);
    return options[index];
  }
  useEffect(
    function () {
      // setBtnTitle(item.title);
      setBtnValue(item.value);
      setKey(item.type);
      setArr(item.arr);
      setWebhookId(item.webhook_id);
    },
    [item]
  );

  useEffect(
    function () {
      if (contentType == "hindi_content") {
        setBtnTitle(item["hindi_title"]);
      } else {
        setBtnTitle(item.title);
      }
    },
    [contentType]
  );

  let options = [
    { label: "Key", value: "key" },
    { label: "List", value: "list" },
  ];
  useEffect(
    function () {
      setData({
        ...data,
        list: {
          ...data.list,
          value:
            data.list.value.length > 0
              ? data.list.value.map(function (element, index) {
                  if (index != item.idx) {
                    return element;
                  } else {
                    if (contentType == "hindi_content") {
                      return {
                        ...item,
                        hindi_title: btnTitle,
                        value: btnValue,
                        type: key,
                        arr: arr,
                        webhook_id: webhookId,
                      };
                    } else {
                      return {
                        ...item,
                        title: btnTitle,
                        value: btnValue,
                        type: key,
                        arr: arr,
                        webhook_id: webhookId,
                      };
                    }
                  }
                })
              : contentType == "hindi_content"
              ? [
                  {
                    hindi_title: btnTitle,
                    value: btnValue,
                    type: key,
                    webhook_id: 0,
                    idx: 0,
                    id: 1,
                  },
                ]
              : [
                  {
                    title: btnTitle,
                    value: btnValue,
                    type: key,
                    webhook_id: 0,
                    idx: 0,
                    id: 1,
                  },
                ],
        },
      });
    },
    [btnTitle, btnValue]
  );
  function clear() {
    setArr([]);
    setBtnTitle("");
    setBtnValue("");
  }
  return (
    <div className={`${styles.message_container} ${styles.message_wrapper}`}>
      <Select
        options={options}
        value={selectedOption(options, key)}
        onChange={function (option) {
          setKey(option["value"]);
          clear();
        }}
      />
      {key == "list" ? (
        <Webhook
          webhooks={appContext.webhooks}
          handler={function (arr, webhook_id) {
            setArr(arr);
            setWebhookId(webhook_id);
          }}
          item={item}
        />
      ) : (
        <></>
      )}
      {key == "key" || (key == "list" && arr && arr != undefined) ? (
        <div className={styles.list_container}>
          <div className={styles.list_div}>
            <h4>Title</h4>
            <MentionArea
              text={btnTitle}
              setText={setBtnTitle}
              placeholder="Title"
              isKey={key == "key"}
            />
          </div>
          <div className={styles.list_div}>
            <h4>Button Value</h4>
            <MentionArea
              text={btnValue}
              setText={setBtnValue}
              placeholder="Value"
              isKey={key == "key"}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ListChild;
