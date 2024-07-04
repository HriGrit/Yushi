// import React, {Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './utils/firebase' 
import Land from './pages/Home/Land'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Auth/Login';

function App() {
  const [isAuthenticated] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated ? true : false}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
