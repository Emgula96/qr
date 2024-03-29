import { Routes, Route } from "react-router-dom"
import Kiosk from "./pages/Kiosk"
import FindSession from "./pages/FindSession"
import SessionInfo from "./pages/SessionInfo"
import PrintBadge from "./pages/PrintBadge"
import './assets/styles/main.scss'

const Router = () => {
  return (
    <Routes>
      <Route index element={<Kiosk />} />
      <Route path="/find-session" element={<FindSession />} />
      <Route path="/session-info" element={<SessionInfo />} />
      <Route path="/print-badge" element={<PrintBadge />} />
    </Routes>
  );
};

export default Router