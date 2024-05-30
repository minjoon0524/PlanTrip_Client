import React from "react";
import "./TravelDetailPage.style.css";

import { useCommonDetailQuery } from "./../../hooks/useCommonDetail";
import { Col, Container, Row } from "react-bootstrap";

const TravelDetailPage = () => {
  const { data, isLoading, isError, error } = useCommonDetailQuery();

  console.log(data);
  return (
    <div className="travel-detail-page-root">
<Container  className="detail-area">
      <Row>
        {/* 사진영역 */}
        <Col className="area-image">
          <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"></img>
        </Col>
        {/* 타이틀 , 개요, 주소 */}
      
      </Row>

      <Row>
          <h2 className="detail-title ">경복궁</h2>
          <div className="detail-addr">서울특별시 종로구 사직로 161</div>
          <div className="detail-overview">경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. 경복궁은 동궐(창덕궁)이나 서궐(경희궁)에 비해 위치가 북쪽에 있어 ‘북궐’이라 불리기도 했다. 경복궁은 5대 궁궐 가운데 으뜸의 규모와 건축미를 자랑한다. 경복궁 근정전에서 즉위식을 가진 왕들을 보면 제2대 정종, 제4대 세종, 제6대 단종, 제7대 세조, 제9대 성종, 제11대 중종, 제13대 명종 등이다. 경복궁은 임진왜란 때 상당수의 건물이 불타 없어진 아픔을 갖고 있으며, 고종 때에 흥선대원군의 주도 아래 7,700여 칸에 이르는 건물들을 다시 세웠다. 그러나 또다시 명성황후 시해사건이 일어나면서 왕조의 몰락과 함께 경복궁도 왕궁으로서의 기능을 상실하고 말았다. 경복궁에는 조선시대의 대표적인 건축물인 경회루와 향원정의 연못이 원형대로 남아 있으며, 근정전의 월대와 조각상들은 당시의 조각미술을 대표한다. 현재 흥례문 밖 서편에는 국립고궁 박물관이 위치하고 있고, 경복궁 내 향원정의 동편에는 국립민속 박물관이 위치하고 있다</div>
        </Row>
    </Container>
</div>


   
  );
};

export default TravelDetailPage;
