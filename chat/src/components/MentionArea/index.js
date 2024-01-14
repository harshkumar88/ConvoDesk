import React, { useContext, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { AppContext } from "../../App";
import "./css/style.css";
import styles from "./css/style.module.css";
function MentionArea({
  text,
  setText,
  placeholder = "",
  isCondition,
  isKey = true,
  style,
  disabled,
  submit,
}) {
  const appContext = useContext(AppContext);
  let cannedResponses = appContext.cannedResponses;
  function insert(value) {
    let str = text + `{${value}}`;
    setText(str);
  }
  const renderSuggestion = (suggestion, search, highlightedDisplay) => {
    return (
      <div className={styles.custom_suggestion}>
        <p className={styles.display_text}>{suggestion["display"]}</p>
        <p className={styles.id_text}>{suggestion["id"]}</p>
      </div>
    );
  };
  const mentionsInputStyle = {
    background:
      placeholder ===
      "Private notes are not visible to you and your team. Press Shift + Enter to add a newline"
        ? "rgb(254, 241, 225)"
        : "",
  };
  const handleChange = (e, newValue, newPlainTextValue) => {
    if (e.key === "Enter" && e.shiftKey) {
      setText(newPlainTextValue + "\n");
    } else {
      setText(newPlainTextValue);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  return (
    <div
      style={style}
      className={`${styles.input} ${
        isCondition && isCondition !== undefined
          ? styles.conditionClassName
          : ""
      }`}
    >
      {/* <div className={styles.mention}> */}
      <MentionsInput
        value={text}
        placeholder={placeholder}
        a11ySuggestionsListLabel={"Suggested mentions"}
        onKeyDown={handleEnter}
        onChange={handleChange}
        className="mentions"
        // suggestionsPortalHost={container}
        forceSuggestionsAboveCursor={true}
        disabled={disabled}
        style={mentionsInputStyle}
      >
        <Mention
          trigger="/"
          style={{ background: "red" }}
          data={cannedResponses.map(function (item, idx) {
            return {
              id: item.description,
              display: `(${item.shortcut}) ${item.title} `,
            };
          })}
          markup="/[__display__](id:__id__)"
          renderSuggestion={renderSuggestion}
          displayTransform={(id, display) => `${id}`}
        />
      </MentionsInput>
      {/* </div> */}
    </div>
  );
}

export default MentionArea;
