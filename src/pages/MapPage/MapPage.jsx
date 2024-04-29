import React, { useState, useRef } from "react";
import KakaoMap from "./../../common/Map/KakaoMap";
import "./MapPage.style.css";
import Stack from "react-bootstrap/Stack";

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
//a. 날짜 선택 라이브러리 불러오기(완료)
//2. 내가 관광지를 선택했을 때 선택영역에 표시되게 하기
//3. 표시된 곳에서 Delete버튼 누르면 사라지게 하기
//4. 카카오 API로 검색기능 추가
// - 검색은 가능하나 지도가 키워드 하나하나에 바뀜(키워드 완성 후 바뀔 수 있도록 수정 예정)
//5. 카카오 API로 관광지 목록 뜨게하기
// - 첫 시작시 뜨게 할 것은? 음... [해수욕장,산,놀이동산,계곡 .. 등]을 넣고 랜덤으로 표시되게 할까?
// - 검색하면 리스트가 바뀔 수 있도록 하기

//6. 카카오 API활용 내가 선택한 관광지 마킹하기
//7. 마킹한 관광지 경로표시하기

const MapPage = () => {
  // 검색 후 텍스트를 지우기 위해 ref생성
  const inputRef = useRef(null); // ref 생성
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchByKeyword = (event) => {
    setKeyword(""); // 입력 필드를 비움
    event.preventDefault();

    // 입력 필드의 값을 직접 지워줌
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    // 전체 바디 영역
    <div className="map-area mt-3">
      {/* 로고 및 검색 영역 */}
      <div className="sectionBorder logo-area ">
        <Row>
          <Col>
            {/* logo Row */}
            <Row className="sub-logo-area">
              <Col>
                <img src={logo} alt="" width={250}></img>
              </Col>
              <Col>
                <FontAwesomeIcon icon={faLocationCrosshairs} />{" "}
                <span className="location-logo">현위치</span>
              </Col>
            </Row>
            {/* 날짜 선택*/}
            <Row>
              {" "}
              <TravelCalendar />
            </Row>

            {/* Search Row */}
            <Row>
              <Col>
                <Form
                  onSubmit={(event) => {
                    searchByKeyword(event);
                    setKeyword(""); // 입력 필드를 비움
                  }}
                >
                  <InputGroup className="mb-3">
                    <Form.Control
                      ref={inputRef} // ref 설정
                      placeholder="장소를 검색하세요"
                      aria-label="장소를 검색하세요"
                      aria-describedby="basic-addon2"
                      onChange={(event) => setKeyword(event.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      type="submit"
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
            </Row>

            {/* 관광지 Row */}
            <Row
              style={{
                width: "max-content",
              }}
            >
              <Stack gap={2} className="scroll-bar">
                <div className="p-2 ">
                  <TourismList places={searchResults} />
                </div>
              </Stack>
            </Row>
          </Col>
        </Row>
      </div>
      {/* 내가 선택한 관광지 */}
      <div className="sectionBorder select-item">
        {" "}
        <Row
          style={{
            width: "max-content",
          }}
        >
          <Stack gap={2} className="scroll-bar">
            <div className="p-2">
              <TourismList places={searchResults} />
            </div>
          </Stack>
        </Row>
      </div>
      <div className="sectionBorder map-item">
        {" "}
        <KakaoMap keyword={keyword} onSearchResults={setSearchResults} />
      </div>
    </div>
  );
};

export default MapPage;
