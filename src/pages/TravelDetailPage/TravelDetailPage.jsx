import React from "react";
import "./TravelDetailPage.style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCommonDetailQuery } from "../../hooks/useCommonDetail";
import { Col, Container, Row } from "react-bootstrap";

const TravelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const { data, isLoading, isError, error } = useCommonDetailQuery({ id });
  console.log(data);

  // 뒤로가기 함수
  const handleBack = () => {
    navigate(-1);
  };
// 일정만들기 함수
  const makeTrip=()=>{
    navigate("/trip")
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="travel-detail-page-root">
      <Container className="detail-area m-3">
        <Row>
          {/* 사진영역 */}
          <Col className="area-image">
            <img
              src={
                data.firstimage ||
                data.firstimage2 ||
                "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }
              alt={data.title}
            />
          </Col>
        </Row>
        <Row>
          <h2 className="detail-title">{data.title}</h2>
          <div className="detail-addr">{data.addr1}</div>
          <div className="detail-overview">{data.overview}</div>
          <div className="mt-3">
            <button className="detail-button" onClick={handleBack}>뒤로가기</button>
            <button className="detail-button" onClick={makeTrip}>일정만들기</button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default TravelDetailPage;
