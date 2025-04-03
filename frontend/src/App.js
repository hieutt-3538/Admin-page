import { useState, useEffect } from 'react';
import { validateToken } from './services/authService';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Sidebar from "./components/Dashboard/Sidebar";
import Header from "./components/Dashboard/Header";
import Home from "./components/Dashboard/Home";
import Users from "./components/Dashboard/Users";
import Profile from "./components/Dashboard/Profile";
import ErrorBoundary from './components/Common/ErrorBoundary';

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        {children}
      </div>
    </div>
  );
}

// Secure route protection with token validation
const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await validateToken();
        setIsValid(isValid);
      } catch (error) {
        setIsValid(false);
      }
    };

    checkAuth();
  }, []);

  if (isValid === null) return null; // Loading state
  return isValid ? children : <Navigate to="/login" />;
};

function App() {
  // Auto-logout after 1 hour of inactivity
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll'];
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }, 3600000); // 1 hour
    };

    events.forEach(event => 
      window.addEventListener(event, resetTimer)
    );

    return () => {
      clearTimeout(timer);
      events.forEach(event => 
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
        {/* If path "/",automatically redirect to `/login` */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* The route to the dashboard (only accessible with a token). */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
