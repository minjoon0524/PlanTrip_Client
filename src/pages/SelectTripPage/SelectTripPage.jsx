import React, { useState, useEffect } from "react";
import "./SelectTripPage.style.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TravelCard from "../../common/TravelCard/TravelCard";
import { useSearchKeywordQuery } from "../../hooks/useSearchKeyword";
import ReactPaginate from "react-paginate";
import SelectAreaButton from "../../component/SelectArea/SelectAreaButton";

const SelectTripPage = () => {
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const areas = [
    "서울",
    "서귀포",
    "제주",
    "부산",
    "인천",
    "속초",
    "강릉",
    "경주",
  ];
  const [selectByArea, setSelectByArea] = useState("");
  console.log("selectByArea Test", selectByArea);
  const { data, isLoading, isError, error } = useSearchKeywordQuery({
    searchQuery,
    page,
    selectByArea,
  });
  console.log(data);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setTempSearchQuery(value);
  };

  const handleSearch = () => {
    setSearchQuery(encodeURI(tempSearchQuery));
    console.log("tempSearchQuery 테스트", tempSearchQuery);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // 검색 쿼리에 따라 API 호출 등의 작업 수행
    // useSearchKeywordQuery 훅을 사용하는 대신 직접 API 호출 등을 수행할 수 있음
  }, [searchQuery, page]); // 검색 쿼리와 페이지가 변경될 때마다 호출

  return (
    <div>
      <Container className="search-area mt-3 mb-3">
        <div className="nav-top">
          <h2 className="text-3xl m-3" style={{ fontWeight: 700 }}>
            어디로 여행을 떠나시나요?
          </h2>
          <input
            className="plan-trip-search w-full "
            type="search"
            required=""
            placeholder="여행지를 검색해보세요."
            value={tempSearchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          ></input>

          <button className="search-btn" onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Container>
      <Container>
        <div className="recommendation-area">
          {/* 지역 버튼 */}
          <div className="select-button-area mb-3">
            <SelectAreaButton areas={areas} setSelectByArea={setSelectByArea} />
          </div>
          <h4 className="fw-bolder mb-3" style={{ fontWeight: 700 }}>
            {searchQuery ? `${decodeURI(searchQuery)} ` : selectByArea ? `${selectByArea} ` : ""}여행지 추천
          </h4>
          <div className="travel-cards-container">
            <Row>
              {isLoading ? (
                <section className="dots-container">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </section>
              ) : isError ? (
                <div>Error: {error.message}</div>
              ) : (
                data?.body?.items?.item?.map((trip) => (
                  <Col key={trip.id} xs={12} sm={6} md={3}>
                    <TravelCard trip={trip} />
                  </Col>
                ))
              )}
            </Row>
          </div>
        </div>
        {!isLoading && (
          <div className="paginate mt-3">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.body.totalCount / 20}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default SelectTripPage;
