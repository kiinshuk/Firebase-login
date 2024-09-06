import React, { useState, useEffect } from "react";
import { checkAuthState, signInWithGooglePopup, logout } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const loggedInUser = await signInWithGooglePopup();
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Check user authentication state on component mount
  useEffect(() => {
    checkAuthState((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="App">
      <h1>Firebase Google Authentication</h1>
      {!user ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
