import React, { useContext, useEffect, useState } from "react";
import styles from "../../../../css/Main.module.css";
import MentionArea from "../../../../../../components/MentionArea";
import Webhook from "./Webhook";
import { AppContext } from "../../../../../../App";
import Select from "react-select";

function CarouselChild({ item, data, setData, contentType }) {
  let [text, setText] = useState(item.content);
  let [hindiContent, setHindiContent] = useState(item.hindi_content);
  let [btnTitle, setBtnTitle] = useState(item.btn_title);
  let [btnValue, setBtnValue] = useState(item.btn_value);
  let [key, setKey] = useState(item.type);
  let [webhookId, setWebhookId] = useState(item.webhook_id);
  let [arr, setArr] = useState(item.arr);
  const appContext = useContext(AppContext);
  function selectedOption(options, id) {
    const index = options.findIndex((item) => item.value === id);
    return options[index];
  }
  let options = [
    { label: "Key", value: "key" },
    { label: "List", value: "list" },
  ];
  useEffect(
    function () {
      // setBtnTitle(item.btn_title);
      setBtnValue(item.btn_value);
      setKey(item.type);
      setArr(item.arr);
      setText(item.content);
      setHindiContent(item.hindi_content);
      setWebhookId(item.webhook_id);
    },
    [item]
  );

  useEffect(
    function () {
      if (contentType == "hindi_content") {
        setBtnTitle(item["btn_hindi_title"]);
      } else {
        setBtnTitle(item.btn_title);
      }
    },
    [contentType]
  );

  useEffect(
    function () {
      setData({
        ...data,
        carousel: {
          ...data.carousel,
          value:
            data.carousel.value.length > 0
              ? data.carousel.value.map(function (element, index) {
                  if (index != item.idx) {
                    return element;
                  } else {
                    if (contentType == "hindi_content") {
                      return {
                        ...item,
                        content: text,
                        hindi_content: hindiContent,
                        btn_hindi_title: btnTitle,
                        btn_value: btnValue,
                        type: key,
                        webhook_id: webhookId,
                        arr: arr,
                      };
                    } else {
                      return {
                        ...item,
                        content: text,
                        hindi_content: hindiContent,
                        btn_title: btnTitle,
                        btn_value: btnValue,
                        type: key,
                        webhook_id: webhookId,
                        arr: arr,
                      };
                    }
                  }
                })
              : contentType == "hindi_content"
              ? [
                  {
                    content: text,
                    hindi_content: hindiContent,
                    hindi_btn_title: btnTitle,
                    btn_value: btnValue,
                    idx: 0,
                    id: 1,
                  },
                ]
              : [
                  {
                    content: text,
                    hindi_content: hindiContent,
                    btn_title: btnTitle,
                    btn_value: btnValue,
                    idx: 0,
                    id: 1,
                  },
                ],
        },
      });
    },
    [text, hindiContent, btnTitle, btnValue]
  );
  function clear() {
    setArr([]);
    setBtnTitle("");
    setBtnValue("");
    setText("");
    setHindiContent("");
  }
  return (
    <div className={styles.message_container}>
      <div style={{ marginBottom: "1vh" }}>
        <Select
          options={options}
          value={selectedOption(options, key)}
          onChange={function (option) {
            setKey(option["value"]);
            clear();
          }}
        />
      </div>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {contentType == "content" ? (
            <MentionArea
              text={text}
              setText={setText}
              placeholder="Content"
              isKey={key == "key"}
            />
          ) : (
            <MentionArea
              text={hindiContent}
              setText={setHindiContent}
              placeholder="Content"
              isKey={key == "key"}
            />
          )}
          <div>
            <h3>Button Title</h3>
            <MentionArea
              text={btnTitle}
              setText={setBtnTitle}
              placeholder="Btn Title"
              isKey={key == "key"}
            />
          </div>
          <div>
            <h3>Button Value</h3>
            <MentionArea
              text={btnValue}
              setText={setBtnValue}
              placeholder="Btn Value"
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

export default CarouselChild;
