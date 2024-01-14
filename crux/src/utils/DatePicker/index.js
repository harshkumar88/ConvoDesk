import React, { useEffect, useState } from "react";
import Select from "react-select";
import Calendar from "./components/Calendar";
import { customStyles } from "./components/CustomStyles";
import { convertSlot, formatDate, options } from "../utility";

function DatePicker({ callBackfn, setFilter, isAgentDashboard }) {
  let [datePicker, setDatePicker] = useState(0);
  let [selectedLabel, setSelectedLabel] = useState("Last 7 days");
  let [showDate, setShowDate] = useState("---");
  const filteredOptions = options.filter(
    (item) =>
      item.label === "Today" ||
      item.label === "Yesterday" ||
      item.label === "This Week" ||
      item.label === "Last 7 days"
  );

  function handleChange(e) {
    if (e == null) {
      setSelectedLabel("---");
      callBackfn(-1, -1);
      localStorage.setItem("date", "---");
      setDatePicker(false);
    } else {
      setSelectedLabel(e.label);
      setDatePicker(false);
      if (setFilter) {
        localStorage.setItem("date", e.label);
      }
      if (e.label == "Select Time Period") {
        setDatePicker(1);
      } else {
        callBackfn(e.value.from_slot, e.value.to_slot);
      }
    }
  }

  function handleShowDate(from_slot, to_slot) {
    if (from_slot != to_slot) {
      setShowDate(`${convertSlot(from_slot)} - ${convertSlot(to_slot)}`);
    } else {
      setShowDate(`${convertSlot(from_slot)}`);
    }
    callBackfn(from_slot, to_slot);
  }

  useEffect(() => {
    if (setFilter) {
      let date = localStorage.getItem("date");
      if (date) {
        if (date == "Select Time Period") {
          setDatePicker(2);
          let data = localStorage.getItem("filter");
          if (data) {
            let selectedDate = JSON.parse(data)["n_slot_id"];
            if (selectedDate) {
              if (selectedDate[0] != selectedDate[1]) {
                setShowDate(
                  `${convertSlot(selectedDate[0])} - ${convertSlot(
                    selectedDate[1]
                  )}`
                );
              } else {
                setShowDate(`${convertSlot(selectedDate[0])}`);
              }
            }
          }
        }
        setSelectedLabel(date);
      } else {
        setSelectedLabel("Today");
        localStorage.setItem("date", "Today");
      }
    }
  }, []);
  return (
    <div className="calendar_div">
      {datePicker == 1 && (
        <Calendar
          setDatePicker={setDatePicker}
          handleShowDate={handleShowDate}
        />
      )}
      <Select
        styles={customStyles}
        options={isAgentDashboard ? filteredOptions : options}
        onChange={handleChange}
        value={options.filter((item) => {
          if (item.label === selectedLabel) return item;
        })}
        className="date_picker"
        isClearable={setFilter}
        placeholder="Select Date"
      />

      {datePicker == 2 && <p className="select_custom_date">({showDate})</p>}
    </div>
  );
}

export default DatePicker;
