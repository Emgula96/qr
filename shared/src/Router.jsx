import React from "react"
import { Routes, Route } from "react-router-dom"
import Loading from "./pages/Loading"
const  Kiosk = React.lazy(() => import("./pages/Kiosk"))
const  FindSession = React.lazy(() => import("./pages/FindSession"))
const  SessionInfo = React.lazy(() => import("./pages/SessionInfo"))
const  PrintBadge = React.lazy(() => import("./pages/PrintBadge"))
import './assets/styles/main.scss'

const Router = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Kiosk />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/find-session" element={<FindSession />} />
        <Route path="/session-info" element={<SessionInfo />} />
        <Route path="/print-badge" element={<PrintBadge />} />
      </Routes>
    </React.Suspense>
  );
};

export default Router