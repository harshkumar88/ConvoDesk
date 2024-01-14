import React, { useEffect, useState } from "react";
import styles from "../../../css/Main.module.css";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import MentionArea from "../../../../../components/MentionArea";

function Text({ data, setData, conditionHandler, contentType }) {
  let [text, setText] = useState("");
  useEffect(
    function () {
      setData({ ...data, text: { ...data.text, [contentType]: text } });
    },
    [text]
  );

  useEffect(() => {
    setText(data.text[contentType]);
  }, [contentType]);
  // function changeHandler(e) {
  //   setData({ ...data, text: { content: e.target.value } });
  // }

  return (
    <div className={styles.message_container}>
      <MentionArea text={text} setText={setText} placeholder="Content" />
      {/* <textarea
        className={styles.message}
        type="text"
        placeholder="type your message here"
        value={data.text.content}
        // onChange={changeHandler}
        rows={3}
      /> */}
      {/* <div className={styles.toggle_btn} onClick={conditionHandler}>
        <IoIosArrowDroprightCircle />
      </div> */}
    </div>
  );
}

export default Text;
