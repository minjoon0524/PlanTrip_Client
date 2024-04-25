import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

function TravelCalendar() {
  const [dateRange, setDateRange] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [travelDays, setTravelDays] = useState(0); // 여행하는 총 일수를 저장하기 위한 상태

  const changeDate = (e) => {
    const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
    const endDateFormat = e[1] ? moment(e[1]).format("YYYY/MM/DD") : startDateFormat; // 종료 날짜가 없는 경우 시작 날짜로 설정
    setDateRange(`${startDateFormat} - ${endDateFormat}`);
    setShowCalendar(false); // 날짜 선택 후 달력 숨김

    // 총 여행 일수 계산
    const start = moment(startDateFormat);
    const end = moment(endDateFormat);
    const duration = end.diff(start, 'days') + 1; // 종료 날짜 포함하여 계산
    setTravelDays(duration);
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 text-sm border-b-2 border-green-500 outline-none opacity-70 my-5 bg-transparent"
        placeholder="Select Dates"
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
      {/* 여행 일수 표시 */}
      {travelDays > 0 && (
        <p className="text-sm mt-2">총 여행 일수: {travelDays}일</p>
      )}
    </div>
  );
}

export default TravelCalendar;
