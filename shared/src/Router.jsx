import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Loading from './pages/Loading'
const  Kiosk = React.lazy(() => import('./pages/Kiosk'))
const  FindSession = React.lazy(() => import('./pages/FindSession'))
const  SessionInfo = React.lazy(() => import('./pages/SessionInfo'))
const  PrintBadge = React.lazy(() => import('./pages/PrintBadge'))
const  CheckIn = React.lazy(() => import('./pages/CheckIn'))
import service from './service'
import './assets/styles/main.scss'

const Router = () => {
  const location = useLocation();

  // Get the query params
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')

  React.useEffect(() => {
    async function getTokens() {
      if (code && import.meta.env.VITE_ENVIRONMENT === 'development') {
        const tokens = await service.getAccessToken(code)
        if (tokens.access_token) {
          localStorage.setItem('access_token', tokens.access_token)
          localStorage.setItem('refresh_token', tokens.refresh_token)
        }
      }
    }
    getTokens()
  }, [code])

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Kiosk />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/find-session" element={<FindSession />} />
        <Route path="/session-info" element={<SessionInfo />} />
        <Route path="/print-badge" element={<PrintBadge />} />
        <Route path="/check-in" element={<CheckIn />} />
      </Routes>
    </React.Suspense>
  );
};

export default Router
