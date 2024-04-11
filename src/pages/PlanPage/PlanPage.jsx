import React from "react";
import "./PlanPage.style.css";
// url을 통해 지역을 받아온다.
const PlanPage = () => {
  return (
    <div class="container plan-page">
      <div class="col">
        <div>
          <div>Day1</div>
          <div>장소</div>
          <div>날짜</div>
          <input type="text"></input><button>검색</button>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
