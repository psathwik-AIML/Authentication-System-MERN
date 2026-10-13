import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const URL = "http://localhost:3000/api/auth";
  let token = localStorage.getItem("ticket");
  async function fetchData() {
    let req = await axios.get(`${URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(req.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  function logout() {
    localStorage.removeItem("ticket");
    window.location.href = "/";
  }
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </>
      ) : (
        <p>loading....</p>
      )}
      <button onClick={logout}>log out</button>
    </div>
  );
}

export default Dashboard;
