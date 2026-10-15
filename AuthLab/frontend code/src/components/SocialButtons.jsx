import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import axios from "axios";
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
function SocialButtons() {
  const URL = "http://localhost:3000/api/auth";
  // functions
  async function handleGoogleSuccess(credentialResponse) {
    // console.log("res :", credentialResponse);
    let token = credentialResponse.credential;
    const request = await axios.post(`${URL}/google`, {
      token: token,
    });
    // store token in local storage
    localStorage.setItem("ticket", request.data.token);
    window.location.href = "/dashboard";
  }
  return (
    <div className="social-buttons">
      <div className="social google">
        <div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>
      </div>
      <button
        className="social github"
        onClick={() => (window.location.href = `${URL}/github`)}
      >
        <FaGithub />
        Github Login
      </button>
      <button className="social facebook">
        <FaFacebook />
        Facebook Login
      </button>
      <button className="social linkedin">
        <FaLinkedin />
        Linkedin Login
      </button>
    </div>
  );
}

export default SocialButtons;
