import React from "react";
import "./TourismList.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TourismList = ({ places, addToSelectedList,travelDays  }) => {
   // travelDays의 길이에 맞게 빈 배열을 생성합니다.
   const placeArrays = Array.from({ length: travelDays }, () => []);
  
   console.log(placeArrays)
  
  return (
    <div className="tourism-area">
      {Array.isArray(places) &&
        places.map((place, index) => (
          <div key={index} className="tourism-item">
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
            <div>
              {/* + 버튼 클릭 시 addToSelectedList 함수 호출 */}
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faPlus}
                onClick={() => addToSelectedList(place)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TourismList;