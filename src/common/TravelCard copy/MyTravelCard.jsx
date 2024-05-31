import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyTravelCard = ({ trip }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/plan/detail/${trip.id}`);
  };

  const handleUserClick = () => {
    navigate(`/user/${trip.userId}`);
  };

  
  

  return (
    <div className="plan-item" onClick={handleCardClick}>
      <div
        className="city-img"
        style={{ backgroundImage: `url(${trip.imageUrl})` }}
      ></div>
      <div className="info-wrap">
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={handleCardClick}
        >
          <div className="trip-name">{trip.name}</div>
          <div className="likes">
            <i className="fa-solid fa-heart"></i>
            &nbsp;{trip.likes}
          </div>
        </div>
        <div className="date">{trip.date}</div>
        <div className="member-name" onClick={handleUserClick}>
          by {trip.userName}
        </div>
      </div>
    </div>
  );
};

export default MyTravelCard;
