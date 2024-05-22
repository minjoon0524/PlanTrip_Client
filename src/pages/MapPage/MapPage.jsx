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
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../img/minilogo.png";
import TourismList from "./component/TourismList/TourismList";
import TravelCalendar from "./component/Calendar/TravelCalendar";
import SelectList from "./component/SelectList/SelectList";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [travelDays, setTravelDays] = useState(0);
  const [searchTimer, setSearchTimer] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const navigate = useNavigate();

  //Main페이지로 이동하기 위한 함수
  const goToMain = () => {
    navigate("/");
  };

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
    event.preventDefault();
    if (!keyword.trim()) return;
    clearTimeout(searchTimer);
    const timer = setTimeout(() => {
      console.log("검색 실행:", keyword);
    }, 1000);
    setSearchTimer(timer);
  };

  // Enter 키 입력 시 검색 실행
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchByKeyword(event);
    }
  };

  // 선택된 관광지 목록에 추가
  const addToSelectedList = (place) => {
    const dayNumbers = getDayNumbers(selectedDate, travelDays);
    const visitNumbersByDate =
      selectedPlaces.filter((p) => p.date === selectedDate).length + 1;
    const selectedPlace = {
      date: selectedDate,
      place: place,
      dayNumber: dayNumbers,
      visitNumbers: visitNumbersByDate,
    };
    setSelectedPlaces([...selectedPlaces, selectedPlace]);
  };

  // 선택된 관광지 목록에서 제거
  const removeFromSelectedList = (index) => {
    const updatedList = [...selectedPlaces];
    updatedList.splice(index, 1);
    setSelectedPlaces(updatedList);

    const selectedDatePlaces = updatedList.filter(
      (place) => place.date === selectedDate
    );
    const newSelectedPlaces = selectedDatePlaces.map((place, idx) => ({
      ...place,
      visitNumbers: idx + 1,
    }));
    setSelectedPlaces((prev) => [
      ...prev.filter((place) => place.date !== selectedDate),
      ...newSelectedPlaces,
    ]);
  };

  // 날짜 조정 함수
  const adjustDate = (amount) => {
    const newIndex = selectedDayIndex + amount;

    setSelectedDayIndex(newIndex);

    const parts = selectedDate.split("/");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + amount);
    const newDateString = `${date.getFullYear()}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${("0" + date.getDate()).slice(-2)}`;
    setSelectedDate(newDateString);
  };

  // 선택된 날짜에 해당하는 관광지 목록 반환
  const getSelectedPlacesByDate = () => {
    return selectedPlaces.filter((place) => place.date === selectedDate);
  };

  // TravelCalendar 컴포넌트에서 여행 일수와 시작 날짜를 이용하여 dayNumber를 생성하는 함수
  const getDayNumbers = (startDate, travelDays) => {
    const start = moment(startDate, "YYYY/MM/DD");
    const today = moment(selectedDate, "YYYY/MM/DD");
    const dayNumbers = Array.from({ length: travelDays }, (_, index) =>
      start.clone().add(index, "days").diff(today, "days")
    );
    return dayNumbers;
  };

  return (
    <div className="map-area">
      {/* 로고 및 검색 영역 */}
      <div className="basic-drop-shadow logo-area-map-page">
        <Row>
          <Col>
            {/* 로고 및 현위치 아이콘 */}
            <Row className="sub-logo-area">
              <Col className="mb-3" style={{ marginTop: "50px" }}>
                <img src={logo} alt="" width={160} onClick={goToMain}></img>
              </Col>
            </Row>
            {/* 날짜 선택 */}
            <Row >
              <TravelCalendar
              style={{ textAlign: "center" }}
                onDateChange={handleDateChange}
                onTravelDaysChange={handleTravelDaysChange}
              />
            </Row>
            {/* 장소 검색 입력 폼 */}
            <Row>
              <Col>
                <Form 
                onSubmit={searchByKeyword}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      ref={inputRef}
                      placeholder="장소를 검색하세요"
                      aria-label="장소를 검색하세요"
                      aria-describedby="basic-addon2"
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                      onKeyPress={handleKeyPress}
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
            <Row className="m-3">
              <Stack
                style={{
                  paddingLeft: "0px",
                  paddingRight: "0px",
                }}
                gap={2}
                className={`${searchResults.length === 0 ? "" : "scroll-bar"}`}
              >
                <div>
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
      <div
        className={`${selectedDate !== "" ? "select-item section-border" : ""}`}
        style={{ display: selectedDate === "" ? "none" : "block" }}
      >
        <div className="select-cal-area">
          <button
            className="calendar-btn"
            style={{ display: selectedDate === "" ? "none" : "block" }}
            onClick={() => adjustDate(-1)}
            disabled={selectedDayIndex === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="cal-item">{selectedDate}</span>
          <button
            className="calendar-btn"
            style={{ display: selectedDate === "" ? "none" : "block" }}
            onClick={() => adjustDate(1)}
            disabled={selectedDayIndex === travelDays - 1}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <Row style={{ width: "max-content" }}>
          <Stack
            gap={2}
            className={`${
              getSelectedPlacesByDate().length > 0
                ? "select-item-scroll-bar"
                : ""
            }`}
          >
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
          selectedDayIndex={selectedDayIndex}
        />
      </div>
    </div>
  );
};

export default MapPage;
