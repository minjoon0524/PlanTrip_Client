import React from "react";
import "./TravelCard.style.css";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TravelCard = ({ trip }) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/detail/${trip.contentid}`);
    console.log("컨텐츠 아이디 테스트",trip.contentid)
  };

  if (!trip) {
    return <Alert variant="danger">No data available</Alert>;
  }

  return (
    <Card
      className="card-area hover:scale-105"
      style={{ width: "18rem", height: "18rem", marginBottom: "1rem" }}
      onClick={goToDetail} // onClick을 Card 컴포넌트에 이동
    >
      <Card.Img
        variant="top"
        src={
          trip.firstimage ||
          trip.firstimage2 ||
          "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
        }
        style={{ width: "100%", height: "15rem" }} // 너비는 100%, 높이는 원하는 크기로 조정
      />

      <Card.Body>
        <Card.Title
          style={{ width: "100%", height: "2rem" }}
          className="text-center font-Montserrat"
        >
          {trip.title}
        </Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default React.memo(TravelCard);
