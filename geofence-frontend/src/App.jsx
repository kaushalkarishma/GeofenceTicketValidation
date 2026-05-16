import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EventsList from "./pages/user/EventsList";
import UserDashboard from "./pages/user/UserDashboard";
import MyBookings from "./pages/user/MyBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <Navbar /> {/* ✅ OUTSIDE Routes */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<EventsList />} />
       <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;