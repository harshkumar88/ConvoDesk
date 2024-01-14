import React, { useEffect, useState } from "react";
import ListChild from "./Child";
import styles from "./style.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import MentionArea from "../../../../../../components/MentionArea";
import { MdDelete } from "react-icons/md";
function List({ data, setData, conditionHandler, contentType }) {
  const [activeIndex, setActiveIndex] = useState(0);
  let [content, setContent] = useState(data.list.content);
  useEffect(
    function () {
      setData({ ...data, list: { ...data.list, [contentType]: content } });
    },
    [content]
  );

  useEffect(() => {
    setContent(data.list[contentType]);
  }, [contentType]);

  const handleNext = () => {
    let length = data.list.value.length;
    setActiveIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const handlePrev = () => {
    let length = data.list.value.length;

    setActiveIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  function addListItem() {
    let arr = data.list.value;
    let lastIdx = -1;
    if (arr.length) {
      lastIdx = arr[arr.length - 1]["idx"];
    }
    arr.push({
      title: "",
      hindi_title: "",
      value: "",
      idx: lastIdx + 1,
      content: "",
      hindi_content: "",
    });
    setData({ ...data, list: { ...data.list, value: arr } });
  }
  function deleteBtn(item) {
    setData({
      ...data,
      list: {
        ...data.list,
        value: data.list.value.filter(function (element, index) {
          return element.idx != item.idx;
        }),
      },
    });
  }
  return (
    <>
      <MentionArea text={content} setText={setContent} placeholder="Title" />
      <div className={styles.list_wrapper}>
        {data.list.value.map((item, index) => (
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
            <ListChild
              item={item}
              data={data}
              setData={setData}
              contentType={contentType}
            />
          </div>
        ))}

        <button
          onClick={handlePrev}
          disabled={activeIndex == 0}
          className={`${styles.previous_btn} ${styles.btn}`}
          title="Previous"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex == data.list.value.length - 1}
          className={`${styles.next_btn} ${styles.btn}`}
          title="Next"
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className={styles.add_btn}>
        <button
          onClick={addListItem}
          className={styles.btn}
          title="Add List Item"
        >
          <IoAddOutline />
        </button>
      </div>
    </>
  );
}

export default List;
