import React, { useState, useEffect } from "react";
import MentionArea from "../../../../../../components/MentionArea";

function BtnTitle({ item, data, setData, contentType }) {
  let [text, setText] = useState("");
  // useEffect(
  //   function () {
  //     setText(item.title);
  //   },
  //   [item]
  // );

  useEffect(
    function () {
      if (contentType == "hindi_content") {
        setText(item["hindi_title"]);
      } else {
        setText(item.title);
      }
    },
    [contentType]
  );

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
                    if (contentType == "hindi_content") {
                      return { ...item, hindi_title: text };
                    } else {
                      return { ...item, title: text };
                    }
                  }
                })
              : contentType == "hindi_content"
              ? [{ hindi_title: text, idx: 0, id: 1 }]
              : [{ title: text, idx: 0, id: 1 }],
        },
      });
    },
    [text]
  );

  return <MentionArea text={text} setText={setText} placeholder="Title" />;
}

export default BtnTitle;
