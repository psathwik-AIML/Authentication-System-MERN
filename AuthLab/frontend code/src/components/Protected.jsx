import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  let token = localStorage.getItem("ticket");
  return token ? children : <Navigate to="/" />;
}

export default Protected;
