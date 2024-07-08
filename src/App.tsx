// import React, {Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './utils/firebase' 
// import Land from './pages/Home/Land'
// import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Auth/Login';
import NotFound from './pages/Extras/PageNotFound'
import ComingSoon from './pages/Extras/BuildingNow'
import Body from './pages/Chat/Body'

function App() {
  const [isAuthenticated] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/land" element={<Land />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated ? true : false}>
              {/* <Home /> */}
              <Body />
            </ProtectedRoute>
          }
        />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
