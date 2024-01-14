import React, { useEffect } from "react";
import { useState } from "react";
import MentionArea from "../../../components/MentionArea";
import styles from "../css/update.module.css";
function Child({ item, data, setData }) {
  let [key, setKey] = useState(item.key);
  let [value, setValue] = useState(item.value);
  // useEffect(
  //   function () {
  //     setKey(item.key);
  //     setValue(item.value);
  //   },
  //   [item]
  // );
  useEffect(
    function () {
      let payload = data;
      payload = payload.map(function (element, index) {
        if (element.index != item.idx) {
          return element;
        } else {
          return { ...element, key: key, value: value };
        }
      });
      setData(
        data.map(function (element, index) {
          if (element.idx != item.idx) {
            return element;
          } else {
            return { ...element, key: key, value: value };
          }
        })
      );
    },
    [key, value]
  );
  return (
    <div className={styles.child_wrapper}>
      <div className={styles.child_div}>
        <label className={styles.label}>Key</label>
        <MentionArea
          text={key}
          setText={setKey}
          placeholder="Key"
          isCondition={true}
        />
      </div>
      <div className={styles.child_div}>
        <label className={styles.label}>Value</label>
        <MentionArea
          text={value}
          setText={setValue}
          placeholder="Value"
          isCondition={true}
        />
      </div>
    </div>
  );
}

export default Child;
