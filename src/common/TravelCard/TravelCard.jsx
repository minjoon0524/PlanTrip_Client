import React from "react";
import "./TravelCard.style.css";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";

const TravelCard = ({ item }) => {
  if (!item) {
    return <Alert variant="danger">No data available</Alert>;
  }

  return (
    <Card className="card-area hover:scale-105" style={{ width: "18rem", height: "18rem", marginBottom: "1rem" }}>
      <Card.Img
        variant="top"
        src={item.firstimage || item.firstimage2 || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
        style={{ width: "100%", height: "15rem"}} // 너비는 100%로 설정하고 높이를 원하는 크기로 조정합니다.
      />
      
      <Card.Body>
        <Card.Title style={{ width: "100%", height: "2rem" }} className="text-center font-Montserrat">{item.title}</Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default React.memo(TravelCard);
