import React, { useState } from "react";
// import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize"; // Make sure to include this line
import "react-dates/lib/css/_datepicker.css"; // Import the default styles

function Calendar({ setDatePicker, handleShowDate }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate"); // Automatically open the start date input

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    return false;
  };

  function handleUpdateButtonClick() {
    if (startDate) {
      handleShowDate(
        format(startDate._d, "yyMMdd"),
        format(startDate._d, "yyMMdd")
      );
    }
    if (endDate) {
      handleShowDate(
        format(startDate._d, "yyMMdd"),
        format(endDate._d, "yyMMdd")
      );
    }

    setDatePicker(2);
  }

  return (
    <div className="date-range-overlay">
      <div className="date-range-container">
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date_id"
          endDate={endDate}
          endDateId="end_date_id"
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={function (focused) {
            setFocusedInput(focused);
            return false;
          }}
          isOutsideRange={() => false}
          keepOpenOnDateSelect={true}
          onClose={handleUpdateButtonClick}
        />
      </div>
      <div className="calendar_btn">
        <button className="date-range-btn" onClick={handleUpdateButtonClick}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Calendar;
