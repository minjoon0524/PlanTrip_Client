import React from "react";
import "./TourismList.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TourismList = () => {
  return (
    <div className="tourism-area">
      <div className="tourism-item">
        <div>
          <div className="store-name">벅벅 이태원점</div>
          <div>서울 용산구 이태원로 20길 24</div>
          <div>서울 용산구 이태원동 74-22</div>
          <div>070-4185-8820</div>
        </div>

        <div>
          <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faPlus} />
        </div>
      </div>
    </div>
  );
};

export default TourismList;
