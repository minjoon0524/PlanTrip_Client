import React, { useState } from "react";
import "./SelectTripPage.style.css";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TravelCard from "../../common/TravelCard/TravelCard";
const SelectTripPage = () => {
  // useState 훅을 사용하여 검색어에 대한 상태를 생성합니다.
  const [searchQuery, setSearchQuery] = useState("");

  // 사용자 입력이 변경될 때 호출될 함수입니다.
  const handleInputChange = (event) => {
    // 입력된 값으로 searchQuery 상태를 업데이트합니다.
    setSearchQuery(event.target.value);
  };

  

  return (
    <div>
      <Container className="search-area mt-3 mb-3">
        <div className="nav-top">
          <h2 className="text-3xl m-3" style={{ fontWeight: 700 }}>어디로 여행을 떠나시나요?</h2>
          <input
            className="plan-trip-search w-full "
            type="search"
            required=""
            placeholder="여행지를 검색해보세요."
            value={searchQuery} // value를 searchQuery 상태로 설정합니다.
            onChange={handleInputChange} // input 값이 변경될 때 handleInputChange 함수를 호출합니다.
          ></input>
          <button className="search-btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Container>
      <Container>
  {/* 여행지 추천 영역 */}
  <div className="recommendation-area">
    <h4 className="fw-bolder mb-3 " style={{ fontWeight: 700 }}>국내 여행지 추천</h4>
    <div className="travel-cards-container">
      <Row>
        {/* 각 TravelCard를 별도의 Col 컴포넌트로 감싸줍니다. */}
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        <Col lg={3} sm={12}><TravelCard /></Col>
        {/* 필요한 만큼 여행 카드 추가 */}
      </Row>
    </div>
  </div>
</Container>

    </div>
    
  );
};

export default SelectTripPage;
