import React from "react";
// import { Container } from "react-bootstrap";
import "./HomePage.style.css";
import Button from "react-bootstrap/Button";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="main">
        <h1>함께 이루어 나갈 기억으로</h1>
        <h1>새로운 여행을 위한 여정을 시작하세요.</h1>
        <h3>Plan Trip으로 함께해요. </h3>
        <div className="homepage-btn-area">
        <Button className="p-3" variant="dark" href="/trip">
          Plan Trip과 함께하기
        </Button>
        <Button className="p-3 ms-3" variant="dark" href="/selectTrip">
          여행지 찾기
        </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
