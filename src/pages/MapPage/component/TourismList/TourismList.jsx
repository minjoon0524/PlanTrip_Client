import React from "react";
import "./TourismList.style.css";

const TourismList = ({ places, addToSelectedList }) => {
  return (
    <div className="tourism-area">
      {Array.isArray(places) &&
        places.map((place, index) => (
          <div key={index} className="tourism-item">
            <div>
              <div>
                <a className="store-name" href={place.place_url}>
                  {place.place_name}
                </a>
              </div>
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
              <button
                className="add-trip-btn"
                onClick={() => addToSelectedList(place)}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    ></path>
                  </svg>{" "}
                </span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TourismList;
