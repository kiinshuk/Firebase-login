import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { checkAuthState, signInWithGooglePopup, logout } from "./firebase";
import Home from "./Home";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loggedInUser = await signInWithGooglePopup();
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate("/home"); // Redirect to /home after login
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login"); // Redirect to home or login page after logout
  };

  useEffect(() => {
    checkAuthState((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/home"); // Redirect to /home if user is authenticated
      }
    });
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={
        !user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Home onLogout={handleLogout} />
        )
      } />
      <Route path="/home" element={<Home onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;
