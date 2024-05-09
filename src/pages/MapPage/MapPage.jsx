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
import SelectList from "./component/SelectList/SelectList";

const MapPage = () => {
  const [selectedDate, setSelectedDate] = useState("2024/05/07");
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [travelDays, setTravelDays] = useState(0);
  const [searchTimer, setSearchTimer] = useState(null); // 딜레이된 검색을 위한 타이머 상태

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 여행 일수 변경 핸들러
  const handleTravelDaysChange = (days) => {
    setTravelDays(days);
  };

  // 키워드 검색 실행 함수
const searchByKeyword = (event) => {
  event.preventDefault(); // 폼의 기본 동작 방지
  if (!keyword.trim()) return; // 공백이면 검색하지 않음
  clearTimeout(searchTimer); // 이전 타이머 제거
  const timer = setTimeout(() => {
    // 일정 시간이 지난 후 검색 실행
    // 여기에 검색 로직을 실행합니다.
    console.log("검색 실행:", keyword);
  }, 1000); // 1초 후 검색 실행
  setSearchTimer(timer); // 타이머 상태 업데이트
};

// Enter 키 입력 시 검색 실행
const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    searchByKeyword(event);
  }
};


  // 선택된 관광지 목록에 추가
  const addToSelectedList = (place) => {
    const selectedPlace = { date: selectedDate, place: place };
    setSelectedPlaces([...selectedPlaces, selectedPlace]);
  };

  // 선택된 관광지 목록에서 제거
  const removeFromSelectedList = (index) => {
    const updatedList = [...selectedPlaces];
    updatedList.splice(index, 1);
    setSelectedPlaces(updatedList);
  };

  // 날짜 조정 함수
  const adjustDate = (amount) => {
    const parts = selectedDate.split("/");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + amount);
    const newDateString = `${date.getFullYear()}/${(
      "0" + (date.getMonth() + 1)
    ).slice(-2)}/${("0" + date.getDate()).slice(-2)}`;
    setSelectedDate(newDateString);
  };

  // 선택된 날짜에 해당하는 관광지 목록 반환
  const getSelectedPlacesByDate = () => {
    return selectedPlaces.filter((place) => place.date === selectedDate);
  };

  return (
    <div className="map-area">
      {/* 로고 및 검색 영역 */}
      <div className="basic-drop-shadow logo-area">
        <Row>
          <Col>
            {/* 로고 및 현위치 아이콘 */}
            <Row className="sub-logo-area">
              <Col>
                <img src={logo} alt="" width={250}></img>
              </Col>
              <Col>
                <FontAwesomeIcon icon={faLocationCrosshairs} />{" "}
                <span className="location-logo">현위치</span>
              </Col>
            </Row>
            {/* 날짜 선택 */}
            <Row>
              {" "}
              <TravelCalendar
                onDateChange={handleDateChange}
                onTravelDaysChange={handleTravelDaysChange}
              />
            </Row>
            {/* 장소 검색 입력 폼 */}
            <Row>
              <Col>
                <Form onSubmit={searchByKeyword}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      ref={inputRef} // ref 설정
                      placeholder="장소를 검색하세요"
                      aria-label="장소를 검색하세요"
                      aria-describedby="basic-addon2"
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                      onKeyPress={handleKeyPress} // Enter 키 입력 시 검색 실행
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
            {/* 관광지 검색 결과 */}
            <Row style={{ width: "max-content" }}>
              <Stack gap={2} className="scroll-bar">
                <div className="p-2 ">
                  <TourismList
                    places={searchResults}
                    addToSelectedList={addToSelectedList}
                  />
                </div>
              </Stack>
            </Row>
          </Col>
        </Row>
      </div>
      {/* 선택된 관광지 목록 */}
      <div className="sectionBorder select-item">
        <Row>
          {" "}
          <button onClick={() => adjustDate(-1)}>-1</button>
          <span>{selectedDate}</span>
          <button onClick={() => adjustDate(1)}>+1</button>
        </Row>
        <Row style={{ width: "max-content" }}>
          <Stack gap={2} className="select-item-scroll-bar">
            <div className="p-2">
              <SelectList
                places={getSelectedPlacesByDate()}
                removeFromSelectedList={removeFromSelectedList}
              />
            </div>
          </Stack>
        </Row>
      </div>
      {/* 지도 영역 */}
      <div className="sectionBorder map-item">
        <KakaoMap
          keyword={keyword}
          onSearchResults={setSearchResults}
          selectedPlaces={getSelectedPlacesByDate()}
        />
      </div>
    </div>
  );
};

export default MapPage;
