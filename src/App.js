import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import SelectTripPage from "./pages/SelectTripPage/SelectTripPage";
import MapPage from "./pages/MapPage/MapPage";
import TravelDetailPage from "./pages/TravelDetailPage/TravelDetailPage";
import TripListPage from "./pages/TripListPage/TripListPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    // 서버에서 렌더링된 HTML 문서에서 CSRF 토큰을 가져오는 로직
    const csrfTokenMeta = document.querySelector("meta[name='_csrf']");

    // CSRF 토큰이 존재하는지 확인 후 요청 헤더에 추가
    if (csrfTokenMeta) {
        const csrfToken = csrfTokenMeta.content;
        axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
    }
}, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/selectTrip" element={<SelectTripPage />} />
          <Route path="/trip/list" element={<TripListPage />} />
          <Route path="/detail/:id" element={<TravelDetailPage />} />
        </Route>
        <Route path="/trip" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
