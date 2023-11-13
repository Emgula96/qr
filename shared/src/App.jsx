import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Kiosk from './pages/Kiosk'
import FindSession from './pages/FindSession'
import SessionInfo from './pages/SessionInfo'
import './assets/styles/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Kiosk} />
        <Route exact path='/kiosk' Component={Kiosk} />
        <Route exact path='/find-session' Component={FindSession} />
        <Route exact path='/session-info' Component={SessionInfo} />
      </Routes>
    </Router>
    )
  }

export default App
