// SelectTripPage.js
import React, { useState, useEffect } from "react";
import "./SelectTripPage.style.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TravelCard from "../../common/TravelCard/TravelCard";
import { useSearchKeywordQuery } from "../../hooks/useSearchKeyword";

const SelectTripPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, error } = useSearchKeywordQuery();
  console.log(data)

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    // 검색 쿼리에 따라 API 호출 등의 작업 수행
    // useSearchKeywordQuery 훅을 사용하는 대신 직접 API 호출 등을 수행할 수 있음
  }, [searchQuery]); // 검색 쿼리가 변경될 때마다 호출

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
            value={searchQuery}
            onChange={handleInputChange}
          ></input>
          <button className="search-btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Container>
      <Container>
        <div className="recommendation-area">
          <h4 className="fw-bolder mb-3 " style={{ fontWeight: 700 }}>국내 여행지 추천</h4>
          <div className="travel-cards-container">
            <Row>
              {isLoading ? (
                <section class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </section>
              ) : isError ? (
                <div>Error: {error.message}</div>
              ) : (
                data.map((item) => (
                  <Col key={item.id} xs={12} sm={6} md={3}>
                    <TravelCard item={item} />
                  </Col>
                ))
              )}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SelectTripPage;
