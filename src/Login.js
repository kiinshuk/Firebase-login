import React, { useState } from "react";
import { googleSignInWithPopup } from "./firebase";

function Login() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const signedInUser = await googleSignInWithPopup();
    setUser(signedInUser);
  };

  return (
    <div className="Login">
      <h1>Login Page</h1>
      {!user ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <p>Welcome, {user.displayName}</p>
      )}
    </div>
  );
}

export default Login;
