import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Kiosk from './pages/Kiosk'
import FindSession from './pages/FindSession'
import SessionInfo from './pages/SessionInfo'
import PrintBadge from './pages/PrintBadge'
import './assets/styles/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Kiosk} />
        <Route exact path='/kiosk' Component={Kiosk} />
        <Route exact path='/find-session' Component={FindSession} />
        <Route exact path='/session-info' Component={SessionInfo} />
        <Route exact path='/print-badge' Component={PrintBadge} />
      </Routes>
    </Router>
    )
  }

export default App
