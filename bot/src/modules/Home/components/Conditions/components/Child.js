import React, { useState, useEffect } from "react";
import styles from "../css/style.module.css";
import MentionArea from "../../../../../components/MentionArea";
import Select from "react-select";

function Child({ data, expressions, setExpressions }) {
  const options = [
    { value: "==", label: "Equals" },
    { value: "!=", label: "Not equals" },
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: ">=", label: "Greater than or equals" },
    { value: "<=", label: "Less than or equals" },
    { value: "in", label: "In" },
  ];
  let [lhs, setLhs] = useState(data.lhs);
  let [rhs, setRhs] = useState(data.rhs);
  let [operator, setOperator] = useState(data.operator);
  useEffect(
    function () {
      let payload = expressions.map(function (item, idx) {
        if (item.idx == data.idx) {
          return {
            lhs: lhs,
            rhs: rhs,
            operator: operator,
            idx: item.idx,
          };
        } else {
          return { ...item };
        }
      });
      setExpressions(payload);
    },
    [lhs, rhs, operator]
  );

  useEffect(() => {
    setRhs(data.rhs);
    setLhs(data.lhs);
  }, [data.rhs, data.lhs]);

  function selectedOption(arr, id) {
    const index = arr.findIndex((item) => item.value === id);
    return arr[index];
  }

  return (
    <div className={styles.expression}>
      <div className={styles.expression_child}>
        <MentionArea
          text={lhs}
          setText={setLhs}
          placeholder="Input"
          isCondition={true}
        />
      </div>

      <div className={styles.expression_child}>
        <Select
          options={options}
          value={selectedOption(options, operator)}
          onChange={function (option) {
            setOperator(option["value"]);
          }}
        />
      </div>
      <div className={styles.expression_child}>
        <MentionArea
          text={rhs}
          setText={setRhs}
          placeholder="Input"
          isCondition={true}
        />
      </div>
    </div>
  );
}

export default Child;
