import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MoodLog from "./pages/MoodLog";
import MoodHistory from "./pages/MoodHistory";
import Journal from "./pages/Journal";
import StressLog from "./pages/StressLog";
import Breathing from "./pages/Breathing";
import Goals from "./pages/Goals";
import WeeklyReport from "./pages/WeeklyReport";
import AdminInsights from "./pages/AdminInsights";
import Navbar from "./components/Navbar";
function App() { return (<BrowserRouter><Navbar /><Routes><Route path="/" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/mood" element={<MoodLog />} /><Route path="/history" element={<MoodHistory />} /><Route path="/journal" element={<Journal />} /><Route path="/stress" element={<StressLog />} /><Route path="/breathing" element={<Breathing />} /><Route path="/goals" element={<Goals />} /><Route path="/report" element={<WeeklyReport />} /><Route path="/admin" element={<AdminInsights />} /></Routes></BrowserRouter>); }
export default App;
