import React from "react";
import KakaoMap from "./../../common/Map/KakaoMap";
import "./MapPage.style.css";
import Stack from "react-bootstrap/Stack";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../img/logo.png";
import TourismList from "./component/TourismList/TourismList";
import TravelCalendar from "./component/Calendar/TravelCalendar";

//1. 3등분 레이아웃 조정(완료)
//2. 마우스 드래그로 특정 영역크기 조절
//3. 내가 관광지를 선택했을 때 선택영역에 표시되게 하기
//4. 표시된 곳에서 Delete버튼 누르면 사라지게 하기
//5. 카카오 API로 검색기능 추가
//6. 카카오 API로 관광지 목록 뜨게하기
//7. 카카오 API활용 내가 선택한 관광지 마킹하기
//8. 마킹한 관광지 경로표시하기

const MapPage = () => {
  return (
    // 전체 바디 영역
    <div className="map-area">
      {/* 로고 및 검색 영역 */}
      <div className="sectionBorder logo-area ">
        <Row>
          <Col > 
            {/* logo Row */}
            <Row className="sub-logo-area">
              <Col>
                <img src={logo} alt="" width={250}></img>
              </Col>
              <Col>
                <FontAwesomeIcon  icon={faLocationCrosshairs} /> <span className="location-logo">현위치</span>
              </Col>
            </Row>
            {/* 날짜 선택(임시) / 라이브러리 사용예정 */}
            <Row> <TravelCalendar /></Row>

            {/* Search Row */}
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="장소를 검색하세요"
                    aria-label="장소를 검색하세요"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </InputGroup>
              </Col>
            </Row>

            {/* 관광지 Row */}
            <Row style={{
    width: 'max-content'
}}>
              <Stack gap={2} className="scroll-bar">
                <div className="p-2">
                  <TourismList />
                </div>
                <div className="p-2">
                  <TourismList />
                </div>
                <div className="p-2">
                  <TourismList />
                </div>
              </Stack>
            </Row>
          </Col>
        </Row>
      </div>
      {/* 내가 선택한 관광지 */}
      <div className="sectionBorder select-item">  <Row style={{
    width: 'max-content'
}}>
              <Stack gap={2} className="scroll-bar">
                <div className="p-2">
                  <TourismList />
                </div>
                <div className="p-2">
                  <TourismList />
                </div>
                <div className="p-2">
                  <TourismList />
                </div>
              </Stack>
            </Row></div>
      <div className="sectionBorder map-item">
        {" "}
        <KakaoMap />
      </div>
    </div>
  );
};

export default MapPage;
