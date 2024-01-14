import React from "react";
import { Mention, MentionsInput } from "react-mentions";
import Popup from "./components/Popup";
import "./css/style.css";
import styles from "./css/style.module.css";
function MentionArea({
  text,
  setText,
  placeholder = "",
  isCondition,
  isKey = true,
  shortNoteList,
  type,
}) {
  function insert(value) {
    if (text && text[type]) {
      let str = (text[type] || "") + `{${value}}`;
      setText({ ...text, [type]: str });
    } else {
      setText({ ...text, [type]: `{${value}}` });
    }
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
          value={text[type]}
          onChange={function (e) {
            setText({ ...text, [type]: e.target.value });
          }}
          placeholder={placeholder}
          a11ySuggestionsListLabel={"Suggested mentions"}
          className="mentions"
          required={true}
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
          insert={insert}
          isKey={isKey}
          isCondition={isCondition}
          shortNoteList={shortNoteList}
        />
      </div>
    </div>
  );
}

export default MentionArea;
