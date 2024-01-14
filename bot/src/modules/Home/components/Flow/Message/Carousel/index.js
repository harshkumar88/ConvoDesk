import React, { useState } from "react";
import CarouselChild from "./Child";
import styles from "./style.module.css";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
function Carousel({ data, items, setData, conditionHandler, contentType }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    let length = data.carousel.value.length;
    setActiveIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const handlePrev = () => {
    let length = data.carousel.value.length;

    setActiveIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  function addCarouselItem() {
    let arr = data.carousel.value;
    let lastIdx = -1;
    if (arr.length) {
      lastIdx = arr[arr.length - 1]["idx"];
    }
    arr.push({
      type: "",
      content: "",
      hindi_content: "",
      btn_title: "",
      btn_hindi_title: "",
      btn_value: "",
      idx: lastIdx + 1,
    });
    setData({
      ...data,
      carousel: { ...data.carousel, value: arr },
    });
  }
  function deleteBtn(item) {
    setData({
      ...data,
      carousel: {
        ...data.carousel,
        value: data.carousel.value.filter(function (element, index) {
          return element.idx != item.idx;
        }),
      },
    });
  }
  return (
    <>
      <div
        className="carousel"
        style={{ position: "relative ", padding: "0vh 2vw" }}
      >
        {data?.carousel?.value.map((item, index) => (
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
            <CarouselChild
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
          className={`${styles.btn} ${styles.previous_btn}`}
          title="Previous"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex == data.carousel.value.length - 1}
          className={`${styles.btn} ${styles.next_btn}`}
          title="Next"
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className={styles.add_btn}>
        <button
          onClick={addCarouselItem}
          className={styles.btn}
          title="Add Carousel Item"
        >
          <IoAddOutline />
        </button>
      </div>
    </>
  );
}

export default Carousel;
