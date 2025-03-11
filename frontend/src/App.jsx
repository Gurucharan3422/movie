import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Playlist from './pages/Playlist';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout /> {/* Handles Navbar visibility */}
      </Router>
    </AuthProvider>
  );
};

const Layout = () => {
  const location = useLocation();
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not logged in and trying to access protected routes
  useEffect(() => {
    if (!isLogin && location.pathname !== '/' && location.pathname !== '/register') {
      navigate('/'); // Redirect to login page if not logged in
    }
  }, [isLogin, location.pathname, navigate]);

  // Hide Navbar only on Login and Register pages
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />} {/* Show Navbar only if not on Login/Register */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
        <Route path="/movie/:id" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
        <Route path="/playlist" element={<PrivateRoute><Playlist /></PrivateRoute>} />

        {/* Redirect to Home if no route matches */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

const PrivateRoute = ({ children }) => {
  const { isLogin } = useContext(AuthContext);
  return isLogin ? children : <Navigate to="/" />;
};

export default App;