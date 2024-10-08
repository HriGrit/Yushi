import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './utils/firebase' 
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Auth/Login';
import NotFound from './pages/Extras/PageNotFound'
import ComingSoon from './pages/Extras/BuildingNow'
import Body from './pages/Chat/Body'
import ProfileBody from './pages/Profile/ProfileBody';

function App() {
  const [isAuthenticated] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            // <ComingSoon />
            <ProtectedRoute isAuthenticated={isAuthenticated ? true : false}>
              {/* <Body /> */}
              <ProfileBody />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            // <ComingSoon />
            <ProtectedRoute isAuthenticated={isAuthenticated ? true : false}>
              <ProfileBody />
            </ProtectedRoute>
          }
        />
         <Route
          path="/chats"
          element={
            // <ComingSoon />
            <ProtectedRoute isAuthenticated={isAuthenticated ? true : false}>
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
