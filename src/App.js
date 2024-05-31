import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import PlanPage from "./pages/PlanPage/PlanPage";
import SelectTripPage from "./pages/SelectTripPage/SelectTripPage";
import MapPage from "./pages/MapPage/MapPage";
import TravelDetailPage from "./pages/TravelDetailPage/TravelDetailPage";
import TripListPage from "./pages/TripListPage/TripListPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/plan" element={<PlanPage />} />
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
