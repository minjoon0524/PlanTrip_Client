// TravelCalendar.jsx

import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./TravelCalendar.style.css";

function TravelCalendar({ onTravelDaysChange, onDateChange }) {
  const [dateRange, setDateRange] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const changeDate = (e) => {
    const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
    const endDateFormat = e[1]
      ? moment(e[1]).format("YYYY/MM/DD")
      : startDateFormat;

    const start = moment(startDateFormat);
    const end = moment(endDateFormat);
    const duration = end.diff(start, "days") + 1;

    setDateRange(`${startDateFormat} - ${endDateFormat} (${duration}일)`);
    setShowCalendar(false);
    onTravelDaysChange(duration);
    onDateChange(startDateFormat); // 선택된 시작 날짜를 상위 컴포넌트로 전달
  };

  return (
    <div className="m-2">
      <input
        type="text"
        style={{
          width: "100%",
          padding: "5px",
          fontSize: "1rem",
          borderBottom: "2px solid black",
          outline: "none",
          opacity: "0.7",
          backgroundColor: "transparent",
          border: "none",
        }}
        placeholder="여행 날짜를 선택하세요"
        value={dateRange || ""}
        onClick={() => setShowCalendar(!showCalendar)}
        readOnly
      />

      {showCalendar && (
        <Calendar
        
          onChange={changeDate}
          selectRange={true}
          formatDay={(locale, date) => moment(date).format("DD")}
        />
      )}
    </div>
  );
}

export default TravelCalendar;
