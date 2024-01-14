import React, { useState } from "react";
import Select from "react-select";
import Calendar from "./components/Calendar";
import { customStyles } from "./components/CustomStyles";
import { convertSlot, options } from "../utility";

function DatePicker({ callBackfn }) {
  let [datePicker, setDatePicker] = useState(0);
  let [selectedLabel, setSelectedLabel] = useState("Today");
  let [showDate, setShowDate] = useState("---");
  function handleChange(e) {
    setSelectedLabel(e.label);
    setDatePicker(false);
    if (e.label == "Select Time Period") {
      setDatePicker(1);
    } else {
      callBackfn(e.value.from_slot, e.value.to_slot);
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
        options={options}
        onChange={handleChange}
        value={options.filter((item) => {
          if (item.label === selectedLabel) return item;
        })}
        // onChange={function (e) {
        //   setSelectedFilter({
        //     ...selectedFilter,
        //     status: e.value.charAt(0),
        //   });
        // }}
        className="date_picker"
      />

      {datePicker == 2 && <p className="select_custom_date">({showDate})</p>}
    </div>
  );
}

export default DatePicker;
