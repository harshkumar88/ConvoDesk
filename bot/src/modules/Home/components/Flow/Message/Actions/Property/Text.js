import React, { useEffect, useState } from "react";
import styles from "../../../../../css/Action.module.css";
import MentionArea from "../../../../../../../components/MentionArea";

function Text({ data, setData }) {
  let [text, setText] = useState(data.data.data.key);
  useEffect(
    function () {
      const temp = { ...data };
      temp.data.data.key = text;
      setData(temp);
    },
    [text]
  );
  return (
    <div>
      <MentionArea text={text} setText={setText} placeholder="Property Value" />
    </div>
  );
}

export default Text;
