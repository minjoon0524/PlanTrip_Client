import React from "react";
import KakaoMap from "./../../common/Map/KakaoMap";
import "./MapPage.style.css";
import Stack from 'react-bootstrap/Stack';

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

const MapPage = () => {
  return (
    <Row>
      <Col xs={3} style={{ borderRight: "2px solid black" }}>
        {/* logo Row */}
        <Row>
          <Col>
            <img src={logo} alt="" width={250}></img>
          </Col>
          <Col>
            <FontAwesomeIcon icon={faLocationCrosshairs} />
          </Col>
        </Row>
        {/* 날짜 선택(임시) / 라이브러리 사용예정 */}
        <Row>2024.04.16-2024.04.18</Row>

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
          <Row>
          <Stack gap={2}>
            
      <div className="p-2"><TourismList/></div>
      <div className="p-2"><TourismList/></div>
      <div className="p-2"><TourismList/></div>
    </Stack>
        


          </Row>
        
      </Col>



      {/* 내가 선택한 관광지 리스트 */}
      <Col xs={4} style={{ borderRight: "2px solid black" }}>
        2 of 3
      </Col>
      <Col xs={5}>
        <KakaoMap />
      </Col>
    </Row>
  );
};

export default MapPage;
