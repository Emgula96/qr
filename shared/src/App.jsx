import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Kiosk from './pages/Kiosk'
import FindSession from './pages/FindSession'
import './assets/styles/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Kiosk} />
        <Route exact path='/kiosk' Component={Kiosk} />
        <Route exact path='/find-session' Component={FindSession} />
      </Routes>
    </Router>
    )
  }

export default App
