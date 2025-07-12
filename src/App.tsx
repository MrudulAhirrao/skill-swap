import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Home/page"
import Login from "./Authentication/login"
import Registration from "./Authentication/registration"
import Viewdetail from "./requestdetail/viewdetail"
import Profile from "./userprofile/profile"
import SwapRequest from "./userprofile/swaprequest"
import History from "./userprofile/history"
import Settings from "./userprofile/settings"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/viewdetail" element={<Viewdetail />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/swaprequest" element={<SwapRequest/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/settings" element={<Settings/>} />

      </Routes>
    </Router>
  )
}

export default App
