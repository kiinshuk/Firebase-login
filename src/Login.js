import React from 'react';

function Login({ onLogin }) {
  return (
    <div className="Login">
      <h1>Login Page</h1>
      <button onClick={onLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
