import React from "react";

function LoginForm() {
  return (
    <div className="login-form">
      <h2>Login</h2>
      <input className="input" type="email" placeholder="Email" />
      <input className="input" type="password" placeholder="Password" />
      <button className="login btn">Login</button>
      <p className="forgot">Forgot Password</p>
    </div>
  );
}

export default LoginForm;
