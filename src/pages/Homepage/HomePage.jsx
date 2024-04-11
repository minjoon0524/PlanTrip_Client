import React from "react";
// import { Container } from "react-bootstrap";
import "./HomePage.style.css";
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  return (
    <div className="homePage">

    <div className="main">
      <h1>함께 이루어 나갈 기억으로</h1>
      <h1>새로운 여행을 위한 여정을 시작하세요.</h1>
      <h3>Plan Trip으로 함께해요. </h3>
      <Button className="p-3" variant="dark">Plan Trip과 함께하기</Button>
     
    </div>

  </div>
  )
}

export default HomePage
