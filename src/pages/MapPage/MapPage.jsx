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

import TripModal from "./../../modal/TripModal";

const MapPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [travelDays, setTravelDays] = useState(0);
  const [searchTimer, setSearchTimer] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [showLogoAndSearch, setShowLogoAndSearch] = useState(true);
  const [markers, setMarkers] = useState([]);
  // 모달 가시성을 제어하는 상태
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // 모달을 보여주는 함수
  const handleShow = () => setShow(true);

  // 모달을 숨기는 함수
  const handleClose = () => setShow(false);

  // 제목 입력 변화 핸들러
  const handleTitleChange = (e) => setTitle(e.target.value);

  // 파일 업로드 변화 핸들러
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    // 제출 처리 임시로직
    console.log("Title:", title);
    console.log("File:", file);
    navigate('/trip/list')
    setShowLogoAndSearch(true);
    handleClose();
  };
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

  const btnStyle = {
    display: selectedDate === "" ? "none" : "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
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
            <Row>
              <TravelCalendar
                style={{ textAlign: "center" }}
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
            style={ btnStyle }
            onClick={() => adjustDate(-1)}
            disabled={selectedDayIndex === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="cal-item">{selectedDate}</span>
          <button
            className="calendar-btn"
            style={ btnStyle }
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
               keyword={keyword}
               onSearchResults={setSearchResults}
               selectedPlaces={getSelectedPlacesByDate()}
               selectedDayIndex={selectedDayIndex}
                places={getSelectedPlacesByDate()}
                removeFromSelectedList={removeFromSelectedList}
              />
            </div>
          </Stack>
          <Stack>
            {selectedPlaces.filter((place) => place.date === selectedDate)
              .length > 0 && (
              <div className="make-trip-area">
                <button className="make-trip-btn" onClick={handleShow}>
                  <span>
                    Submit
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill="#ffffff"
                          d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                  <span>Sure ?</span>
                  <span>
                    Done !
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          stroke-linecap="round"
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M8.00011 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6"
                        ></path>{" "}
                        <path
                          fill="#ffffff"
                          d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 14.5758 4.93935 14.226 5.36679L9.65273 10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </Stack>
          <TripModal
            show={show}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            handleTitleChange={handleTitleChange}
            setTitle={setTitle}
            setFile={setFile}
          />
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
