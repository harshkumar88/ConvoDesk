import React, { useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";
import DatePicker from "../../../../utils/DatePicker";

export default function Filter({
  setSelectedDate,
  selectedFilter,
  setSelectedFilter,
  selectedDate,
  setQuery,
}) {
  const status_options = [
    { value: "Open", label: "Open" },
    { value: "Resolved", label: "Resolved" },
  ];

  const [selectedStatusOption, setSelectedStatusOption] = useState(
    status_options.find(
      (option) =>
        option.value === (selectedFilter.status === "O" ? "Open" : "Resolved")
    )
  );

  function handleDate(from_slot, to_slot) {
    setSelectedDate({ from_slot: from_slot, to_slot: to_slot });
  }
  function handleApply() {
    setQuery("");
    setSelectedFilter({
      ...selectedFilter,
      status: selectedStatusOption.value.charAt(0),
      n_slot_id: [selectedDate.from_slot, selectedDate.to_slot],
    });
  }

  return (
    <div className={styles.filter_wrapper}>
      <div className={styles.filter_header}>
        <h3 className={styles.filter_heading}>Filter</h3>
      </div>
      <div className={styles.filter_content} style={{ flexGrow: "1" }}>
        <div className={styles.filter}>
          <label className={styles.label}>Time</label>
          <DatePicker
            callBackfn={handleDate}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Conversation Status</label>
          <Select
            placeholder="Select"
            options={status_options}
            value={selectedStatusOption}
            onChange={(selectedOption) => {
              setSelectedStatusOption(selectedOption);
            }}
          />
        </div>
      </div>
      <div className={styles.filter_bottom}>
        <button className={styles.apply_btn} onClick={handleApply}>
          Apply
        </button>{" "}
      </div>
    </div>
  );
}
