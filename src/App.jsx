// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import PrivateRoute from './components/PrivateRoute';

// User Pages
import SignUp from './pages/user/SignUp';
import SignIn from './pages/user/SignIn';
import Dashboard from './pages/user/Dashboard';
import { initializeStorage } from './utils/storage';
import AdminSignIn from './pages/admin/AdminSignIn';
import AdminPanel from './pages/admin/AdminPanel';

// Admin Pages



function App() {
  useEffect(() => {
    // Initialize localStorage with default admin credentials
    initializeStorage();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        
        {/* User Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route 
          path="/user/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route 
          path="/admin/panel" 
          element={
            <PrivateRoute adminOnly={true}>
              <AdminPanel />
            </PrivateRoute>
          } 
        />

        {/* Catch all - redirect to signin */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;