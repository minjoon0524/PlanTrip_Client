import React from "react";
import "./TripListPage.style.css";
import { useNavigate } from "react-router-dom";
import MyTravelCard from "../../common/TravelCard copy/MyTravelCard";

const TripListPage = () => {
  const navigate = useNavigate();

  const trip = {
    id: 1,
    name: '여행 이름',
    imageUrl: 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg',
    likes: 100,
    date: '2024-01-01 ~ 2024-01-07 (7일)',
    userId: 1,
    userName: '작성자 이름',
  };
  return (
    <div id="plan-list">
      <div className="title">나만의 여행 일정</div>
      <div className="sub-title">나만의 여행을 계획해보세요!</div>
      <div className="trip-wrap">
     <MyTravelCard trip={trip} />
     <MyTravelCard trip={trip} />
     <MyTravelCard trip={trip} />
     <MyTravelCard trip={trip} />
     <MyTravelCard trip={trip} />
     <MyTravelCard trip={trip} />
     <MyTravelCard trip={trip} />
     <MyTravelCard trip={trip} />
      </div>
    </div>
  );
};

export default TripListPage;
