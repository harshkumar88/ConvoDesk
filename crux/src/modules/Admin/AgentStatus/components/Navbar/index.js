import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";
import BreakReport from "../BreakReport";
function Navbar({ options, handleSelectChange, selectedOption, data }) {
  let [agentCount, setAgentCount] = useState(0);
  useEffect(() => {
    let count = data.filter((item) => {
      return item.break_id == selectedOption?.value;
    }).length;

    setAgentCount(count);
  }, [selectedOption]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.row}>
        <div className={styles.select_div}>
          <Select
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            placeholder="Select Status"
            className={styles.select_option}
          />
          {selectedOption && (
            <label className={styles.agent_count}>({agentCount})</label>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <BreakReport options={options} data={data} />
      </div>
    </nav>
  );
}

export default Navbar;
