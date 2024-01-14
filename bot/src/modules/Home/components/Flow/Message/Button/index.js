import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import BtnValue from "./BtnValue";
import BtnTitle from "./BtnTitle";
import MentionArea from "../../../../../../components/MentionArea";
import { AppContext } from "../../../../../../App";
import { MdDelete } from "react-icons/md";

function Button({ data, setData, conditionHandler, contentType }) {
  const appContext = useContext(AppContext);
  let [text, setText] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    let length = data.button.value.length;
    setActiveIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const handlePrev = () => {
    let length = data.button.value.length;

    setActiveIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };
  function deleteBtn(item) {
    setData({
      ...data,
      button: {
        ...data.button,
        value: data.button.value.filter(function (element, index) {
          return element.idx != item.idx;
        }),
      },
    });
  }
  useEffect(
    function () {
      setData({ ...data, button: { ...data.button, [contentType]: text } });
    },
    [text]
  );

  useEffect(() => {
    setText(data.button[contentType]);
  }, [contentType]);

  return (
    <div className={`${styles.message_container} ${styles.btn_msg_container}`}>
      <MentionArea text={text} setText={setText} placeholder="Content" />
      <div className={styles.btn_wrapper} style={{ position: "relative" }}>
        {data.button.value.map((item, index) => (
          <div
            key={index}
            className={
              index === activeIndex
                ? `${styles.carousel_item}${styles.active}`
                : `${styles.carousel_item}`
            }
          >
            <button
              title="Delete"
              className={styles.delete_btn}
              onClick={function () {
                deleteBtn(item);
              }}
            >
              <MdDelete />
            </button>
            <BtnTitle
              item={item}
              data={data}
              setData={setData}
              contentType={contentType}
            />
            <BtnValue item={item} data={data} setData={setData} />
          </div>
        ))}
        <button
          onClick={handlePrev}
          disabled={activeIndex == 0}
          className={`${styles.btn} ${styles.previous_btn}`}
          title="Previous"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex == data.button.value.length - 1}
          className={`${styles.btn} ${styles.next_btn}`}
          title="Next"
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className={styles.add_btn}>
        <button
          onClick={function () {
            let arr = data.button.value;
            if (arr.length >= 3) {
              console.log("invalid");
              appContext.setAlert(
                "Can't add more than 3 buttons !!",
                "alert_error"
              );
              return;
            }
            let lastIdx = -1;
            if (arr.length) {
              lastIdx = arr[arr.length - 1]["idx"];
            }
            arr.push({
              title: "",
              value: "",
              idx: lastIdx + 1,
              hindi_title: "",
            });
            setData({ ...data, button: { ...data.button, value: arr } });
          }}
          className={styles.btn}
          title="Add Button"
        >
          <IoAddOutline />
        </button>
      </div>
    </div>
  );
}

export default Button;
