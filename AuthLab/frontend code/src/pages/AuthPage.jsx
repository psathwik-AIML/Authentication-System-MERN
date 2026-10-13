import React from "react";
import SocialButtons from "../components/SocialButtons";
import LoginForm from "../components/LoginForm";
import Verification from "../components/Verification";

function AuthPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>Auth Lab</h1>
        <SocialButtons />
        <hr />
        <LoginForm />
        <hr />
        <Verification />
      </div>
    </div>
  );
}

export default AuthPage;
