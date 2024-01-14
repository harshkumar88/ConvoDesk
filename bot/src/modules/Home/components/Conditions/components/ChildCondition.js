import React, { useEffect, useState } from "react";
import Select from "react-select";
import GoTo from "./Goto";
import styles from "../css/style.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import Child from "./Child";
import { IoAddCircleOutline } from "react-icons/io5";
function ChildCondition({ data, conditions, setConditions, dialogues }) {
  const options = [
    { value: "and", label: "And" },
    { value: "or", label: "Or" },
  ];
  let [expressions, setExpressions] = useState(data.expressions);
  let [operator, setOperator] = useState(data.combined_operator);
  let [success, setSuccess] = useState(data.success);
  let [error, setError] = useState(data.error);
  let [show, setShow] = useState(false);
  let [idx, setIdx] = useState(data.idx);
  useEffect(
    function () {
      let payload = conditions.map(function (item, idx) {
        if (item.idx == data.idx) {
          return {
            combined_operator: operator,
            expressions: expressions,
            success: success,
            error: error,
            idx: item.idx,
          };
        } else {
          return { ...item };
        }
      });
      setConditions(payload);
    },
    [operator, expressions, success, error]
  );

  useEffect(
    function () {
      if (idx != data.idx) {
        setExpressions(data.expressions);
        setOperator(data.combined_operator);
        setSuccess(data.success);
        setIdx(data.idx);
      }
    },
    [data.idx]
  );

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  function handleDelete() {
    setConditions(
      conditions.filter(function (element, idx) {
        return element.idx != data.idx;
      })
    );
  }
  function handleToggle() {
    setShow(true);
  }
  function handleShow() {
    setShow(false);
  }
  function addExpression() {
    let lastIdx = -1;
    if (expressions.length) {
      lastIdx = expressions[expressions.length - 1]["idx"];
    }
    const arr = [
      ...expressions,
      {
        lhs: "",
        rhs: "",
        operator: "",
        idx: lastIdx + 1,
      },
    ];
    setExpressions(arr);
  }
  return (
    <>
      <div className={styles.condition}>
        <div className={styles.condition_subdiv}>
          <div>Condition</div>
          <button
            onClick={handleDelete}
            title="Delete Condition"
            className={styles.delete_condition}
          >
            <RiDeleteBin6Line className={styles.delete_icon} />
          </button>
        </div>
        <div className={styles.add_expression}>
          <Select
            options={options}
            value={selectedOption(options, operator)}
            onChange={function (option) {
              setOperator(option["value"]);
            }}
            className={styles.combined_operator}
          />
          <button onClick={addExpression} className={styles.delete_condition}>
            <IoAddCircleOutline className={styles.delete_icon} />
          </button>
        </div>

        {expressions.map(function (item, idx) {
          return (
            <Child
              data={item}
              expressions={expressions}
              setExpressions={setExpressions}
              key={idx}
            />
          );
        })}
        <div className={styles.result}>
          <div className={styles.result_wrapper}>
            <div className={styles.result_div}>
              <p className={styles.p}>GoTo</p>
              <div className={styles.goto_div}>
                <GoTo
                  data={success}
                  setData={setSuccess}
                  dialogues={dialogues}
                />
              </div>
            </div>
            <div onClick={handleToggle} className={styles.add_btn_div}>
              <IoMdAddCircleOutline className={styles.plus_icon} />
              Else
            </div>
          </div>

          {show && (
            <div className={styles.result_wrapper}>
              <div className={styles.result_div}>
                <p className={styles.p}>Else</p>
                <div className={styles.goto_div}>
                  <GoTo data={error} setData={setError} dialogues={dialogues} />
                </div>
              </div>
              <div onClick={handleShow} className={styles.subtract_icon}>
                <AiOutlineMinusCircle />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChildCondition;
