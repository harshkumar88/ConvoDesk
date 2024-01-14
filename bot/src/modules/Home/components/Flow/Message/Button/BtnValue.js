import React, { useState, useEffect } from "react";
import MentionArea from "../../../../../../components/MentionArea";
function BtnValue({ item, data, setData }) {
  let [text, setText] = useState(item.value);
  useEffect(
    function () {
      setData({
        ...data,
        button: {
          ...data.button,
          value:
            data.button.value.length > 0
              ? data.button.value.map(function (element, index) {
                  if (index != item.idx) {
                    return element;
                  } else {
                    return { ...item, value: text };
                  }
                })
              : [{ title: text, value: text, idx: 0, id: 1 }],
        },
      });
    },
    [text]
  );

  return <MentionArea text={text} setText={setText} placeholder="Value" />;
}

export default BtnValue;
