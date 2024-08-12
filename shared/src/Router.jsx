import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loading from './pages/Loading';
const Kiosk = React.lazy(() => import('./pages/Kiosk'));
const FindSession = React.lazy(() => import('./pages/FindSession'));
const SessionInfo = React.lazy(() => import('./pages/SessionInfo'));
const PrintBadge = React.lazy(() => import('./pages/PrintBadge'));
const CheckIn = React.lazy(() => import('./pages/CheckIn'));
const Playground = React.lazy(() => import('./pages/Playground'));
import service from './service';
import './assets/styles/main.scss';

const Router = () => {
  const location = useLocation();

  // Get the query params
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const deviceId = queryParams.get('deviceId');

  React.useEffect(() => {
    async function getTokens() {
      console.log(deviceId);
      if (code && import.meta.env.VITE_ENVIRONMENT === 'development') {
        const tokens = await service.getAccessToken(code);
        if (tokens.access_token) {
          localStorage.setItem('access_token', tokens.access_token);
          localStorage.setItem('refresh_token', tokens.refresh_token);
        }
      }
    }
    getTokens();
  }, [code, deviceId]);

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Kiosk deviceId={deviceId} />} />
        <Route path="/kiosk" element={<Kiosk deviceId={deviceId} />} />
        <Route
          path="/find-session"
          element={<FindSession deviceId={deviceId} />}
        />
        <Route
          path="/session-info"
          element={<SessionInfo deviceId={deviceId} />}
        />
        <Route
          path="/print-badge"
          element={<PrintBadge deviceId={deviceId} />}
        />
        <Route path="/check-in" element={<CheckIn deviceId={deviceId} />} />
        <Route
          path="/playground"
          element={<Playground deviceId={deviceId} />}
        />
      </Routes>
    </React.Suspense>
  );
};

export default Router;
