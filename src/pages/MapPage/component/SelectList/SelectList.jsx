import React from "react";
import "./SelectList.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const SelectList = ({ places, removeFromSelectedList }) => {
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

  return (
    <div className="select-area">
      {Object.keys(groupedPlaces).map((date, index) => (
        <div key={index}>
          {groupedPlaces[date].map((place, index) => (
            <div key={index} className="select-items">
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
              <div className="add-button">
                {/* X 버튼 클릭 시 removeFromSelectedList 함수 호출 */}
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={faCircleXmark}
                  onClick={() => removeFromSelectedList(index)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SelectList;
