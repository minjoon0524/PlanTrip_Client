import React, { useEffect, useState } from "react";
import "./KakaoMap.style.css";
import {
  Map,
  MapMarker,
  Polyline,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { COLORS } from "./../../datas/map-constants";

const { kakao } = window;

const KakaoMap = ({
  keyword,
  onSearchResults,
  selectedPlaces,
  selectedDayIndex,
}) => {
  console.log(selectedPlaces);
  // console.log("dddd",selectedPlaces[0].dayNumber)
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [defaultPosition, setDefaultPosition] = useState({
    lat: 37.566826, // 서울의 기본 위도
    lng: 126.9786567, // 서울의 기본 경도
  });
  const [defaultLevel, setDefaultLevel] = useState(3); // 기본 레벨

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDefaultPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // 기본 위치와 마커 설정
useEffect(() => {
  if (!map) return;

  // 기본 위치에 마커 설정
  const defaultMarker = {
    position: defaultPosition,
    content: "현재위치",
  };

  const bounds = new kakao.maps.LatLngBounds();
  bounds.extend(
    new kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng)
  );
  setMarkers([defaultMarker]);
  map.setBounds(bounds);
  map.setLevel(defaultLevel);
}, [map, defaultPosition, defaultLevel]);

// 검색된 장소 표시
useEffect(() => {
  if (!map) return;

  // 기본 위치에 마커 설정
  const defaultMarker = {
    position: defaultPosition,
    content: "현재위치",
  };

  // selectedPlaces가 변경될 때마다 마커 업데이트
  const newMarkers = selectedPlaces.map((place) => ({
    position: {
      lat: parseFloat(place.place.y),
      lng: parseFloat(place.place.x),
    },
    content: place.place.place_name,
    dayNumber: place.dayNumber, // dayNumber 추가
    visitNumbers: place.visitNumbers, // visitNumbers 추가
  }));

  // 기본 위치 마커와 새로운 마커를 합치기
  const allMarkers = [defaultMarker, ...newMarkers];
  setMarkers(allMarkers);

  // 새로운 마커들을 포함하여 영역 재설정
  const newBounds = new kakao.maps.LatLngBounds();
  allMarkers.forEach((marker) =>
    newBounds.extend(
      new kakao.maps.LatLng(marker.position.lat, marker.position.lng)
    )
  );
  map.setBounds(newBounds);
}, [map, selectedPlaces]);

// 키워드 검색
useEffect(() => {
  if (!map || !keyword) return;

  const ps = new kakao.maps.services.Places();

  ps.keywordSearch(keyword, (data, status) => {
    console.log(data);
    if (status === kakao.maps.services.Status.OK) {
      onSearchResults(data);

      // 검색된 장소를 마커로만 표시하고 범위는 설정하지 않음
      const searchMarkers = data.map((place) => ({
        position: {
          lat: parseFloat(place.y),
          lng: parseFloat(place.x),
        },
        content: place.place_name,
      }));

      // 기존 마커와 검색 마커를 합쳐서 설정
      setMarkers((prevMarkers) => [...prevMarkers, ...searchMarkers]);

      // 검색된 장소 중 첫 번째 장소의 위치를 기준으로 레벨 설정
      if (data.length > 0) {
        const firstPlace = data[0];
        const level = calculateLevel(firstPlace);
        setDefaultLevel(level);
      }
    }
  });
}, [map, keyword, onSearchResults]);



  // 레벨 계산 함수
  const calculateLevel = (place) => {
    const zoomLevels = [
      { distance: 200, level: 4 },
      { distance: 500, level: 5 },
      { distance: 1000, level: 6 },
      { distance: 2000, level: 7 },
      { distance: 4000, level: 8 },
      { distance: 10000, level: 9 },
      { distance: 20000, level: 10 },
    ];
  
    let level = 4; // 기본 줌 레벨
    const distances = selectedPlaces.map((selectedPlace) => {
      const latDiff = place.y - parseFloat(selectedPlace.place.y);
      const lngDiff = place.x - parseFloat(selectedPlace.place.x);
      return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    });
  
    const maxDistance = Math.max(...distances);
  
    for (const zoomLevel of zoomLevels) {
      if (maxDistance < zoomLevel.distance) {
        level = zoomLevel.level;
        break;
      }
    }
  
    return level;
  };
  return (
    <div className="map-area">
      <Map
        center={defaultPosition}
        style={{ width: "100%", height: "100%" }}
        onCreate={setMap}
      >
        {markers.map((marker, index) => (
          <React.Fragment key={`marker-${index}`}>
            <MapMarker
              position={marker.position}
              onClick={() => {
                setInfo(marker);
                setIsOpen(true);
              }}
              image={{
                src:
                  index === 0
                    ? "/markers/marker.svg" // 현재 위치 마커인 경우 marker.svg 사용
                    : `/markers/marker${
                        marker.dayNumber &&
                        marker.dayNumber.includes(selectedDayIndex)
                          ? marker.dayNumber[selectedDayIndex] % COLORS.length
                          : 1
                      }/marker-${
                        marker.dayNumber &&
                        marker.dayNumber.includes(selectedDayIndex)
                          ? marker.dayNumber[selectedDayIndex] % COLORS.length
                          : 1
                      }-${marker.visitNumbers}.svg`, // 선택된 장소의 마커 이미지
                size: {
                  width: 32,
                  height: 32,
                },
              }}
            />
            {isOpen && info && info.content === marker.content && (
              <CustomOverlayMap position={marker.position}>
                <div className="wrap">
                  <div className="info">
                    <div className="title">
                      <div
                        className="close"
                        onClick={() => setIsOpen(false)}
                        title="닫기"
                      ></div>
                    </div>
                    <div className="body">
                      <div className="desc">
                        <div className="ellipsis">{marker.content}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomOverlayMap>
            )}
          </React.Fragment>
        ))}

        {/* 선택된 장소들 간의 선 표시 */}
        <Polyline
          path={selectedPlaces.map((place) => ({
            lat: parseFloat(place.place.y),
            lng: parseFloat(place.place.x),
          }))}
          strokeWeight={5} // 선의 두께
          // 날짜별로 색상 구분 예정
          strokeColor={"#FFAE00"} // 선의 색상
          strokeOpacity={0.7} // 선의 투명도
          strokeStyle={"solid"} // 선의 스타일
        />
      </Map>
    </div>
  );
};

export default KakaoMap;