import React, { useState, useRef,useEffect  } from "react";
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
  const [selectedDate, setSelectedDate] = useState('2024/05/07'); // 선택된 날짜 상태 추가
  console.log(selectedDate)
  
  // ref 생성
  const inputRef = useRef(null);
  // 검색어와 검색 결과 상태
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // 선택된 관광지 목록 상태
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // 날짜 길이 상태 및 setter 함수 정의
  const [travelDays, setTravelDays] = useState(0);


// TravelCalendar 컴포넌트에서 선택한 날짜를 받아와서 상태에 저장
const handleDateChange = (date) => {
  setSelectedDate(date);
};

const moveToSelectedDate = () => {
  // 선택된 날짜가 있을 때만 이동
  if (selectedDate) {
    // 여기에 선택된 날짜로 이동하는 로직을 구현할 수 있음
    console.log("Moving to selected date:", selectedDate);
  }
};


  // TravelCalendar 컴포넌트에서 호출할 함수
  const handleTravelDaysChange = (days) => {
    setTravelDays(days);
    console.log(travelDays)
  };
  // 검색어로 장소 검색
  const searchByKeyword = (event) => {
    setKeyword(""); // 입력 필드 초기화
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // 관광지를 선택 목록에 추가
  const addToSelectedList = (place) => {
    setSelectedPlaces([...selectedPlaces, place]);
  };

  // 선택 목록에서 관광지 제거
  const removeFromSelectedList = (index) => {
    const updatedList = [...selectedPlaces];
    updatedList.splice(index, 1);
    setSelectedPlaces(updatedList);
  };
    // travelDays 상태가 변경될 때마다 즉시 반영
    useEffect(() => {
      console.log("Travel days changed:", travelDays);
    }, [travelDays]);
  
  // 날짜 조정 함수
  const adjustDate = (amount) => {
    const parts = selectedDate.split('/');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JavaScript의 월은 0부터 시작합니다.
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    date.setDate(date.getDate() + amount); // 날짜를 조정합니다.

    const newDateString = `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}`;
    setSelectedDate(newDateString); // 상태 업데이트
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
              <TravelCalendar   onDateChange={handleDateChange} onTravelDaysChange={handleTravelDaysChange} />
            </Row>
            {/* 장소 검색 입력 폼 */}
            <Row>
              <Col>
                <Form
                  onSubmit={(event) => {
                    searchByKeyword(event);
                    setKeyword(""); // 입력 필드 초기화
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
<Row> <button onClick={() => adjustDate(-1)}>-1</button>
        <span>{selectedDate}</span>
        <button onClick={() => adjustDate(1)}>+1</button></Row>
        <Row style={{ width: "max-content" }}>
          <Stack gap={2} className="select-item-scroll-bar">
            <div className="p-2">
              <SelectList
                places={selectedPlaces}
                removeFromSelectedList={removeFromSelectedList}
              />
            </div>
          </Stack>
        </Row>
      </div>
      {/* 지도 영역 */}
      <div className="sectionBorder map-item">
        <KakaoMap keyword={keyword} onSearchResults={setSearchResults} />
      </div>
    </div>
  );
};

export default MapPage;
