import React, { useState } from "react";
import "./SelectList.style.css";
import { COLORS } from "../../../../datas/map-constants";

const SelectList = ({ places, removeFromSelectedList, selectedDayIndex }) => {
  const [removing, setRemoving] = useState(null);

  // 날짜별로 관광지를 그룹화하는 함수
  const groupByDate = (places) => {
    const groupedPlaces = {};
    places.forEach((place) => {
      const date = place.date;
      if (!groupedPlaces[date]) {
        groupedPlaces[date] = [];
      }
      groupedPlaces[date].push(place.place);
    });
    return groupedPlaces;
  };

  const groupedPlaces = groupByDate(places);

  const handleRemove = (index, date, place) => {
    setRemoving({ index, date, place });
    setTimeout(() => {
      removeFromSelectedList(index);
      setRemoving(null);
    }, 500); // 애니메이션 지속 시간에 맞춰 설정
  };

  return (
    <div>
      {Object.keys(groupedPlaces).map((date, dateIndex) => (
        <div key={dateIndex}>
          {groupedPlaces[date].map((place, placeIndex) => {
            const isRemoving =
              removing &&
              removing.index === placeIndex &&
              removing.date === date &&
              removing.place === place;

            return (
              <div
                key={placeIndex}
                className={`select-items ${isRemoving ? "slide-out-right" : ""}`}
              >
                {/* 구분선 */}
                <div className="select-add-button">
                  {/* 마커 이미지 삽입 */}
                  <img
                    src={`/markers/marker9/marker-9-${placeIndex+1}.svg`}
                    alt="Marker"
                    style={{ width: '32px', height: '32px' }}
                  />
                </div>
                {/* 구분선 */}
                <div>
                  <div className="store-name">{place.place_name}</div>
                  <div>
                    {place.road_address_name && (
                      <span className="street-num">도로명</span>
                    )}{" "}
                    {place.road_address_name}
                  </div>
                  <div>
                    {place.address_name && (
                      <>
                        <span className="street-num">지번</span>
                        {place.address_name}
                      </>
                    )}
                  </div>
                  <div className="tel-text">
                    {place.phone && (
                      <>
                        <span className="street-num">Tel</span>
                        {place.phone}
                      </>
                    )}
                  </div>
                </div>
                <div className="select-add-button">
                  <button
                    className="bin-button"
                    onClick={() => handleRemove(placeIndex, date, place)}
                  >
                    <svg
                      className="bin-top"
                      viewBox="0 0 39 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="5"
                        x2="39"
                        y2="5"
                        stroke="white"
                        strokeWidth="4"
                      ></line>
                      <line
                        x1="12"
                        y1="1.5"
                        x2="26.0357"
                        y2="1.5"
                        stroke="white"
                        strokeWidth="3"
                      ></line>
                    </svg>
                    <svg
                      className="bin-bottom"
                      viewBox="0 0 33 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="path-1-inside-1_8_19" fill="white">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                      </mask>
                      <path
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        fill="white"
                        mask="url(#path-1-inside-1_8_19)"
                      ></path>
                      <path
                        d="M12 6L12 29"
                        stroke="white"
                        strokeWidth="4"
                      ></path>
                      <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SelectList;
