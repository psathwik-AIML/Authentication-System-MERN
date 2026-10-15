import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const nav = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("ticket", token);
      nav("/dashboard");
    } else {
      nav("/");
    }
  }, []);
  return (
    <div>
      <h1>Logging in with Github....</h1>
    </div>
  );
}

export default Success;
