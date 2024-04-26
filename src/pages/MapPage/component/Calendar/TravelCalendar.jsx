import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './TravelCalendar.style.css'; // CSS 파일 임포트

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
  style={{
    width: '100%', // 전체 너비를 차지하도록 설정
    padding: '8px', // 적당한 패딩 설정
    fontSize: '1rem', // 글자 크기 설정
    borderBottom: '2px solid black', // 아래쪽 경계선 설정
    outline: 'none', // 선택 시 외곽선 제거
    opacity: '0.7', // 투명도 설정
    marginTop: '20px', // 위쪽 여백 설정
    marginBottom: '20px', // 아래쪽 여백 설정
    backgroundColor: 'transparent', // 배경색 투명하게 설정
    border: 'none' // 나머지 경계선 제거
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
      {/* 여행 일수 표시 */}
      {travelDays > 0 && (
        <p className="text-sm mt-2">총 여행 일수: {travelDays}일</p>
      )}
    </div>
  );
}

export default TravelCalendar;
