import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Kiosk from './pages/Kiosk'
import './assets/styles/main.scss'

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/kiosk' Component={Kiosk} />
      </Routes>
    </Router>
    )
  }

export default App
