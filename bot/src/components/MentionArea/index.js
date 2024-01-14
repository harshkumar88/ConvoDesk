import React, { useContext, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { AppContext } from "../../App";
import Popup from "./components/Popup";
import "./css/style.css";
import styles from "./css/style.module.css";
function MentionArea({
  text,
  setText,
  placeholder = "",
  isCondition,
  isKey = true,
}) {
  const appContext = useContext(AppContext);
  function insert(value) {
    let str = text + `{${value}}`;
    setText(str);
  }

  return (
    <div
      className={`${styles.input} ${
        isCondition && isCondition !== undefined
          ? styles.conditionClassName
          : ""
      }`}
    >
      <div className={styles.mention}>
        <MentionsInput
          value={text}
          onChange={function (e) {
            setText(e.target.value);
          }}
          placeholder={placeholder}
          // inputRef={textareaRef}
          a11ySuggestionsListLabel={"Suggested mentions"}
          className="mentions"
        >
          <Mention
            trigger="@"
            markup="{__display__}"
            data={[]}
            className="mentions__mention"
          />
        </MentionsInput>
      </div>
      <div className={styles.btn}>
        <Popup
          webhooks={appContext.webhooks}
          properties={appContext.properties}
          flows={appContext.flows}
          insert={insert}
          isKey={isKey}
          isCondition={isCondition}
        />
      </div>
    </div>
  );
}

export default MentionArea;
