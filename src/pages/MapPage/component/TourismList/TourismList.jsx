import React from "react";
import "./TourismList.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TourismList = ({ places }) => {
  return (
    <div className="tourism-area">
      {Array.isArray(places) && places.map((place, index) => (
        <div key={index} className="tourism-item">
          <div>
            <div className="store-name">{place.place_name}</div>
            <div>{place.address_name}</div>
            <div>{place.road_address_name}</div>
            <div>{place.phone}</div>
          </div>
          <div>
            <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faPlus} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourismList;
